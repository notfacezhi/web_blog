// API 配置 - 前后端分离架构
const API_CONFIG = {
    // 后端 API 地址
    // 开发环境: http://localhost:8091
    // 生产环境: 修改为实际的后端 API 地址
    baseURL: 'http://localhost:8091',
    
    // API 端点
    endpoints: {
        articles: '/api/articles',
        article: '/api/article'
    }
};

// 获取完整的 API URL
function getApiUrl(endpoint, params = '') {
    return `${API_CONFIG.baseURL}${API_CONFIG.endpoints[endpoint]}${params}`;
}

// 环境检测（可选）
console.log('📡 API 配置:', API_CONFIG.baseURL);
