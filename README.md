# 动漫岛后台管理系统

## 项目简介

本项目采用 [Electron](https://www.electronjs.org/) + [React](https://reactjs.org/) 框架进行开发, 适用于局域网的网站后台管理系统.

- Web端地址: [https://github.com/fzcoder/animeisland-web](https://github.com/fzcoder/animeisland-web)
- 服务端地址: [https://github.com/fzcoder/animeisland-server](https://github.com/fzcoder/animeisland-server)

## 如何启动项目(开发模式)?

### 1.克隆本项目

```shell
git clone git@github.com:fzcoder/animeisland-admin.git
```

### 2.安装依赖

```shell
npm install
```

### 3.修改配置文件

在项目根目录下找到`.env.development`和`.env.production`, 根据实际情况修改以下内容:

```
REACT_APP_SERVER_BASE_URL=http://{your_server_host}:{port}/api
```

### 4.启动React项目(开发模式)

```shell
npm start
```

### 5.启动Electron项目(开发模式)

```shell
npm run electron-dev
```

## 如何打包?

### 1.打包React项目

```shell
npm run build
```

输入指令之后会在项目根目录下`./build`中找到打包的内容

### 2.打包Electron项目

```shell
npm run package
```

输入指令之后会在项目根目录下`./out`中找到打包的内容
