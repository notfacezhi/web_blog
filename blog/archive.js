// 文章列表页逻辑
document.addEventListener('DOMContentLoaded', function() {
    loadArticlesList();
});

// 加载文章列表 (异步)
async function loadArticlesList() {
    const articlesListElement = document.getElementById('articlesList');
    if (!articlesListElement) return;
    
    // 显示加载中
    articlesListElement.innerHTML = '<p class="no-articles">加载中...</p>';
    
    const articles = await getAllArticles();
    
    // 按日期排序(最新的在前)
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (articles.length === 0) {
        articlesListElement.innerHTML = '<p class="no-articles">暂无文章</p>';
        return;
    }
    
    let articlesHTML = '';
    articles.forEach(article => {
        const dateObj = new Date(article.date);
        const dateStr = `${dateObj.getFullYear()}年${dateObj.getMonth() + 1}月${dateObj.getDate()}日`;
        
        articlesHTML += `
            <article class="article-item">
                <div class="article-item-header">
                    <h2 class="article-item-title">
                        <a href="article.html?id=${article.id}">${article.title}</a>
                    </h2>
                    <time class="article-item-date">${dateStr}</time>
                </div>
                <p class="article-item-excerpt">${article.excerpt}</p>
                <div class="article-item-footer">
                    <a href="article.html?id=${article.id}" class="read-more">继续阅读......</a>
                </div>
            </article>
        `;
    });
    
    articlesListElement.innerHTML = articlesHTML;
}
