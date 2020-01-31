<template>
  <main role="main" class="ml-sm-auto col-lg-10 px-4">
    <component :is="currentComponent"></component>
  </main>
</template>

<script>
import TableSection from "./TableSection";
import ConfigSection from "./ConfigSection";

export default {
	name: 'MainContent',
	components: {
		TableSection,
	},
	props: {
		headerText: String,
		currentComponent: {
		  default: 'table-section',
		},
	},
}
</script>

<style scoped>
  [role="main"] {
    padding-top: 133px; /* Space for fixed navbar */
  }

  @media (min-width: 768px) {
    [role="main"] {
      padding-top: 48px; /* Space for fixed navbar */
    }
  }
</style>
