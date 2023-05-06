import { createStore } from 'vuex'
import {auth} from "./auth/auth.js";
import appGlobal from "./modules/appGlobal.js";

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    appGlobal
  }
})
