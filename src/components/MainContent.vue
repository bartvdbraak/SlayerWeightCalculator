<template>
  <main role="main" class="col-md-10 ml-sm-auto col-lg-10 px-4">
    <router-view :configData.sync="mainConfig"></router-view>
  </main>
</template>

<script>
export default {
	name: 'MainContent',
	data() {
		return {
			mainConfig: {
				statUnlocks: [
					{id: 0, name: 'Slayer level', filter: 'slayer_req', value: {min: 1, current: 99, max: 99}, image: 'slayer_icon.png'},
					{id: 1, name: 'Combat level', filter: 'combat_req', value: {min: 3, current: 126, max: 126}, image: 'combat_icon.png', ignore: 'false'},
					{id: 2, name: 'Defence level', filter: 'defence_req', value: {min: 1, current: 99, max: 99}, image: 'defence_icon.png'},
				],
				pointUnlocks: [
					{id: 0, name: 'Seeing red', monster_ids: [83, 3], unlock: 'false', masters: [5,6,7]},
					{id: 1, name: 'I hope you mith me', monster_ids: [72], unlock: 'false', masters: [5,6,7]},
					{id: 2, name: 'Watch the birdie', monster_ids: [4], unlock: 'false', masters: [4,5,6,7]},
					{id: 3, name: 'Hot stuff', monster_ids: [102], unlock: 'false', masters: [4,6,7]},
					{id: 4, name: 'Reptile got ripped', monster_ids: [66], unlock: 'false', masters: [4,5,6,7]},
					{id: 5, name: 'Like a boss', monster_ids: [15], unlock: 'false', masters: [5,6,7]},
					{id: 6, name: 'Stop the Wyvern', monster_ids: [42], unlock: 'false', block: 'true'},
					{id: 7, name: 'Basilocked', monster_ids: [7], unlock: 'false', masters: [5,6,7]},
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
					{id: 0, name: 'Bone Voyage', monster_ids: [42], unlock: 'false'},
					{id: 1, name: 'Cabin Fever', monster_ids: [60, 21], unlock: 'false'},
					{id: 2, name: 'Contact!', monster_ids: [70], unlock: 'false'},
					{id: 3, name: 'Death Plateau', monster_ids: [96], unlock: 'false'},
					{id: 4, name: 'Death to the Dorgeshuun', monster_ids: [74], unlock: 'false'},
					{id: 5, name: 'Desert Treasure (started)', monster_ids: [34, 94], unlock: 'false'},
					{id: 6, name: 'Dragon Slayer', monster_ids: [48, 14, 83, 12, 17, 58, 97, 72], alternative_text: "Dragons", unlock: 'false'},
					{id: 7, name: 'Dragon Slayer II', monster_ids: [2, 87], unlock: 'false'},
					{id: 8, name: 'Elemental Workshop I', monster_ids: [92], unlock: 'false'},
					{id: 9, name: 'Ernest the Chicken', monster_ids: [62], unlock: 'false'},
					{id: 10, name: 'Fairytale II (without Priest in Peril)', monster_ids: [1], unlock: 'false'},
					{id: 11, name: 'Horror from the Deep', monster_ids: [29], unlock: 'false'},
					{id: 12, name: 'Legends\' Quest', monster_ids: [91], unlock: 'false'},
					{id: 13, name: 'Lost City', monster_ids: [77, 80], unlock: 'false'},
					{id: 14, name: 'Lunar Diplomacy (partial)', monster_ids: [98], unlock: 'false'},
					{id: 15, name: 'Mourning\'s End Part II (started)', monster_ids: [30], unlock: 'false'},
					{id: 16, name: 'Olaf\'s Quest (partial)', monster_ids: [16], unlock: 'false'},
					{id: 17, name: 'Priest in Peril', monster_ids: [6, 27, 103, 45, 90, 106, 13, 0, 57, 78, 43, 1], alternative_text: "Morytania monsters", unlock: 'false'},
					{id: 18, name: 'Regicide (started)', monster_ids: [37], unlock: 'false'},
					{id: 19, name: 'Royal Trouble', monster_ids: [89], unlock: 'false'},
					{id: 20, name: 'Rum Deal (started)', monster_ids: [39], unlock: 'false'},
					{id: 21, name: 'Skippy and the Mogres (miniquest)', monster_ids: [73], unlock: 'false'},
					{id: 22, name: 'Waterfall Quest', monster_ids: [40], unlock: 'false'},
				],
			}
		}
	},
	methods: {
	},
	watch: {
		mainConfig: {
			handler() {
				if (localStorage.getItem('remember') === 'true') {
					localStorage.setItem('configData', JSON.stringify(this.mainConfig));
				}
			},
			deep: true,
		}
	},
	created() {
		if (localStorage.getItem("configData") && localStorage.getItem('remember') === 'true') {
			this.mainConfig = JSON.parse(localStorage.getItem("configData"));
		}
		else if (localStorage.getItem("configData") && localStorage.getItem('remember') === 'false') {
			localStorage.removeItem("configData");
		}
	},
}
</script>

<style scoped>
  [role="main"] {
    padding-top: 48px;
  }
</style>
