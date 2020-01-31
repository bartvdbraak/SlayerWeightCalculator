<template>
    <li class="nav-item" @click="contentSwitch">
        <router-link class="nav-link" v-bind:class="{ active: isActive }" v-if="to" :to="{ name: to, params: { id: id }}">
            <img class="mx-2 rounded-circle shadow" v-if="icon_url" :src="require(`../assets/${icon_url}`)" width="42" height="42">
            <span class="h6">{{ title }} {{to}}</span>

        </router-link>

        <a class="nav-link" v-bind:class="{ active: isActive }" v-if="url" :href="url" >
            <img class="mx-2 rounded-circle shadow" v-if="icon_url" :src="require(`../assets/${icon_url}`)" width="42" height="42">
            <span class="h6">{{ title }} {{to}}</span>
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
		component: String,
		url: String,
		to: String,
	},
	methods: {
		contentSwitch() {
			this.$emit('contentSwitch', this.component);
		}
	}
}
</script>

<style scoped>

</style>
