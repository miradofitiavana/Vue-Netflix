import apiConfigs from "@/configs/api.configs";

export default {
    state: {
        query: ''
    },
    mutations: {
        setQuery(state, payload) {
            state.query = payload;
        },
    },
    actions: {
        setQuery(context, data) {
            context.commit('setQuery', data);
        },
    },
    getters: {
        query(state) {
            return state.query
        },
    }
}
