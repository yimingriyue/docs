
document.addEventListener('DOMContentLoaded', function() {
        // 延迟加载字体CSS
    const fontCSS = document.createElement('link');
    fontCSS.rel = 'stylesheet';
    fontCSS.href = '../../../assets/css/font.css';
    document.head.appendChild(fontCSS);
    
    const bookContent = document.getElementById('bookContent');
    const navContainer = document.getElementById('navContainer');
    const navItems = document.querySelectorAll('.nav-item');
    const homeButton = document.getElementById('homeButton');
    const autoScrollBtn = document.getElementById('autoScrollBtn');
    
    // 自动滚动相关变量
    let autoScrollInterval = null;
    let isAutoScrolling = false;
    let scrollSpeed = 11;
    let lastScrollTime = 0;
    let scrollAnimationId = null;
    
    // 替换符号的函数
    function replaceSymbols() {
        const contentElements = bookContent.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
        
        contentElements.forEach(element => {
            let html = element.innerHTML;
            
            // 替换符号
            html = html.replace(/\(/g, '︵');
            html = html.replace(/\)/g, '︶');
            html = html.replace(/\[/g, '「');
            html = html.replace(/\]/g, '」');
            html = html.replace(/—/g, '<span class="vertical-dash">━</span>');
           html = html.replace(/：/g, '⁚'); 
            element.innerHTML = html;
        });
    }
    
 
    // 动态添加目录链接到导航栏（整体顺序对调）
    function addDirectoryLinksToNav() {
        // 找到"目录"的导航项
        const directoryItem = document.querySelector('.nav-item[data-page="0"]');
        if (!directoryItem) return;
        
        // 获取目录中的所有链接并转换为数组
        const directoryLinks = Array.from(bookContent.querySelectorAll('.book-content a[href^="#calibre_link-"]'));
        
        // 反转链接数组顺序
        const reversedLinks = directoryLinks.reverse();
        
        // 从第1页开始（因为目录是第0页）
        let pageIndex = 1;
        
        reversedLinks.forEach(link => {
            // 创建新的导航项
            const navItem = document.createElement('div');
            navItem.className = 'nav-item';
            navItem.setAttribute('data-page', pageIndex++);
            
            // 创建链接元素
            const navLink = document.createElement('a');
            navLink.href = link.getAttribute('href');
            navLink.className = 'calibre1';
            
            // 简化标题文本（去掉数字和点）
            
let titleText = link.textContent;
titleText = titleText
  .replace(/^\d+(\.\d+)?\s*/, '') // 移除开头的数字和点
  .replace(/^[^a-zA-Z0-9\u4e00-\u9fa5]+/, '') // 移除开头的非中英文字符
  .replace(/[、，《》\s\/]/g, '') // 移除顿号、《》、空格和斜杠
  .replace(/[\d.]/g, ''); // 移除所有数字和点
            
            // 如果标题太长，截断
            if (titleText.length > 5) {
                titleText = titleText.substring(0, 5);
            }
            
            navLink.textContent = titleText;
            navItem.appendChild(navLink);
            
            // 添加到"目录"后面（因为是倒序，所以每次插入到相同位置）
            directoryItem.parentNode.insertBefore(navItem, directoryItem.nextSibling);
            
            // 添加点击事件
            navItem.addEventListener('click', function() {
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                
                bookContent.scrollTo({
                    top: 0,
                    left: parseInt(this.getAttribute('data-page')) * window.innerWidth,
                    behavior: 'smooth'
                });
            });
        });
    }
    
    // 设置内容区域高度
    function setContentHeight() {
        const navHeight = navContainer.offsetHeight;
        const bottomNavHeight = document.querySelector('.bottom-nav').offsetHeight;
        document.documentElement.style.setProperty('--nav-height', `${navHeight}px`);
        document.documentElement.style.setProperty('--bottom-nav-height', `${bottomNavHeight}px`);
        const windowHeight = window.innerHeight;
        const contentHeight = windowHeight - navHeight - bottomNavHeight;
        bookContent.style.height = `${contentHeight}px`;
    }
    
    // 初始化
    setContentHeight();
    replaceSymbols(); // 调用符号替换函数
    addDirectoryLinksToNav(); // 动态添加目录链接到导航栏
    
    // 添加resize和orientationchange事件监听
    window.addEventListener('resize', setContentHeight);
    window.addEventListener('orientationchange', setContentHeight);
    
    // 导航点击事件
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            const href = this.getAttribute('data-href');
            if (href) {
                window.location.href = href;
            } else {
                const pageIndex = parseInt(this.getAttribute('data-page'));
                bookContent.scrollTo({
                    top: 0,
                    left: pageIndex * window.innerWidth,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 返回首页按钮事件
    homeButton.addEventListener('click', function() {
        window.location.href = '/';
    });
    
    // 触摸滑动事件
    let isScrolling = false;
    
    // 用户交互触发停止
     //bookContent.addEventListener('touchstart', function() {
        // isScrolling = true;
        // stopAutoScroll();
    // });

    bookContent.addEventListener('touchend', function() {
        isScrolling = false;
    });
    
    // 鼠标拖动事件
    let isMouseDown = false;
    let mouseStartX, mouseStartScrollLeft;
    
    bookContent.addEventListener('mousedown', function(e) {
        isMouseDown = true;
        mouseStartX = e.pageX;
        mouseStartScrollLeft = bookContent.scrollLeft;
        bookContent.style.cursor = 'grabbing';
         // 鼠标拖动时停止stopAutoScroll();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isMouseDown) return;
        const x = e.pageX;
        const walk = (x - mouseStartX) * 2;
        bookContent.scrollLeft = mouseStartScrollLeft - walk;
    });
    
    document.addEventListener('mouseup', function() {
        isMouseDown = false;
        bookContent.style.cursor = '';
    });
    
    // 鼠标滚轮事件 - 实现横向滚动
    bookContent.addEventListener('wheel', function(e) {
        bookContent.scrollLeft -= e.deltaY;
        e.preventDefault();
         // 滚轮滚动时停止stopAutoScroll();
    });
    
    // 改进的自动滚动功能
    function autoScroll(timestamp) {
        if (!isAutoScrolling) {
            cancelAnimationFrame(scrollAnimationId);
            return;
        }
        
        bookContent.scrollLeft -= scrollSpeed;
        lastScrollTime = timestamp;
        
        if (bookContent.scrollLeft >= bookContent.scrollWidth - bookContent.clientWidth) {
            stopAutoScroll();
            return;
        }
    
        scrollAnimationId = requestAnimationFrame(autoScroll);
    }
    
    function startAutoScroll() {
        if (isAutoScrolling) return;
        
        isAutoScrolling = true;
        autoScrollBtn.classList.add('active');
        
        if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            scrollSpeed = 90;
        } else {
            scrollSpeed = 1;
        }
        
        lastScrollTime = performance.now();
        scrollAnimationId = requestAnimationFrame(autoScroll);
    }
    
    function stopAutoScroll() {
        isAutoScrolling = false;
        autoScrollBtn.classList.remove('active');
        cancelAnimationFrame(scrollAnimationId);
    }
    
    function toggleAutoScroll() {
        if (isAutoScrolling) {
            stopAutoScroll();
        } else {
            startAutoScroll();
        }
    }
    
    // 自动滚动按钮点击事件
    autoScrollBtn.addEventListener('pointerdown', function(e) {
        e.preventDefault();
        toggleAutoScroll();
    });
    
    // 防止移动端点击穿透
    autoScrollBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
    }, {passive: false});
});