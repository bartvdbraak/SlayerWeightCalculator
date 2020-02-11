<template>
    <section>
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 my-2">
            <h1 class="h3 text-uppercase font-weight-bolder"><span v-if="currentMaster">{{currentMaster.name}}</span></h1>
        </div>
        <b-row>
            <b-col lg="6" class="my-1">
                <b-form-group
                        label="Filter"
                        label-cols-sm="3"
                        label-align-sm="right"
                        label-size="sm"
                        label-for="filterInput"
                        class="mb-0"
                >
                    <b-input-group size="sm">
                        <b-form-input
                                v-model="filter"
                                type="search"
                                id="filterInput"
                                placeholder="Type to Search"
                        ></b-form-input>
                        <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </b-col>

            <b-col lg="6" class="my-1">
                <b-form-group
                        label="Filter On"
                        label-cols-sm="3"
                        label-align-sm="right"
                        label-size="sm"
                        description="Leave all unchecked to filter on all data"
                        class="mb-0">
                    <b-form-checkbox-group v-model="filterOn" class="mt-1">
                        <b-form-checkbox value="monster">Name</b-form-checkbox>
                        <b-form-checkbox value="combat_req">Combat</b-form-checkbox>
                        <b-form-checkbox value="slayer_req">Slayer</b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group>
            </b-col>
        </b-row>
        <div class="table-responsive">
            <b-table striped hover
                     :items="filtered_items"
                     :fields="fields"
                     :sort-by.sync="sortBy"
                     :sort-desc.sync="sortDesc"
                     :sort-direction="sortDirection"
                     :filter="filter"
                     :filterIncludedFields="filterOn">
                <template v-slot:cell(task_percentage)="data">
                    <span class="text-monospace">{{ data.value.toFixed(2) }}%</span>
                </template>
            </b-table>
        </div>
    </section>
</template>

<script>
import master_json from "../data/masters";

export default {
	name: "TableSection",
	props: {
		configData: Object,
	},
	data() {
		return {
			mastersData: master_json,
		    currentMaster: null,
			monstersData: null,
			total_weight: 0,
			sortDirection: 'desc',
			sortDesc: true,
			sortBy: 'task_percentage',
			filter: null,
			filterOn: [],
			fields: [
				{
					key: 'id',
					label: 'Monster ID',
					sortable: true,
					class: 'd-none',
				},
				{
					key: 'monster',
					label: 'Monster name',
					sortable: true,
				},
				{
					key: 'combat_req',
					label: 'Combat Requirement',
					sortable: true,
					class: 'd-none',
				},
				{
					key: 'slayer_req',
					label: 'Slayer Requirement',
					sortable: true,
					class: 'd-none',
				},
				{
					key: 'defence_req',
					label: 'Defence Requirement',
					sortable: true,
					class: 'd-none',
				},
				{
					key: 'defence_req',
					label: 'Defence Requirement',
					sortable: true,
					class: 'd-none',
				},
				{
					key: 'task_percentage',
					label: 'Task chance',
					sortable: true,
				},
			],
			filtered_items: [],
		}
	},
	methods: {
		reload() {
			//set current Slayer Master
		    this.currentMaster = this.mastersData[this.$route.params.id];
		    this.monstersData = this.currentMaster.assignments;

		    //filter the list of Monsters and calculate task chances
		    this.filterData();
			this.generateTaskWeights();
		},
	    filterData() {
			this.filtered_items = this.monstersData;
			let removeIds = [];

			//filter based on Stats
			this.configData.statUnlocks.forEach(stat=>{
				//for each stat requirement, remove those from list where the current stat value is greater or equal to the monsters requirement value.
				this.filtered_items = _.filter(this.filtered_items, function(monster){ return (parseInt(stat.value.current) >= parseInt(monster[stat.filter])) || stat.ignore === 'true' } );
			});

			//filter based on Point Unlocks
			this.configData.pointUnlocks.forEach(reward=>{
	            if ((reward.unlock === 'true' && reward.block) || (reward.unlock === 'false' && !reward.block)) {
					//if reward unlocked but blocks monsters OR reward not unlocked and doesnt block
					//then, add to removal
					removeIds = removeIds.concat(reward.monster_ids)
				}
			});

			//filter based on Block List
			removeIds = removeIds.concat(this.configData.blockList.map(item => item.monster_ids));

			//filter based on Quest unlocks
			removeIds = removeIds.concat(this.configData.questUnlocks.filter(quest => quest.unlock === 'false').flatMap(item => item.monster_ids));

			//handle removal list
			this.filtered_items = _.filter(this.filtered_items, function(monster){ return !removeIds.includes(parseInt(monster.id)) } );
		},
		generateTaskWeights() {
			//calculate total weight
			this.total_weight = this.filtered_items.reduce(function(prev, cur) {
				return prev + parseInt(cur.taskweight);
			}, 0);

			//add new entry with calculated task change
			this.filtered_items.forEach(item => {
				item.task_percentage = item.taskweight / this.total_weight * 100;
			})
		},
	},
	created() {
		this.reload();
	},
	watch: {
		$route(to, from) {
			this.reload();
		}
	}
}
</script>

<style scoped>

</style>
