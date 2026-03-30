// API 配置 - 前后端分离架构
const API_CONFIG = {
    // 自动检测环境
    // 本地开发 (localhost:3000) → 完整地址 http://localhost:8091
    // 生产环境 (域名访问) → 相对路径（通过 Nginx 反向代理）
    baseURL: (function() {
        const hostname = window.location.hostname;
        const port = window.location.port;
        
        // 本地开发环境检测
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'http://localhost:8091';
        }
        
        // 生产环境使用相对路径（Nginx 反向代理）
        return '';
    })(),
    
    // API 端点
    endpoints: {
        articles: '/api_webblog/articles',
        article: '/api_webblog/article'
    }
};

// 获取完整的 API URL
function getApiUrl(endpoint, params = '') {
    return `${API_CONFIG.baseURL}${API_CONFIG.endpoints[endpoint]}${params}`;
}

// 环境检测日志
const env = API_CONFIG.baseURL ? '开发环境 (本地)' : '生产环境 (Nginx 代理)';
console.log(`📡 API 配置: ${API_CONFIG.baseURL || '相对路径'} [${env}]`);
