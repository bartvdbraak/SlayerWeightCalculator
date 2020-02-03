<template>
    <section>
        <div class="pt-3 pb-2 my-2">
            <h1 class="h3 text-uppercase mb-2" @click="testConfig">Account Settings</h1>
            <hr>
            <h4>Stats</h4>
            <b-row class="text-center align-content-center">
                <b-col sm="6" md="4" v-for="statUnlock in configData.statUnlocks" v-bind:key="statUnlock.id">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                <img :src="require(`../assets/${statUnlock.image}`)" :title="statUnlock.name">
                            </span>
                        </div>
                        <b-form-input
                                class="form-control"
                                v-model="statUnlock.value.current"
                                debounce="500"
                                type="number"
                                :min="statUnlock.value.min"
                                :max="statUnlock.value.max">
                        </b-form-input>
                    </div>
                </b-col>
            </b-row>
            <hr>
            <b-row>
                <b-col class="justify-content-between">
                    <h4>Slayer Point Unlocks</h4>
                    <b-form-checkbox
                            class="mb-1"
                            v-for="pointUnlock in configData.pointUnlocks"
                            v-bind:key="pointUnlock.id"
                            v-model="pointUnlock.unlock"
                            :name="pointUnlock.name"
                            value="true"
                            unchecked-value="false"
                            >
                        <span class="mr-2" v-b-tooltip.hover.right :title="''">{{ pointUnlock.name }}
                            <small class="text-monospace text-muted">{{ monsterPreText(pointUnlock) }}</small>
                        </span>
                    </b-form-checkbox>
                </b-col>
                <b-col>
                    <h4>Slayer Block List</h4>
                    <b-form-select
                            class="mt-1"
                            size="sm"
                            v-for="block in configData.blockList"
                            v-bind:key="block.id"
                            v-model="block.monster_ids"
                            :options="monsterData">
                        <template v-slot:first>
                            <b-form-select-option :value="null" disabled>-- Select an option to block --</b-form-select-option>
                        </template>

                    </b-form-select>
                </b-col>
            </b-row>
            <hr>
            <h4>Quests Unlocks</h4>
            <b-row>
                    <b-col md="6" xl="4" v-for="questUnlock in configData.questUnlocks" v-bind:key="questUnlock.id">
                        <b-form-checkbox
                                class="mb-1"
                                v-model="questUnlock.unlock"
                                :name="questUnlock.name"
                                value="true"
                                unchecked-value="false"
                        >
                            {{ questUnlock.name }} <br>
                            <small v-if="questUnlock.alternative_text" class="text-monospace text-muted" >
                                Unlocks <span class="text-info" v-b-tooltip.hover.right :title="monsterListString(questUnlock)">{{ questUnlock.alternative_text }}</span>
                            </small>
                            <small v-else class="text-monospace text-muted">{{ monsterListString(questUnlock) }}</small>
                        </b-form-checkbox>
                    </b-col>
            </b-row>

        </div>
    </section>
</template>

