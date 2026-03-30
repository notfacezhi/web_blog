#!/bin/bash
echo "启动后端 API 服务 (Uvicorn)..."
uvicorn server:app --host 0.0.0.0 --port 8091
