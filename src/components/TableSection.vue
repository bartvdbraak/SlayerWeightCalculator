<template>
    <section>
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 my-2">
            <h1 class="h3 text-uppercase"><span v-if="currentMaster">{{currentMaster.name}}</span></h1>
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
            <b-table striped hover :items="filtered_items" :fields="fields"></b-table>
        </div>
    </section>
</template>

<script>
import master_json from "../data/masters";
import monster_json from "../data/monsters";

export default {
	name: "TableSection",
	data() {
		return {
			mastersData: master_json,
		    currentMaster: null,
			monstersData: monster_json,
			total_weight: 0,
			fields: [
				{
					key: 'id',
					label: 'Monster name',
					sortable: true,
					isActive: false,
				},
				{
					key: 'monster',
					label: 'Monster name',
					sortable: true,
					isActive: true,
				},
				{
					key: 'combat_req',
					label: 'Combat Requirement',
					sortable: true,
					isActive: false,
				},
				{
					key: 'slayer_req',
					label: 'Slayer Requirement',
					sortable: true,
					isActive: false,
				},
				{
					key: 'defence_req',
					label: 'Defence Requirement',
					sortable: true,
					isActive: false,
				},
			],
			config: {
				combat_level: 100,
				slayer_level: 75,
				defence_level: 60,
			},
			filters: {
				combat_req: combat_req => combat_req < this.config.combat_level,
				slayer_req: slayer_req => slayer_req < this.config.slayer_level,
				defence_req: defence_req => defence_req < this.config.defence_level,
			},
			filtered_items: [],
		}
	},
	methods: {
		reload() {
		    this.currentMaster = this.mastersData.masters[this.$route.params.id];
		    this.filterData();
		},
	    filterData() {

			//filter based on account
			this.filtered_items = this.filterArray(this.monstersData, this.filters)
		},
		filterArray(array, filters) {
			const filterKeys = Object.keys(filters);
			return array.filter(item => {
				// validates all filter criteria
				return filterKeys.every(key => {
					// ignores non-function predicates
					if (typeof filters[key] !== 'function') return true;
					return filters[key](item[key]);
				});
			});
		}
	},
	mounted() {
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
