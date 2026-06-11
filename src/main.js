import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import './style.css';

const app = createApp(App);

// 使用 Element Plus
app.use(ElementPlus);

app.mount('#app');
