import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store/store";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  async created() {
    await this.$store.dispatch("fetchFriends");
  }
}).$mount("#app");
