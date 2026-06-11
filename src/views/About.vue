<template>
  <div class="about-container">
    <h1>关于</h1>
    
    <el-card>
      <template #header>
        <div class="card-header">
          <span>项目信息</span>
        </div>
      </template>
      <div class="about-content">
        <p><strong>技术栈：</strong></p>
        <ul>
          <li>Vue 3.5.35</li>
          <li>Element Plus</li>
          <li>Webpack 5</li>
        </ul>
        
        <el-divider />
        
        <p><strong>项目特点：</strong></p>
        <el-tag type="success" style="margin: 5px;">Vue 3 Composition API</el-tag>
        <el-tag type="primary" style="margin: 5px;">Element Plus UI</el-tag>
        <el-tag type="warning" style="margin: 5px;">响应式设计</el-tag>
      </div>
    </el-card>

    <el-card style="margin-top: 20px;">
      <template #header>
        <div class="card-header">
          <span>联系方式</span>
        </div>
      </template>
      <p>这是一个 Vue 3 + Element Plus 示例项目</p>
      <el-button type="primary" @click="showInfo">点击查看更多信息</el-button>
    </el-card>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';

export default {
  name: 'About',
  setup() {
    const showInfo = () => {
      ElMessage.info('感谢使用 Vue 3 + Element Plus！');
    };

    return {
      showInfo
    };
  }
};
</script>

<style scoped>
.about-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #409eff;
  text-align: center;
  margin-bottom: 30px;
}

.card-header {
  font-weight: bold;
  font-size: 1.1em;
}

.about-content ul {
  list-style: none;
  padding-left: 0;
}

.about-content li {
  padding: 5px 0;
  color: #606266;
}

.about-content li:before {
  content: "✓ ";
  color: #67c23a;
  font-weight: bold;
}
</style>
