import Vue from 'vue';
import Vuex from 'vuex';
import user from '@/store/modules/user'

Vue.use(Vuex);
import createPersistedState from "vuex-persistedstate";

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		user
	},
	plugins: [createPersistedState()]
});