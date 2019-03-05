import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard";
import PeopleList from "@/components/PeopleList";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard
    },
    {
      path: "/people",
      name: "People",
      component: PeopleList
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
