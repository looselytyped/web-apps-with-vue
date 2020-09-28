<template>
  <v-app id="inspire">
    <v-app-bar app clipped-right :color="headerFooterColor" class="white--text">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <div class="pa-3 text-center teal white--text">
        <div class="display-1 py-4">
          Friends HQ
        </div>
        <p>Together, we are stronger</p>
      </div>

      <v-spacer></v-spacer>

      <v-list dense :nav="true">
        <template v-for="(item, i) in items">
          <v-divider dark v-if="item.divider" class="my-3" :key="i"></v-divider>
          <v-list-item
            :key="i"
            v-else
            :to="{ name: item.routeName }"
            :id="item.text.toLowerCase()"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app :color="headerFooterColor" class="white--text" :inset="true">
      <span>Looselytyped &copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    headerFooterColor: "light-green lighten-2",
    drawer: null,
    items: [
      { icon: "mdi-view-dashboard", text: "Dashboard", routeName: "Dashboard" },
      { icon: "mdi-contacts", text: "Contacts", routeName: "People" },
      { divider: true },
      { icon: "mdi-message-bulleted", text: "Journal" }
    ]
  })
};
</script>
