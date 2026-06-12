<template>
  <div id="app">
    <Header @page-change="handlePageChange" />
    <main class="main-content">
      <Home v-if="currentPage === 'home'" />
      <About v-else-if="currentPage === 'about'" />
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';
import Header from './components/Header.vue';
import Home from './views/Home.vue';
import About from './views/About.vue';

export default {
  name: 'App',
  components: {
    Header,
    Home,
    About
  },
  setup() {
    const currentPage = ref('home');

    const handlePageChange = (page) => {
      currentPage.value = page;
    };

    return {
      currentPage,
      handlePageChange
    };
  }
};
</script>

<style>
#app {
  min-height: 100vh;
}

.main-content {
  padding-top: 20px;
}
</style>
