<template>
  <div id="app">
    <Header @page-change="handlePageChange" />
    <main class="main-content">
      <component :is="currentComponent" />
    </main>
  </div>
</template>

<script>
import { ref, markRaw } from 'vue';
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
    const currentComponent = ref(markRaw(Home));

    const handlePageChange = (page) => {
      if (page === 'home') {
        currentComponent.value = markRaw(Home);
      } else if (page === 'about') {
        currentComponent.value = markRaw(About);
      }
    };

    return {
      currentComponent,
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
