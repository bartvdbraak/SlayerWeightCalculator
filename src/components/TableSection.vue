<template>
    <section>
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 my-2">
            <h1 class="h3 text-uppercase font-weight-bolder"><span v-if="currentMaster">{{currentMaster.name}}</span></h1>
            <div class="btn-toolbar mb-2 mb-md-0">
                <div class="btn-group mr-2">
                    <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
                </div>
                <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
                    <svg height="20" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m184.296875 512c-4.199219 0-8.277344-1.644531-11.304687-4.691406-3.925782-3.925782-5.527344-9.582032-4.265626-14.976563l23.253907-98.667969c.679687-2.902343 2.152343-5.546874 4.265625-7.636718l203.648437-203.648438c18.109375-18.132812 49.75-18.15625 67.882813 0l30.164062 30.164063c9.066406 9.046875 14.058594 21.121093 14.058594 33.921875 0 12.820312-4.992188 24.894531-14.058594 33.941406l-203.648437 203.625c-2.113281 2.113281-4.757813 3.585938-7.636719 4.265625l-98.667969 23.253906c-1.234375.320313-2.472656.449219-3.691406.449219zm37.78125-106.582031-16.277344 69.078125 69.078125-16.277344 200.429688-200.425781c3.027344-3.03125 4.691406-7.039063 4.691406-11.308594 0-4.265625-1.664062-8.296875-4.691406-11.304687l-30.167969-30.167969c-6.25-6.226563-16.382813-6.25-22.632813 0zm60.910156 67.328125h.210938zm0 0"/><path d="m433.835938 337.898438c-4.097657 0-8.191407-1.558594-11.308594-4.691407l-75.433594-75.4375c-6.25-6.25-6.25-16.382812 0-22.632812s16.382812-6.25 22.632812 0l75.4375 75.433593c6.25 6.25 6.25 16.382813 0 22.636719-3.136718 3.132813-7.234374 4.691407-11.328124 4.691407zm0 0"/><path d="m145.921875 448h-97.921875c-26.476562 0-48-21.523438-48-48v-352c0-26.476562 21.523438-48 48-48h309.332031c26.476563 0 48 21.523438 48 48v98.773438c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-98.773438c0-8.832031-7.167969-16-16-16h-309.332031c-8.832031 0-16 7.167969-16 16v352c0 8.832031 7.167969 16 16 16h97.921875c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/><path d="m389.332031 138.667969h-373.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h373.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/><path d="m310.828125 245.332031h-294.828125c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h294.828125c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/><path d="m202.667969 352h-186.667969c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h186.667969c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/><path d="m202.667969 352c-8.832031 0-16-7.167969-16-16v-213.332031c0-8.832031 7.167969-16 16-16s16 7.167969 16 16v213.332031c0 8.832031-7.167969 16-16 16zm0 0"/></svg>                    Edit columns
                </button>
            </div>
        </div>
        <div class="table-responsive">
            <b-table striped hover
                     :items="filtered_items"
                     :fields="fields"
                     :sort-by.sync="sortBy"
                     :sort-desc.sync="sortDesc"
                     :sort-direction="sortDirection">
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
				this.filtered_items = _.filter(this.filtered_items, function(monster){ return parseInt(stat.value.current) >= parseInt(monster[stat.filter]) } );
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