<script>
import monster_json from '../data/monsters'
export default {
	name: "ConfigSection",
	props: {
		config: Object,
	},
	data() {
	    return {
	    	monsterData: monster_json,
			configData: {
	    	pointUnlocks: [
		        {id: 0, name: 'Seeing red', monster_ids: [83, 3], unlock: false, masters: [5,6,7]},
		        {id: 1, name: 'I hope you mith me', monster_ids: [72], unlock: false, masters: [5,6,7]},
		        {id: 2, name: 'Watch the birdie', monster_ids: [4], unlock: false, masters: [4,5,6,7]},
		        {id: 3, name: 'Hot stuff', monster_ids: [102], unlock: false, masters: [4,6,7]},
		        {id: 4, name: 'Reptile got ripped', monster_ids: [66], unlock: false, masters: [4,5,6,7]},
		        {id: 5, name: 'Like a boss', monster_ids: [15], unlock: false, masters: [5,6,7]},
		        {id: 6, name: 'Stop the Wyvern', monster_ids: [42], unlock: false, block: true},
		        {id: 7, name: 'Basilocked', monster_ids: [7], unlock: false, masters: [5,6,7]},
	        ],
				blockList: [
					{id: 0, name: 'Block task (50 quest points)', monster_ids: null, block: true},
					{id: 1, name: 'Block task (100 quest points)', monster_ids: null, block: true},
					{id: 2, name: 'Block task (150 quest points)', monster_ids: null, block: true},
					{id: 3, name: 'Block task (200 quest points)', monster_ids: null, block: true},
					{id: 4, name: 'Block task (250 quest points)', monster_ids: null, block: true},
					{id: 5, name: 'Block task (300 quest points)', monster_ids: null, block: true},
				],
				questUnlocks: [
					{id: 0, name: 'Bone Voyage', monster_ids: [42], unlock: false},
					{id: 1, name: 'Cabin Fever', monster_ids: [60, 21], unlock: false},
					{id: 2, name: 'Contact!', monster_ids: [70], unlock: false},
					{id: 3, name: 'Death Plateau', monster_ids: [96], unlock: false},
					{id: 4, name: 'Death to the Dorgeshuun', monster_ids: [74], unlock: false},
					{id: 5, name: 'Desert Treasure (started)', monster_ids: [34, 94], unlock: false},
					{id: 6, name: 'Dragon Slayer', monster_ids: [48, 14, 83, 12, 17, 58, 97, 72, 2, 87], alternative_text: "Dragons", unlock: false},
					{id: 7, name: 'Dragon Slayer II', monster_ids: [2, 87], unlock: false},
					{id: 8, name: 'Elemental Workshop I', monster_ids: [92], unlock: false},
					{id: 9, name: 'Ernest the Chicken', monster_ids: [62], unlock: false},
					{id: 10, name: 'Fairytale II (without Priest in Peril)', monster_ids: [1], unlock: false},
					{id: 11, name: 'Horror from the Deep', monster_ids: [29], unlock: false},
					{id: 12, name: 'Legends\' Quest', monster_ids: [91], unlock: false},
					{id: 13, name: 'Lost City', monster_ids: [77, 80], unlock: false},
					{id: 14, name: 'Lunar Diplomacy (partial)', monster_ids: [98], unlock: false},
					{id: 15, name: 'Mourning\'s End Part II (started)', monster_ids: [30], unlock: false},
					{id: 16, name: 'Olaf\'s Quest (partial)', monster_ids: [16], unlock: false},
					{id: 17, name: 'Priest in Peril', monster_ids: [6, 27, 103, 45, 90, 106, 13, 0, 57, 78, 43, 1], alternative_text: "Morytania monsters", unlock: false},
					{id: 18, name: 'Regicide (started)', monster_ids: [37], unlock: false},
					{id: 19, name: 'Royal Trouble', monster_ids: [89], unlock: false},
					{id: 20, name: 'Rum Deal (started)', monster_ids: [39], unlock: false},
					{id: 21, name: 'Skippy and the Mogres (miniquest)', monster_ids: [73], unlock: false},
					{id: 22, name: 'Waterfall Quest', monster_ids: [40], unlock: false},
				],
				statUnlocks: [
					{id: 0, name: 'Slayer level', value: {min: 1, current: 99, max: 99}, image: 'Slayer_icon.png', unlock: false},
					{id: 1, name: 'Combat level', value: {min: 3, current: 126, max: 126}, image: 'Combat_icon.png', unlock: false},
					{id: 2, name: 'Defence level', value: {min: 1, current: 99, max: 99}, image: 'Defence_icon.png', unlock: false},
				]
			}
		}
	},
	methods: {
		monsterPreText(entry) {
			let listString = this.monsterListString(entry);

			if (entry.block) {
				return 'Blocks ' + listString
			} else {
				return 'Unlocks ' + listString
			}
		},
		monsterListString(entry) {
			let monsterList = [];
			entry['monster_ids'].forEach( id => {
				monsterList.push(this.monsterData[id].text)
			});

			return monsterList.join(', ').replace(/,(?!.*,)/gmi, ' and');
		},
		masterListString(entry) {
			let monsterList = [];
			entry['add_to_sm'].forEach( id => {
				monsterList.push(this.mastersData[id].name)
			});

			return 'Assigned by' + monsterList.join(', ').replace(/,(?!.*,)/gmi, ' and');
		},
		testConfig() {
			console.log(JSON.stringify(this.configData.blockList, null, 2))
		},
	},
	beforeDestroy: function() {
		this.$emit('config', this.configData)
	}
}
</script>

<style scoped>

</style>
