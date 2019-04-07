<template>
  <!-- Blatantly stolen from https://vuetifyjs.com/en/examples/layouts/sandbox -->
  <v-app id="sandbox">
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :permanent="primaryDrawer.type === 'permanent'"
      :temporary="primaryDrawer.type === 'temporary'"
      absolute
      overflow
      app
    >
      <div class="pa-3 text-xs-center teal white--text">
        <div class="display-2 py-4">
          Friends HQ
        </div>
        <p>Together, we are stronger</p>
      </div>
      <v-spacer></v-spacer>
      <v-list dense>
        <template v-for="(item, i) in items">
          <v-divider dark v-if="item.divider" class="my-3" :key="i"></v-divider>
          <v-list-tile
            :key="i"
            v-else
            :to="{ name: item.routeName }"
            :id="item.text.toLowerCase()"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app absolute>
      <v-toolbar-side-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      ></v-toolbar-side-icon>
    </v-toolbar>
    <v-content>
      <router-view />
    </v-content>
    <v-footer :inset="true" app>
      <span class="px-3">
        &copy; Looselytyped {{ new Date().getFullYear() }}
      </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    primaryDrawer: {
      model: null,
      type: "default (no property)"
    },
    items: [
      { icon: "dashboard", text: "Dashboard", routeName: "Dashboard" },
      { icon: "contacts", text: "Contacts", routeName: "People" },
      { divider: true },
      { icon: "notes", text: "Journal" }
    ]
  })
};
</script>
