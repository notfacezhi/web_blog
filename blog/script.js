document.addEventListener('DOMContentLoaded', function() {
    loadArticle();
    initBackToTop();
    initShareButton();
    initCommentForm();
});

// 配置marked.js
marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
    mangle: false
});

// 加载并渲染文章
function loadArticle() {
    // 从URL获取文章ID,默认为article-1
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id') || 'article-1';
    
    // 获取文章数据
    const article = getArticle(articleId);
    
    if (!article) {
        console.error('文章未找到');
        return;
    }
    
    // 渲染文章元信息
    renderArticleMeta(article);
    
    // 渲染Markdown内容
    renderMarkdownContent(article.content);
    
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
        
        const name = document.getElementById('commentName').value;
        const email = document.getElementById('commentEmail').value;
        const text = document.getElementById('commentText').value;
        
        const commentItem = document.createElement('div');
        commentItem.className = 'comment-item';
        
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        commentItem.innerHTML = `
            <div class="comment-header">
                <strong class="comment-author">${escapeHtml(name)}</strong>
                <span class="comment-date">${dateStr}</span>
            </div>
            <p class="comment-text">${escapeHtml(text)}</p>
        `;
        
        commentsList.appendChild(commentItem);
        
        commentForm.reset();
        
        commentItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        showNotification('Comment posted successfully!');
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
