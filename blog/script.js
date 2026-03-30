// 加载页头
function loadHeader() {
    const headerHTML = `
        <nav class="nav-header">
            <div class="container flex items-center">
                <a href="index.html" class="brand-logo">内容的艺术</a>
                <ul class="nav-links">
                    <li><a href="about.html">关于</a></li>
                    <li><a href="contributors.html">贡献者</a></li>
                    <li><a href="index.html">全部文章</a></li>
                </ul>
            </div>
        </nav>
    `;
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHTML;
    }
}

// 加载页脚
function loadFooter() {
    const footerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-grid">
                    <div>
                        <h4 class="footer-title">内容的艺术</h4>
                        <p class="footer-desc">为创作者提供实用的内容策略。</p>
                    </div>
                    <div>
                        <h4 class="footer-title">联系方式</h4>
                        <ul class="footer-links">
                            <li><a href="#">微博</a></li>
                            <li><a href="#">知乎</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>© 2026 内容的艺术. 保留所有权利。</p>
                </div>
            </div>
        </footer>
    `;
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
    
    // 只在文章页面加载文章相关功能
    if (document.getElementById('commentForm')) {
        loadArticle();
        initShareButton();
        initCommentForm();
    }
    
    initBackToTop();
});

// 配置marked.js
marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
    mangle: false
});

// 加载并渲染文章 (异步)
async function loadArticle() {
    // 从URL获取文章ID
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    if (!articleId) {
        console.error('未指定文章ID');
        return;
    }
    
    // 异步获取文章数据
    const article = await getArticle(articleId);
    
    if (!article) {
        console.error('文章未找到');
        document.querySelector('.article-content').innerHTML = '<p>文章未找到</p>';
        return;
    }
    
    // 渲染文章元信息
    renderArticleMeta(article);
    
    // 渲染Markdown内容
    renderMarkdownContent(article.content);
    
    // 渲染相关文章
    await renderRelatedArticles(article);
    
    // 渲染完成后初始化目录
    initTableOfContents();
    initScrollSpy();
}

// 渲染文章元信息
function renderArticleMeta(article) {
    // 更新标题
    document.title = `${article.title} | 内容的艺术`;
    
    // 更新分类和日期
    const metaContainer = document.querySelector('.article-meta');
    if (metaContainer) {
        const categoriesHTML = article.categories.map(cat => 
            `<a href="#" class="category-link">${cat}</a>`
        ).join('<span class="meta-separator">,</span>');
        
        const dateObj = new Date(article.date);
        const dateStr = `${dateObj.getFullYear()}年${dateObj.getMonth() + 1}月${dateObj.getDate()}日`;
        
        metaContainer.innerHTML = `
            ${categoriesHTML}
            <span class="meta-date">${dateStr}</span>
        `;
    }
    
    // 更新文章标题
    const titleElement = document.querySelector('.article-title');
    if (titleElement) {
        titleElement.textContent = article.title;
    }
    
    // 更新作者
    const authorElement = document.querySelector('.article-author .author-link');
    if (authorElement) {
        authorElement.textContent = `作者: ${article.author}`;
    }
}

// 渲染Markdown内容
function renderMarkdownContent(markdown) {
    const contentContainer = document.querySelector('.article-content');
    if (!contentContainer) {
        console.error('文章内容容器未找到');
        return;
    }
    
    // 使用marked.js将Markdown转换为HTML
    const htmlContent = marked.parse(markdown);
    
    // 插入渲染后的HTML
    contentContainer.innerHTML = htmlContent;
}

// 渲染相关文章 (异步)
async function renderRelatedArticles(currentArticle) {
    const relatedContainer = document.getElementById('relatedArticles');
    if (!relatedContainer) return;
    
    const allArticles = await getAllArticles();
    
    // 过滤掉当前文章,找到相关文章(同类别或同标签)
    let relatedArticles = allArticles.filter(article => {
        if (article.id === currentArticle.id) return false;
        
        // 检查是否有相同的分类或标签
        const hasCommonCategory = article.categories && article.categories.some(cat => 
            currentArticle.categories && currentArticle.categories.includes(cat)
        );
        const hasCommonTag = article.tags && currentArticle.tags && 
            article.tags.some(tag => currentArticle.tags.includes(tag));
        
        return hasCommonCategory || hasCommonTag;
    });
    
    // 限制最多3篇
    relatedArticles = relatedArticles.slice(0, 3);
    
    if (relatedArticles.length === 0) {
        relatedContainer.innerHTML = '<p>暂无相关文章</p>';
        return;
    }
    
    let html = '';
    relatedArticles.forEach(article => {
        const dateObj = new Date(article.date);
        const dateStr = `${dateObj.getFullYear()}年${dateObj.getMonth() + 1}月${dateObj.getDate()}日`;
        
        html += `
            <a href="article.html?id=${article.id}" class="related-card">
                <div class="related-meta">
                    <span class="related-category">${article.categories[0]}</span>
                    <span class="related-date">${dateStr}</span>
                </div>
                <h4 class="related-card-title">${article.title}</h4>
                <p class="related-excerpt">${article.excerpt}</p>
            </a>
        `;
    });
    
    relatedContainer.innerHTML = html;
}

function initTableOfContents() {
    const tocNav = document.getElementById('tocNav');
    const tocToggle = document.getElementById('tocToggle');
    const articleContent = document.querySelector('.article-content');
    const headings = articleContent.querySelectorAll('h2');
    
    headings.forEach((heading, index) => {
        if (!heading.id) {
            heading.id = `section-${index + 1}`;
        }
        
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        link.addEventListener('click', function(e) {
            e.preventDefault();
            heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            const offset = 100;
            const elementPosition = heading.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
        
        tocNav.appendChild(link);
    });
    
    tocToggle.addEventListener('click', function() {
        tocNav.classList.toggle('collapsed');
        this.textContent = tocNav.classList.contains('collapsed') ? '+' : '−';
    });
}

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initShareButton() {
    const shareBtn = document.getElementById('shareBtn');
    const shareMenu = document.getElementById('shareMenu');
    
    shareBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        shareMenu.classList.toggle('active');
    });
    
    document.addEventListener('click', function(e) {
        if (!shareMenu.contains(e.target) && e.target !== shareBtn) {
            shareMenu.classList.remove('active');
        }
    });
    
    const shareButtons = shareMenu.querySelectorAll('button');
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            const url = window.location.href;
            const title = document.querySelector('.article-title').textContent;
            
            switch(platform) {
                case 'twitter':
                    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
                    break;
                case 'linkedin':
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                    break;
                case 'copy':
                    navigator.clipboard.writeText(url).then(function() {
                        const originalText = button.textContent;
                        button.textContent = 'Copied!';
                        setTimeout(function() {
                            button.textContent = originalText;
                        }, 2000);
                    }).catch(function(err) {
                        console.error('Failed to copy: ', err);
                        alert('Failed to copy link');
                    });
                    break;
            }
            
            shareMenu.classList.remove('active');
        });
    });
}

function initCommentForm() {
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');
    
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const text = document.getElementById('commentText').value;
        
        const commentItem = document.createElement('div');
        commentItem.className = 'comment-item';
        
        const now = new Date();
        const dateStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
        
        commentItem.innerHTML = `
            <div class="comment-header">
                <strong class="comment-author">匿名用户</strong>
                <span class="comment-date">${dateStr}</span>
            </div>
            <p class="comment-text">${escapeHtml(text)}</p>
        `;
        
        commentsList.appendChild(commentItem);
        
        commentForm.reset();
        
        commentItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        showNotification('评论发表成功!');
    });
}

function initScrollSpy() {
    const tocLinks = document.querySelectorAll('.toc-nav a');
    const sections = document.querySelectorAll('.article-content h2');
    
    if (sections.length === 0 || tocLinks.length === 0) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -80% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                tocLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 40px;
        background-color: #000;
        color: #fff;
        padding: 1rem 1.5rem;
        font-family: var(--font-main);
        font-size: 0.875rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(function() {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(function() {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
