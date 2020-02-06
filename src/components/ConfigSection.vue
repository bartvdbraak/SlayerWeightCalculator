<template>
    <section>
        <div class="pt-3 pb-2 my-2 px-4">
            <b-row>
                <b-col>
                    <h1 class="h3 text-uppercase font-weight-bolder mb-4">Account Settings</h1>
                </b-col>
                <b-col class="flex-column">
                    <b-button-toolbar aria-label="Toolbar with button groups and input groups">
                        <b-button-group size="sm" class="mr-1">
                            <b-button @click="flipRemember"
                                    :pressed="remember"
                                    size="sm">
                                <svg v-if="remember" xmlns="http://www.w3.org/2000/svg" width=".8em" height=".8em" class="mr-1" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" width=".8em" height=".8em" class="mr-1" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>
                                Remember
                            </b-button>
                            <b-button @click="serveConfig"><a ref="config-export" download="config.json"></a>Export</b-button>
                        </b-button-group>
                        <b-form-file class="w-auto"
                                v-model="configFile"
                                placeholder="Load settings.json"
                                accept=".json">
                        </b-form-file>
                    </b-button-toolbar>
                </b-col>
            </b-row>
            <b-row class="shadow py-3 mb-5">
                <b-col sm="12" ><h4>Stats</h4></b-col>
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
            <b-row class="shadow py-3 mb-5">
                <b-col>
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
            <b-row class="shadow py-3">
                <b-col sm="12" ><h4>Quests Unlocks</h4>
                    <b-form-checkbox
                            @change="checkAll($event)"
                            class="mb-1">
                        <small class="text-monospace text-muted text-primary" >
                            Unlocked all
                        </small>
                    </b-form-checkbox>

                </b-col>
                <b-col md="6" xl="4" v-for="questUnlock in configData.questUnlocks" v-bind:key="questUnlock.id">
                    <b-form-checkbox
                            class="mb-1"
                            v-model="questUnlock.unlock"
                            :name="questUnlock.name"
                            value="true"
                            unchecked-value="false">
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
			configFile: null,
			remember: null,
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
		serveConfig() {
			let data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.configData));
			let node = this.$refs['config-export'];
			node.setAttribute("href", data);
			node.click();
		},
		flipRemember() {
			localStorage.setItem('remember', (!(localStorage.getItem('remember') === 'true')).toString());
			this.setRemember();
		},
		setRemember() {
			if (localStorage.getItem('remember') === null) {
				localStorage.setItem('remember', 'true');
			}
			this.remember = (localStorage.getItem('remember') === 'true');
		},
		readFile(file){
			return new Promise((resolve, reject) => {
				let fr = new FileReader();
				fr.onload = () => {
					this.$emit('update:configData', JSON.parse(fr.result));
				};
				fr.readAsText(file);
			});
		},
		checkAll(value) {
			let data = this.configData;
			data.questUnlocks.forEach(quest=>{
				quest.unlock = value;
			});
		}
	},
	created() {
		this.setRemember()
	},
	watch: {
		configFile() {
			if (window.File && window.FileReader && window.FileList && window.Blob) {
				this.readFile(this.configFile);
			} else {
				alert('The File APIs are not fully supported in this browser.');
			}
		}
	}

}
</script>

<style scoped>

</style>
