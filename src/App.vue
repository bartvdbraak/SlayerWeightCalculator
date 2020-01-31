<template>
  <div id="app">
    <navbar></navbar>
    <main-content headerText="test message"></main-content>
  </div>
</template>

<script>
import MainContent from './components/MainContent.vue';
import Navbar from './components/Navbar.vue';

export default {
  name: 'app',
  components: {
    MainContent,
    Navbar,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
