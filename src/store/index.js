import { createStore } from "vuex";

export default createStore({
  state: {
    apiUrl: "http://127.0.0.1:8000/api/v1",
    refreshToken: "",
    accessToken: "",
    previousAdvertsBatch: {},
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem("access")) {
        state.accessToken = localStorage.getItem("access");
      } else {
        state.accessToken = "";
      }
    },
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    add(state, advert) {
      state.adverts.push(JSON.parse(JSON.stringify(advert)));
    },
  },
  actions: {},
  modules: {},
  getters: {
    getServerUrl: (state) => {
      return state.apiUrl;
    },
    getAdverts: (state) => {
      return state.previousAdvertsBatch;
    },
  },
});
