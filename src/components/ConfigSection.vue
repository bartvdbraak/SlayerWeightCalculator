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
	    	pointUnlocks: {
	    		redDragons: false,
	    		mithDragons: false,
	    		aviansies: false,
				tzhaars: false,
	    		lizardmen: false,
	    		fossilIslandWyverns: false,
			},
			blockList: [],
			questUnlocks: [
				{id: 0, name: 'Bone Voyage', monster_ids: [42], unlock: false},
				{id: 1, name: 'Cabin Fever', monster_ids: [60, 21], unlock: false},
				{id: 2, name: 'Contact!', monster_ids: [70], unlock: false},
				{id: 3, name: 'Death Plateau', monster_ids: [96], unlock: false},
				{id: 4, name: 'Death to the Dorgeshuun', monster_ids: [74], unlock: false},
			]
		}
	},
}
</script>

<style scoped>

</style>
