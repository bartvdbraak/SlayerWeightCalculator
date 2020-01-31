<template>
    <section>
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 my-2">
            <h1 class="h3 text-uppercase">{{currentMaster.name}}</h1>
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
            <b-table striped hover :items="filtered_items" :fields="fields"></b-table>
        </div>
    </section>
</template>

<script>
import master_json from "../data/masters";

export default {
	name: "TableSection",
	data() {
		return {
			mastersData: master_json,
		    currentMaster: null,
			fields: [
				{
					key: 'last_name',
					sortable: true
				},
				{
					key: 'first_name',
					sortable: true
				},
			],
		    total_weight: 100,
			items: [
				{ age_requirement: 40, first_name: 'Dickerson', last_name: 'Macdonald', combat_requirement: 10 },
				{ age_requirement: 21, first_name: 'Larsen', last_name: 'Shaw', combat_requirement: 0 },
				{ age_requirement: 89, first_name: 'Geneva', last_name: 'Wilson', combat_requirement: 50 },
				{ age_requirement: 38, first_name: 'Jami', last_name: 'Carney', combat_requirement: 0 }
			],
			filters: {
				age: 35,
				combat_level: 49,
			},
			filtered_items: [],
		}
	},
	methods: {
		reload() {
		    this.currentMaster = this.getMasterById(this.mastersData.masters,this.$route.params.id);

		    this.filterData();
		},
	    filterData() {
			// this.filtered_items = this.items.filter(item => item.last_name.includes('Carney'));

			this.filtered_items = this.items.filter(item => item.combat_requirement < this.filters.combat_level);

		},
		getMasterById(jsonObject, id) {
			return jsonObject.filter(item => item.id === id)[0];
		},
	},
	created() {
		console.log(this.currentMaster)
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
