<template>
  <div class="hello">
    <h1>{{ headerText }}</h1>
  </div>
</template>

<script>
export default {
  name: 'MainContent',
  props: {
    headerText: String
  }
}
</script>

<style scoped>

</style>
