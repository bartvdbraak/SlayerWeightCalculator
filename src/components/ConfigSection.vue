<template>
    <section>
        <div class="pt-3 pb-2 my-2">
            <h1 class="h3 text-uppercase mb-2">Account Settings</h1>
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
                        <span class="mr-2">
                            <span v-if="pointUnlock.masters" v-b-tooltip.hover.right :title="masterListString(pointUnlock)">
                                {{ pointUnlock.name }}
                                <small class="text-monospace text-muted">{{ monsterPreText(pointUnlock) }}</small>
                            </span>
                            <span v-else>
                                {{ pointUnlock.name }}
                                <small class="text-monospace text-muted">{{ monsterPreText(pointUnlock) }}</small>
                            </span>
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
import master_json from '../data/masters'
export default {
	name: "ConfigSection",
	props: {
		configData: Object,
	},
	data() {
	    return {
	    	monsterData: monster_json,
	    	mastersData: master_json,
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
			let masterList = [];
			entry['masters'].forEach( id => {
				masterList.push(this.mastersData[id].name)
			});

			return 'Added to ' + masterList.join(', ').replace(/,(?!.*,)/gmi, ' and');
		},
	},
	beforeRouteLeave (to, from, next) {
		this.$emit('update',this.configData);
		next()
	}

}
</script>

<style scoped>

</style>
