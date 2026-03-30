#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
博客后端服务 - FastAPI 版本
自动扫描 articles 目录，提供文章列表 API
运行方法：python server.py 或 uvicorn server:app --reload
"""

from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, PlainTextResponse
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from typing import List
import uvicorn

# 创建 FastAPI 应用
app = FastAPI(
    title="博客 API",
    description="自动扫描文章目录的博客后端服务",
    version="1.0.0"
)

# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 获取当前目录
BASE_DIR = Path(__file__).parent
ARTICLES_DIR = BASE_DIR / "articles"


@app.get("/api/articles", response_model=List[str], summary="获取文章列表")
async def get_articles():
    """
    获取所有文章的 ID 列表
    
    返回示例：["article-1", "article-2", "article-3"]
    """
    article_ids = []
    
    if ARTICLES_DIR.exists():
        for file in ARTICLES_DIR.glob("*.md"):
            # 排除 README.md
            if file.name != "README.md":
                article_id = file.stem  # 去掉 .md 后缀
                article_ids.append(article_id)
    
    # 排序
    article_ids.sort()
    
    return article_ids


@app.get("/api/article/{article_id}", response_class=PlainTextResponse, summary="获取文章内容")
async def get_article(article_id: str):
    """
    获取指定文章的 Markdown 内容
    
    - **article_id**: 文章 ID（不含 .md 后缀）
    """
    article_file = ARTICLES_DIR / f"{article_id}.md"
    
    if not article_file.exists():
        raise HTTPException(status_code=404, detail=f"文章 {article_id} 不存在")
    
    try:
        content = article_file.read_text(encoding="utf-8")
        return content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"读取文章失败: {str(e)}")


@app.get("/", summary="API 根路径")
async def root():
    """API 根路径，返回服务信息"""
    return {
        "service": "博客 API 服务",
        "version": "1.0.0",
        "endpoints": {
            "articles": "/api/articles",
            "article": "/api/article/{id}",
            "docs": "/docs"
        }
    }


def main():
    """启动服务"""
    print("""
╔════════════════════════════════════════════════════════╗
║          博客服务已启动 (FastAPI)                       ║
╠════════════════════════════════════════════════════════╣
║  访问地址: http://localhost:8091                        ║
║  API 文档: http://localhost:8091/docs                   ║
║  文章列表: http://localhost:8091/api/articles           ║
║  停止服务: Ctrl+C                                       ║
╚════════════════════════════════════════════════════════╝
    """)
    
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8091,
        log_level="info"
    )


if __name__ == "__main__":
    main()
