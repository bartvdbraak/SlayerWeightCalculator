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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    This week
                </button>
            </div>
        </div>
        <div class="table-responsive">
            <b-table striped hover :items="monstersData" :fields="fields"></b-table>
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
					key: 'monster',
					label: 'Monster name',
					sortable: true,
				},
			],
			filters: {
				combat_level: 49,
				slayer_level: 75,
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
			// this.filtered_items = this.items.filter(item => item.last_name.includes('Carney'));
			this.filtered_items = this.monstersData.filter(item => item.combat_req < this.filters.combat_level);

		},
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
