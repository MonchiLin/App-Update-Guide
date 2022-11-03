## 安装依赖 Install Deps

```bash
yarn
```

## 初始化数据库 Initializer DataBase

```bash
npx prisma migrate dev --name init
npx prisma generate --schema=prisma
```

## 启动服务

```bash
yarn dev
```

## API

### 查询所有热更新
[GET] /api/hot-update

### 根据 id 查询热更新
[GET] /api/hot-update/:id

### 根据 id 删除热更新
[DELETE] /api/hot-update/:id

### 根据平台和基座版本版本查询热更新
[GET] /api/hot-update/:platform/:hostingVersion

示例 /api/hot-update/android/1.2.0, /api/hot-update/android/2.0.0

### 查询所有最新版本
[GET] /api/latest-version

### 根据平台查询最新版本
[GET] /api/latest-version/:platform

### 创建最新版本
[POST] /api/latest-version

### 更新或创建指定平台的最新版本
[PUT] /api/latest-version/:platform

### 删除指定平台的最新版本
[DELETE] /api/latest-version/:platform
