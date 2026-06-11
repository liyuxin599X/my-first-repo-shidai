# Vue 3 + Element Plus 项目

## 项目介绍
这是一个基于 Vue 3 和 Element Plus 的前端示例项目。

## 技术栈
- **Vue 3.5.35** - 渐进式 JavaScript 框架
- **Element Plus** - 基于 Vue 3 的组件库
- **Webpack 5** - 模块打包工具

## 项目结构
```
Demo/
├── public/
│   └── index.html          # HTML 模板
├── src/
│   ├── components/         # 可复用组件
│   │   └── Header.vue      # 头部导航组件
│   ├── views/              # 页面级组件
│   │   ├── Home.vue        # 首页
│   │   └── About.vue       # 关于页
│   ├── App.vue             # 根组件
│   ├── main.js             # 入口文件
│   └── style.css           # 全局样式
├── package.json            # 项目配置
└── README.md               # 项目说明
```

## 安装依赖
```bash
npm install
```

## 运行项目
```bash
npm run dev
```

## 构建项目
```bash
# 生产环境构建
npm run build

# 开发环境构建
npm run build:dev
```

## Element Plus 使用示例

### 1. 完整引入（已在 main.js 中配置）
```javascript
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
app.use(ElementPlus);
```

### 2. 在组件中使用
```vue
<template>
  <el-button type="primary">按钮</el-button>
  <el-input v-model="value" placeholder="请输入" />
  <el-card>卡片内容</el-card>
</template>
```

## 注意事项
- ✅ 本项目使用 Vue 3，必须配合 Element Plus（而非 element-ui）
- ❌ 不要安装 element-ui，它只支持 Vue 2
- 📦 Element Plus 已全局注册，可直接在所有组件中使用

## 更多资源
- [Vue 3 官方文档](https://cn.vuejs.org/)
- [Element Plus 官方文档](https://element-plus.org/zh-CN/)
