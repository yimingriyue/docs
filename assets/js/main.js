// 页面数据配置
const pageConfig = {
    fallbackPages: [
        { 
            name: '易经卦变v5.2', 
            path: 'pages/易经的卦变v5.2.html', 
            desc: '六十四卦的变化规律的图示模型，训练脑子学会举一反十', 
            img: 'pages/易经的卦变v5.2.webp'
        },
        { 
            name: '乾坤卦变', 
            path: 'pages/乾坤卦变.html', 
            desc: '刷新网页随机展现六十四卦之一的卦变', 
            img: 'pages/乾坤卦变.webp' 
        },
        
         { 
            name: '知新：发现有趣的网站', 
            path: 'http://daohang.likesyou.org/', 
            desc: '分享一些有趣、新奇的网站、在线工具等', 
            img: 'pages/Markdown.webp' 
        },
    
        { 
            name: '精品网站书签', 
            path: 'pages/Bookmarks_2024_11_11.html', 
            desc: '收藏使用', 
            img: 'pages/hetong.webp' 
        }, 
          { 
            name: '竖版书单', 
            path: 'pages/竖版书单.html', 
            desc: '练眼📖一目十行| 练身💪举一反三| 练脑🧠举一反十', 
            img: 'pages/shudan.webp' 
        },  
          { 
            name: 'Windows系统相关', 
            path: 'pages/public.html?file=Windows_app.md', 
            desc: 'Windows相关信息汇总', 
            img: 'pages/Windows.webp' 
        },   
                  { 
            name: 'Markdown语法预览', 
            path: 'pages/Markdown预览.html', 
            desc: '轻量级标记语言，支持加粗、斜体、代码块等格式，让文档排版简洁高效', 
            img: 'pages/markdown2.webp' 
        },   
        
        { 
            name: '故宫壁纸', 
            path: 'https://www.dpm.org.cn/lights/royal.html', 
            desc: '中国传统风', 
            img: 'pages/手机壁纸.webp' 
        },
                { 
    name: '摄影图片示例1', 
    path: 'https://picsum.photos/1920/1080?random', 
    desc: '随机摄影（高清1920x1080）', 
    img: 'https://picsum.photos/800/600?random' 
},
{ 
    name: '摄影图片示例2', 
    path: 'https://picsum.photos/1920/1080?seed=forest', 
    desc: '随机摄影图片（高清1920x1080）', 
    img: 'https://picsum.photos/800/600?seed=forest' 
}, 
                { 
            name: '风景示例1', 
            path: 'https://bing.biturl.top/?resolution=1920&format=image&index=1&mkt=zh-CN', 
            desc: 'Bing 随机风景图片示例', 
            img: 'https://bing.biturl.top/?resolution=1920&format=image&index=1&mkt=zh-CN' 
        },                
        { 
            name: '风景示例2', 
            path: 'https://bing.biturl.top/?resolution=1920&format=image&index=4&mkt=zh-CN', 
            desc: 'Bing 随机风景图片示例', 
            img: 'https://bing.biturl.top/?resolution=1920&format=image&index=4&mkt=zh-CN' 
        },
        { 
            name: '风景示例3', 
            path: 'https://bing.biturl.top/?resolution=1920&format=image&index=2&mkt=zh-CN', 
            desc: 'Bing 随机风景图片示例', 
            img: 'https://bing.biturl.top/?resolution=1920&format=image&index=2&mkt=zh-CN' 
        },
        { 
            name: '风景示例4', 
            path: 'https://bing.biturl.top/?resolution=1920&format=image&index=3&mkt=zh-CN', 
            desc: 'Bing 随机风景图片示例', 
            img: 'https://bing.biturl.top/?resolution=1920&format=image&index=3&mkt=zh-CN' 
        },
                { 
            name: '风景示例5', 
            path: 'https://bing.biturl.top/?resolution=1920&format=image&index=5&mkt=zh-CN', 
            desc: 'Bing 随机风景图片示例', 
            img: 'https://bing.biturl.top/?resolution=1920&format=image&index=5&mkt=zh-CN' 
        },
                        { 
            name: '风景示例6', 
            path: 'https://bing.biturl.top/?resolution=1920&format=image&index=6&mkt=zh-CN', 
            desc: 'Bing 随机风景图片示例', 
            img: 'https://bing.biturl.top/?resolution=1920&format=image&index=6&mkt=zh-CN' 
        },
                        { 
            name: '风景示例7', 
            path: 'https://bing.biturl.top/?resolution=1920&format=image&index=7&mkt=zh-CN', 
            desc: 'Bing 随机风景图片示例', 
            img: 'https://bing.biturl.top/?resolution=1920&format=image&index=7&mkt=zh-CN' 
        },
                        { 
            name: '风景示例8', 
            path: 'https://bing.biturl.top/?resolution=1920&format=image&index=0&mkt=zh-CN', 
            desc: 'Bing 随机风景图片示例', 
            img: 'https://bing.biturl.top/?resolution=1920&format=image&index=0&mkt=zh-CN' 
        },

    ],
    placeholderImg: 'https://bing.biturl.top/?resolution=1920&format=image&index=random&mkt=zh-CN'
};

