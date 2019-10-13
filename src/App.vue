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
          <v-list-item :key="i" v-else :id="item.text.toLowerCase()">
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

    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs10>
            <v-card>
              <v-card-text>
                <v-layout row wrap>
                  <hello-world></hello-world>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer app :color="headerFooterColor" class="white--text" :inset="true">
      <span>Looselytyped &copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  components: {
    HelloWorld
  },
  data: () => ({
    headerFooterColor: "light-green lighten-2",
    drawer: null,
    items: [
      { icon: "mdi-view-dashboard", text: "Dashboard" },
      { icon: "mdi-contacts", text: "Contacts" },
      { divider: true },
      { icon: "mdi-message-bulleted", text: "Journal" }
    ]
  })
};
</script>
