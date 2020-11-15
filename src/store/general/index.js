import apiConfigs from "@/configs/api.configs";

export default {
  state: {
    configuration: null,
  },
  mutations: {
    setConfiguration(state, payload) {
      state.configuration = payload;
    },
  },
  actions: {
    setConfiguration({ commit }) {
      fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiConfigs.apiKey}`)
        .then((response) =>
          response.json()
        )
        .then(response => {
          commit('setConfiguration', response);
        }).catch(error => {
          commit('setError', error)
        });
    },
  },
  getters: {
    configuration(state) {
      return state.configuration;
    },
  }
}