// 创建卡片元素
function createCard(page) {
    const card = document.createElement('div');
    card.className = 'card';
    card.onclick = () => window.location.href = page.path;
    
    card.innerHTML = `
        <div class="card-img" style="background-image: url('${page.img}')"></div>
        <div class="card-content">
            <h3 class="card-title">${page.name}</h3>
            <p class="card-desc">${page.desc || '暂无描述'}</p>
        </div>
    `;
    
    return card;
}

// 初始化搜索功能
function initSearch(cards) {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        cards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const desc = card.querySelector('.card-desc').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// 初始化侧边栏
function initSidebar(pages) {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarMenu = document.querySelector('.sidebar-menu');
    
    // 添加卡片导航项
    const divider = document.createElement('li');
    divider.className = 'menu-divider';
    divider.textContent = '卡片导航';
    sidebarMenu.appendChild(divider);
    
    pages.forEach(page => {
        const menuItem = document.createElement('li');
        menuItem.textContent = page.name;
        menuItem.onclick = () => window.location.href = page.path;
        sidebarMenu.appendChild(menuItem);
    });
    
    // 添加CSS过渡效果
    const style = document.createElement('style');
    style.textContent = `
        .sidebar {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // 鼠标悬停在按钮上时显示侧边栏
    sidebarToggle.addEventListener('mouseenter', () => {
        sidebar.classList.add('open');
        sidebarToggle.classList.add('open');
        sidebarOverlay.classList.add('active');
    });
    
    // 鼠标离开侧边栏区域时隐藏侧边栏
    sidebar.addEventListener('mouseleave', () => {
        sidebar.classList.remove('open');
        sidebarToggle.classList.remove('open');
        sidebarOverlay.classList.remove('active');
    });
    
    // 保留原有的点击功能
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        sidebarToggle.classList.toggle('open');
        sidebarOverlay.classList.toggle('active');
    });
    
    sidebarClose.addEventListener('click', function() {
        sidebar.classList.remove('open');
        sidebarToggle.classList.remove('open');
        sidebarOverlay.classList.remove('active');
    });
    
    sidebarOverlay.addEventListener('click', function() {
        sidebar.classList.remove('open');
        sidebarToggle.classList.remove('open');
        sidebarOverlay.classList.remove('active');
    });
}

// 主初始化函数
async function init() {
    // 延迟加载字体CSS
    const fontCSS = document.createElement('link');
    fontCSS.rel = 'stylesheet';
    fontCSS.href = 'assets/css/font.css';
    document.head.appendChild(fontCSS);
    
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';
    
    const pages = pageConfig.fallbackPages;
    const cards = [];
    
    for (const page of pages) {
        const card = createCard(page);
        cardContainer.appendChild(card);
        cards.push(card);
    }
    
    if (cards.length === 0) {
        cardContainer.innerHTML = '<div class="loading">没有找到任何页面</div>';
    }
    
    initSearch(cards);
    initSidebar(pages);
}

document.addEventListener('DOMContentLoaded', init);
document.fonts.ready.then(() => {
    sessionStorage.setItem('fontLoaded', 'true');
});