<template>
  <main role="main" class="col-md-10 ml-sm-auto col-lg-10 px-4">
    <router-view></router-view>
  </main>
</template>

<script>
export default {
	name: 'MainContent',
	components: {
	},
	props: {
		headerText: String,
		currentComponent: {
		  default: 'config-section',
		},
	},
}
</script>

<style scoped>
  [role="main"] {
    padding-top: 48px;
  }
</style>
