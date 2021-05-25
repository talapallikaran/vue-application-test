import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";

Vue.use(Vuex);
let store: any;
try {
  store = new Vuex.Store({
    modules: {
      ...modules,
    },
  });
} catch (e) {
  console.log("e", e);
}

export { store };
