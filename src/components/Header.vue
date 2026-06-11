<template>
  <header class="header">
    <nav class="nav">
      <div class="logo">Vue + Element Plus</div>
      <ul class="nav-links">
        <li><a href="#" @click.prevent="navigateTo('home')" :class="{ active: currentPage === 'home' }">首页</a></li>
        <li><a href="#" @click.prevent="navigateTo('about')" :class="{ active: currentPage === 'about' }">关于</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Header',
  emits: ['page-change'],
  setup(props, { emit }) {
    const currentPage = ref('home');

    const navigateTo = (page) => {
      currentPage.value = page;
      emit('page-change', page);
    };

    return {
      currentPage,
      navigateTo
    };
  }
};
</script>

<style scoped>
.header {
  background-color: #409eff;
  padding: 15px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: white;
  font-size: 1.5em;
  font-weight: bold;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 30px;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 1.1em;
  transition: opacity 0.3s;
}

.nav-links a:hover {
  opacity: 0.8;
}

.nav-links a.active {
  font-weight: bold;
  border-bottom: 2px solid white;
}
</style>
