import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard";
import PeopleList from "@/components/PeopleList";
import People from "@/views/People";
import AddEditFriend from "@/components/AddEditFriend";

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
      component: People,
      children: [
        {
          path: "",
          name: "People",
          component: PeopleList
        },
        {
          path: "add",
          name: "AddEditFriend",
          component: AddEditFriend
        }
      ]
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
