const MarkdownViewer=(function(){const BASE_URL=window.location.pathname.replace(/\/[^/]*$/,'')+'/Markdown/';const DEFAULT_FILE='Markdown.md';const SCROLL_DEBOUNCE_TIME=100;const FETCH_TIMEOUT=5000;const state={currentFile:null,fileCache:new Map(),scrollTimeout:null,isMobileMenuOpen:false};const elements={fileList:document.getElementById('file-list'),fileListBtn:document.getElementById('file-list-btn'),filesContainer:document.getElementById('files'),content:document.getElementById('content'),markdownContent:document.getElementById('markdown-content'),tocList:document.getElementById('toc-list')};async function init(){setupMarked();setupEventListeners();await loadInitialFile();handleInitialHash()}function setupMarked(){marked.setOptions({gfm:true,tables:true,breaks:true,pedantic:false,sanitize:false,smartLists:true,smartypants:false})}function setupEventListeners(){document.body.addEventListener('click',handleClick);window.addEventListener('scroll',debounce(highlightVisibleHeading,SCROLL_DEBOUNCE_TIME));window.addEventListener('popstate',handlePopState);window.addEventListener('resize',debounce(handleResize,200))}function debounce(fn,delay){let timer;return function(){const context=this;const args=arguments;clearTimeout(timer);timer=setTimeout(()=>fn.apply(context,args),delay)}}function handleClick(e){if(e.target.closest('#files a')){handleFileClick(e)}else if(e.target.closest('#toc a')){handleTocClick(e)}else if(e.target===elements.fileListBtn){toggleFileList()}else if(e.target.closest('#content')&&state.isMobileMenuOpen){closeFileList()}}function handleFileClick(e){e.preventDefault();const fileToLoad=e.target.dataset.file;if(state.currentFile===fileToLoad)return;loadAndDisplayMarkdown(fileToLoad);updateActiveFileLink(e.target);closeFileList()}function handleTocClick(e){e.preventDefault();const id=e.target.getAttribute('href').substring(1);const heading=document.getElementById(id);if(heading){scrollToHeading(heading);setActiveTocItem(e.target)}}async function handlePopState(){const file=getCurrentFileFromURL();if(file&&file!==state.currentFile){await loadAndDisplayMarkdown(file)}}function handleResize(){if(window.innerWidth>=768&&state.isMobileMenuOpen){closeFileList()}}async function loadInitialFile(){try{const files=await getMarkdownFiles();if(files.length>0){const initialFile=getInitialFileFromURL()||files[0];await loadAndDisplayMarkdown(initialFile)}else{await loadAndDisplayMarkdown(DEFAULT_FILE)}}catch(error){console.error('加载初始文件失败:',error);await loadAndDisplayMarkdown(DEFAULT_FILE)}}function getCurrentFileFromURL(){const urlParams=new URLSearchParams(window.location.search);return urlParams.get('file')}function getInitialFileFromURL(){return getCurrentFileFromURL()}function handleInitialHash(){if(window.location.hash){setTimeout(()=>{const target=document.getElementById(window.location.hash.substring(1));target&&scrollToHeading(target)},300)}}async function getMarkdownFiles() {
    try {
        const timestamp = new Date().getTime();
        const response = await fetchWithTimeout(`${BASE_URL}list.json?t=${timestamp}`, {}, FETCH_TIMEOUT);
        if (!response.ok) {
            throw new Error(`HTTP错误!状态码:${response.status}`);
        }
        const files = await response.json();
        if (!Array.isArray(files) || files.length === 0) {
            throw new Error('文档列表为空或格式不正确');
        }
        return files.filter(file => file.endsWith('.md'));
    } catch (error) {
        console.error('获取文件列表失败:', error);
        showErrorMessage('错误', `无法加载文档列表:${error.message}`);
        return [DEFAULT_FILE];
    }
}function fetchWithTimeout(url,options={},timeout=FETCH_TIMEOUT){return Promise.race([fetch(url,options),new Promise((_,reject)=>setTimeout(()=>reject(new Error('请求超时')),timeout))])}async function loadAndDisplayMarkdown(filename){try{state.currentFile=filename;updateDocumentTitle(filename);showLoadingState();if(state.fileCache.has(filename)){renderMarkdown(state.fileCache.get(filename),filename);updateURL(filename);return}const markdown=await loadMarkdownFile(filename);state.fileCache.set(filename,markdown);renderMarkdown(markdown,filename);updateURL(filename)}catch(error){console.error('加载文件失败:',error);showErrorMessage(filename.replace('.md',''),`加载文件失败:${error.message}`)}}function updateDocumentTitle(filename){document.title=`${filename.replace('.md','').replace('Markdown/','')}-Markdown文档`}async function loadMarkdownFile(filename){const timestamp=new Date().getTime();const response=await fetchWithTimeout(`${BASE_URL}${filename}?t=${timestamp}`,{},FETCH_TIMEOUT);if(!response.ok){throw new Error(`文件加载失败:${response.status}${response.statusText}`)}return await response.text()}function updateURL(filename){const url=new URL(window.location);url.searchParams.set('file',filename);window.history.pushState({file:filename},'',url)}

function renderMarkdown(markdown, filename) {
  // 预处理代码容器
  const processedMarkdown = preprocessCodeContainers(markdown);
  const html = marked.parse(processedMarkdown);
  elements.markdownContent.innerHTML = `<div class="markdown-file"><h1 class="file-title">${filename.replace('.md', '').replace('Markdown/', '')}</h1>${html}</div>`;
  addHeadingIds();
  generateTOC();
  setupCodeContainers();
  displayFileListInBackground();
}

function preprocessCodeContainers(markdown) {
  // 匹配连续的代码容器块
  const containerRegex = /(```container:([^\n]+)\n([\s\S]*?)\n```(\s*))+/g;
  
  return markdown.replace(containerRegex, (match) => {
    // 提取所有容器块
    const blocks = match.trim().split('\n```container:').filter(Boolean);
    
    // 为整个容器生成唯一ID
    const containerId = `code-container-${Math.random().toString(36).substr(2, 9)}`;
    
    // 构建HTML结构
    let html = `<div class="code-container" id="${containerId}"><div class="code-tabs"></div>`;
    
    blocks.forEach((block, index) => {
      // 处理第一个块的特殊情况（没有前导的```container:）
      const contentStart = index === 0 ? block.indexOf('\n') + 1 : 0;
      const contentEnd = block.lastIndexOf('\n```');
      
      let title, content;
      
      if (index === 0) {
        title = block.substring('```container:'.length, block.indexOf('\n')).trim();
        content = contentEnd > 0 ? block.substring(contentStart, contentEnd).trim() : block.substring(contentStart).trim();
      } else {
        title = block.substring(0, block.indexOf('\n')).trim();
        content = contentEnd > 0 ? block.substring(block.indexOf('\n') + 1, contentEnd).trim() : block.substring(block.indexOf('\n') + 1).trim();
      }
      
      html += `
<div class="code-content" data-title="${title}">
  <pre><code>${content}</code></pre>
</div>`;
    });
    
    html += '</div>';
    return html;
  });
}

function setupCodeContainers() {
  // 找到所有代码容器
  const containers = document.querySelectorAll('.code-container');
  
  containers.forEach(container => {
    const tabsContainer = container.querySelector('.code-tabs');
    const contentBlocks = container.querySelectorAll('.code-content');
    
    // 收集所有标题
    const titles = Array.from(contentBlocks).map(block => block.dataset.title);
    
    // 创建标签页
    titles.forEach((title, index) => {
      const tab = document.createElement('div');
      tab.className = `code-tab ${index === 0 ? 'active' : ''}`;
      tab.textContent = title;
      tab.dataset.index = index;
      
      tab.addEventListener('click', () => {
        // 切换活动标签
        container.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // 切换显示内容
        container.querySelectorAll('.code-content').forEach(c => c.classList.remove('active'));
        contentBlocks[index].classList.add('active');
      });
      
      tabsContainer.appendChild(tab);
    });
    
    // 默认显示第一个内容块
    if (contentBlocks.length > 0) {
      contentBlocks[0].classList.add('active');
    }
  });
}async function displayFileListInBackground(){try{const files=await getMarkdownFiles();displayFileList(files);updateActiveFileLink()}catch(error){console.error('加载文件列表失败:',error)}}function displayFileList(files){elements.filesContainer.innerHTML='';const fragment=document.createDocumentFragment();files.forEach(file=>{const li=document.createElement('li');const a=document.createElement('a');a.href='#';a.textContent=file.replace('.md','').replace('Markdown/','');a.dataset.file=file;li.appendChild(a);fragment.appendChild(li)});elements.filesContainer.appendChild(fragment)}function updateActiveFileLink(clickedLink=null){const currentFile=getCurrentFileFromURL()||DEFAULT_FILE;document.querySelectorAll('#files a').forEach(el=>{el.classList.toggle('active',el.dataset.file===currentFile)});if(clickedLink){clickedLink.classList.add('active')}}function addHeadingIds(){const headings=document.querySelectorAll('#markdown-content h1, #markdown-content h2, #markdown-content h3');headings.forEach((heading,index)=>{if(!heading.id){heading.id=generateHeadingId(heading.textContent,index)}})}function generateHeadingId(text,index){return text.trim().toLowerCase().replace(/[^\w\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-')||`heading-${index}`}function generateTOC(){elements.tocList.innerHTML='';const headings=document.querySelectorAll('#markdown-content h1, #markdown-content h2, #markdown-content h3');const fragment=document.createDocumentFragment();headings.forEach((heading,index)=>{const li=document.createElement('li');li.className=heading.tagName.toLowerCase();li.innerHTML=`<a href="#${heading.id}">${heading.textContent}</a>`;fragment.appendChild(li)});elements.tocList.appendChild(fragment)}function scrollToHeading(heading){const offset=20;const elementPosition=heading.getBoundingClientRect().top;const offsetPosition=elementPosition+window.pageYOffset-offset;window.scrollTo({top:offsetPosition,behavior:'smooth'});if(history.replaceState){history.replaceState(null,null,`#${heading.id}`)}else{window.location.hash=`#${heading.id}`}}function highlightVisibleHeading(){const headings=document.querySelectorAll('#markdown-content h1, #markdown-content h2, #markdown-content h3');let currentActive=null;const offset=100;for(let i=0;i<headings.length;i++){const rect=headings[i].getBoundingClientRect();if(rect.top<=offset&&rect.bottom>=0){currentActive=headings[i].id;break}}if(currentActive){const activeLink=document.querySelector(`#toc a[href="#${currentActive}"]`);setActiveTocItem(activeLink)}}function setActiveTocItem(activeLink){if(!activeLink)return;document.querySelectorAll('#toc a').forEach(el=>{el.classList.toggle('active',el===activeLink)});activeLink.scrollIntoView({block:'nearest',behavior:'auto'})}function showLoadingState(){elements.markdownContent.innerHTML=`<div class="loading-container"><div class="loader"></div><span>加载中...</span></div>`}function showErrorMessage(title,message){elements.markdownContent.innerHTML=`<div class="markdown-file"><h1 class="file-title">${title}</h1><p style="color:var(--error-color)">${message}</p></div>`}function toggleFileList(){state.isMobileMenuOpen=!state.isMobileMenuOpen;elements.fileList.classList.toggle('active',state.isMobileMenuOpen)}function closeFileList(){state.isMobileMenuOpen=false;elements.fileList.classList.remove('active')}return{init}})();document.addEventListener('DOMContentLoaded',MarkdownViewer.init);