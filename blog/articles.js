// 文章索引配置
// 文章列表从后端 API 自动获取，无需手动维护
let articlesList = [];

// 文章缓存
const articlesCache = {};

// 从 API 获取文章列表
async function fetchArticlesList() {
    if (articlesList.length > 0) {
        return articlesList; // 已加载过
    }
    
    try {
        const apiUrl = getApiUrl('articles');
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('获取文章列表失败');
        }
        articlesList = await response.json();
        return articlesList;
    } catch (error) {
        console.error('获取文章列表失败:', error);
        return [];
    }
}

// 解析 Front Matter (YAML 格式的元数据)
function parseFrontMatter(content) {
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontMatterRegex);
    
    if (!match) {
        return { metadata: {}, content: content };
    }
    
    const frontMatter = match[1];
    const markdownContent = match[2];
    
    const metadata = {};
    frontMatter.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim();
            
            // 处理数组类型 (用逗号分隔)
            if (key === 'categories' || key === 'tags') {
                metadata[key] = value.split(',').map(item => item.trim());
            } else {
                metadata[key] = value;
            }
        }
    });
    
    return { metadata, content: markdownContent };
}

// 异步加载文章
async function getArticle(articleId) {
    // 检查缓存
    if (articlesCache[articleId]) {
        return articlesCache[articleId];
    }
    
    try {
        const apiUrl = getApiUrl('article', `/${articleId}`);
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`文章 ${articleId} 未找到`);
        }
        
        const markdownText = await response.text();
        const { metadata, content } = parseFrontMatter(markdownText);
        
        // 合并元数据和内容
        const article = {
            ...metadata,
            content: content
        };
        
        // 缓存文章
        articlesCache[articleId] = article;
        
        return article;
    } catch (error) {
        console.error('加载文章失败:', error);
        return null;
    }
}

// 获取所有文章列表 (异步)
async function getAllArticles() {
    // 先获取文章列表
    const ids = await fetchArticlesList();
    
    const articles = [];
    for (const articleId of ids) {
        const article = await getArticle(articleId);
        if (article) {
            articles.push(article);
        }
    }
    return articles;
}

// 获取所有标签
async function getAllTags() {
    const articles = await getAllArticles();
    const tagsSet = new Set();
    articles.forEach(article => {
        if (article.tags) {
            article.tags.forEach(tag => tagsSet.add(tag));
        }
    });
    return Array.from(tagsSet).sort();
}
