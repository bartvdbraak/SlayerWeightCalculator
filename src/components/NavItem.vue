<template>
    <li class="nav-item">
        <router-link class="nav-link" v-bind:class="{ active: isActive }" v-if="to" :to="{ name: to, params: { id: id }}">
            <img class="mx-2 rounded-circle shadow" v-if="icon_url" :src="require(`../assets/${icon_url}`)" width="42" height="42">
            <span class="h6">{{ title }}</span>

        </router-link>

        <a class="nav-link" :target="targetVal" v-bind:class="{ active: isActive }" v-if="url" :href="url" >
            <img class="mx-2 rounded-circle shadow" v-if="icon_url" :src="require(`../assets/${icon_url}`)" width="42" height="42">
            <span class="h6">{{ title }}</span>
        </a>
    </li>
</template>

<script>
export default {
	name: "NavItem",
	data() {
		return {
		}
	},
	props: {
		id: Number,
		icon_url: String,
		title: String,
		component: String,
		url: String,
		to: String,
		isActive: Boolean,
		targetVal: String,
	},
}
</script>

<style scoped>
    .active {
        background: darkgray;
        color: black;
        cursor: default;
    }
</style>
