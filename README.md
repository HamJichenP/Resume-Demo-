# Portfolio Project — Resume website

&nbsp;&nbsp;一個前後端分離的個人作品集系統，用於展示履歷、興趣、專案內容，並提供後台編輯功能。  
&nbsp;&nbsp;本專案分為 **前端（Vue 3 . js）** 與 **後端（ ASP.NET Core Web API）**，資料庫（SQL），並可管理與顯示使用者上傳的照片、內容。

## Overview - 專案內容

**PortfolioProject** 是一個為個人履歷展示設計的網站系統，包含：

- 前端頁面（首頁 / 履歷 / 興趣）
- 後台 CRUD API（Career / Interests）
- 圖片上傳與對外顯示
- CORS 設定、Swagger API 文件
- 可擴充為完整後台系統（登入 / 管理）

設計目的是打造：
- **可維護性高**
- **可擴充**
- **前後端分離**
- **易部署**
的個人作品網站。

## Features - 功能特色

### 前端 (Vue 3)
- SPA（Single Page Application）結構
- 多頁路由（Home, Career, Interests）
- 使用 Axios 連線後端 API
- 顯示履歷、興趣與圖片
- 後台來控制前端內容

### 後端 (ASP.NET Core Web API)
- Career、Interests 的 CRUD API
- 啟用 CORS，允許前端訪問
- Swagger API Explorer (confirm all my API)
- Static Files 映射 `/uploads` 供圖片直接讀取
- 清晰層級：Controller / Models / Services（可擴充）

### 檔案儲存
- 圖片存於私服器檔案
- 資料庫只存相對路徑 `/uploads/...`

## Tech Stack - 使用的所有技術、框架、語言、工具

### Frontend (JackResume)
- Vue 3
- Vite (前端專案啟動器)
- Vue Router (網頁分頁工具)
- Axios (呼叫後端 API)
- JavaScript / TypeScript

### Backend (ResumeAPI)
- ASP.NET Core 8 Web API
- Swagger / OpenAPI
- CORS 
- Static Files Provider
- SQL Server（DB 之後加入）

### Others
- Git / GitHub
- npm / node
- .NET SDK 8


