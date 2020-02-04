import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import ConfigSection from "./components/ConfigSection";
import TableSection from "./components/TableSection";

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
	{ path: '/', name: 'config', component: ConfigSection },
	{ path: '/master/:id', name: 'master', component: TableSection },
	{ path: '**', redirect: {name: 'config'}},
];

const router = new VueRouter({
	mode: 'hash',
	routes
});

new Vue({
	router,
	render: h => h(App),
}).$mount('#app');
