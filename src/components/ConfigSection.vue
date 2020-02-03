<template>
    <section>
        <div class="pt-3 pb-2 my-2">
            <h1 class="h3 text-uppercase mb-2">Account Settings</h1>
            <hr>
            <b-row>
                <b-col class="text-center align-content-center">
                    <h4>Slayer Point Unlocks</h4>
                </b-col>
                <b-col class="text-center align-content-center">
                    <h4>Slayer Block List</h4>
                </b-col>
            </b-row>
            <hr>
            <b-row class="text-center align-content-center">
                <b-col>
                    <h4>Quests</h4>
                </b-col>
            </b-row>
            <hr>
            <b-row class="text-center align-content-center">
                <b-col>
                    <h4>Stats</h4>
                </b-col>
            </b-row>
        </div>
    </section>
</template>

<script>
import monster_json from '../data/masters'
export default {
	name: "ConfigSection",
	props: {
		config: Object,
	},
	data() {
	    return {
	    	monsterData: monster_json,
	    	pointUnlocks: [
		        {id: 0, name: 'Seeing red', monster_ids: [83], unlock: false},
		        {id: 1, name: 'I hope you mith me', monster_ids: [72], unlock: false},
		        {id: 2, name: 'Watch the birdie', monster_ids: [4], unlock: false},
		        {id: 3, name: 'Hot stuff', monster_ids: [102], unlock: false},
		        {id: 4, name: 'Reptile got ripped', monster_ids: [66], unlock: false},
		        {id: 5, name: 'Like a boss', monster_ids: [15], unlock: false},
		        {id: 6, name: 'Stop the Wyvern', monster_ids: [42], unlock: true},
		        {id: 7, name: 'Basilocked', monster_ids: [7], unlock: true},
	        ],
			blockList: [
				{id: 0, name: 'Block task (50 quest points)', monster_ids: [], block: true},
				{id: 1, name: 'Block task (100 quest points)', monster_ids: [], block: true},
				{id: 2, name: 'Block task (150 quest points)', monster_ids: [], block: true},
				{id: 3, name: 'Block task (200 quest points)', monster_ids: [], block: true},
				{id: 4, name: 'Block task (250 quest points)', monster_ids: [], block: true},
				{id: 5, name: 'Block task (300 quest points)', monster_ids: [], block: true},
			],
			questUnlocks: [
				{id: 0, name: 'Bone Voyage', monster_ids: [42], unlock: false},
				{id: 1, name: 'Cabin Fever', monster_ids: [60, 21], unlock: false},
				{id: 2, name: 'Contact!', monster_ids: [70], unlock: false},
				{id: 3, name: 'Death Plateau', monster_ids: [96], unlock: false},
				{id: 4, name: 'Death to the Dorgeshuun', monster_ids: [74], unlock: false},
			],
			statUnlocks: [
				{id: 0, name: 'Slayer level', value: {min: 1, current: 99, max: 99}, unlock: false},
				{id: 1, name: 'Combat level', value: {min: 3, current: 126, max: 126}, unlock: false},
				{id: 2, name: 'Defence level', value: {min: 1, current: 99, max: 99}, unlock: false},
			]
		}
	},
}
</script>

<style scoped>

</style>
