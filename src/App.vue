<template>
  <div id="app">
    <h1>Hello Vue 3 + Element Plus</h1>
    <el-button type="primary">点击测试</el-button>
  </div>
</template>

<script>
import { ElButton } from 'element-plus';

export default {
  name: 'App',
  components: {
    ElButton
  }
};
</script>

<style>
#app {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
</style>