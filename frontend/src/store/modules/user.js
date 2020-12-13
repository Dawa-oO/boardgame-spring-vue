function initialState() {
    return {
        user: ''
    }
}

export default {
    state: initialState,
    getters: {
        user: state => {
            return state.user;
        }
    },
    mutations: {
        updateUser(state, payload) {
            state.user = payload;
        },
        disconnect(state) {
            // acquire initial state
            const s = initialState()
            Object.keys(s).forEach(key => {
                state[key] = s[key]
            })
        }
    },
    actions: {
        updateUser({ commit }, payload) {
            commit('updateUser', payload);
        },
        disconnect({ commit }) {
            commit('disconnect');
        }
    }
};