import apiConfigs from "@/configs/api.configs";

export default {
  state: {
    logged: {iud:''},
  },
  mutations: {
    setLogged(state, payload) {
      state.logged = payload;
    },
  },
  actions: {
    setLogged(context, data) {
      context.commit('setLogged', data);
    },
  },
  getters: {
    logged(state) {
      return state.logged
    },
  }
}
