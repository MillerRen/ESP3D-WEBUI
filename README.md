# ESP3D的重构版本

## 设计目标
1. 代替ESP3D原有的WEBUI
1. 优化WEBUI更易维护
1. 提供更好的交互体验
1. 本土化

## 路线图
1. 技术选型：确定使用Vue生态构建整个系统
1. 环境搭建：把所有资源打包到一个自包含的html，把html压缩为gzip格式，清理无用的其他文件
1. 简单重构：使用Vue及周边生态实现对ESP3D-WEBUI的重构
1. 优化重构: 对原有结构和逻辑进行重构使得更加容易维护
1. 体验优化：对外观和交互体验进行优化
1. 适配3.0： 适配最新版本
1. 重构ESP3D: 对ESP3D后端和通信协议进行优化

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
