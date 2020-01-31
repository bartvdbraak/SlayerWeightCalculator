<template>
  <main role="main" class="ml-sm-auto col-lg-10 px-4">
    <section-content></section-content>
  </main>
</template>

<script>
import SectionContent from "./TableSection";
export default {
	name: 'MainContent',
	components: {
	  SectionContent,
	},
	props: {
		headerText: String
	}
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
