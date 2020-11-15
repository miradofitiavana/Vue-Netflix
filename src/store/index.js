import Vue from "vue";
import Vuex from "vuex";
import general from "./general";
import authenticate from "./authenticate";
import search from "./search";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    general: general,
    authenticate: authenticate,
    search: search,
  }
});
