<template>
    <li class="nav-item">
        <a class="nav-link active" v-bind:class="{ active: isActive }" href="#">
            <img class="mx-2" v-if="icon_url" :src="require(`../assets/${icon_url}`)" width="42" height="42">
            <span class="h6">{{ title }}</span>
        </a>
    </li>
</template>

<script>
export default {
	name: "NavItem",
	data() {
		return {
			isActive: false,
		}
	},
	props: {
		id: Number,
		icon_url: String,
		title: String,
	}
}
</script>

<style scoped>

</style>
