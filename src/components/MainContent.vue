<template>
  <main role="main" class="col-md-10 ml-sm-auto col-lg-10 px-4">
    <router-view v-bind="currentConfig" v-on:config="setConfig"></router-view>
  </main>
</template>

<script>
export default {
	name: 'MainContent',
	data() {
		return {
			currentConfig: {},
		}
	},
	methods: {
		setConfig(configObject) {
			this.currentConfig = configObject;
			console.log(this.currentConfig)
		}
	}
}
</script>

<style scoped>
  [role="main"] {
    padding-top: 48px;
  }
</style>
