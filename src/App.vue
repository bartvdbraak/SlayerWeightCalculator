<template>
  <div id="app">
    <top-nav></top-nav>
    <div class="container-fluid">
      <div class="row">
        <left-nav></left-nav>
        <main-content></main-content>
      </div>
    </div>
  </div>
</template>

<script>
import MainContent from './components/MainContent.vue';
import LeftNav from './components/LeftNav.vue';
import TopNav from './components/TopNav.vue';

export default {
	name: 'app',
	components: {
		MainContent,
		LeftNav,
		TopNav,
	}
}
</script>

<style>
#app {
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-size: .875rem;
}
</style>
