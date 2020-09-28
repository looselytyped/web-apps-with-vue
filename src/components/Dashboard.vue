<template>
  <v-container grid-list-xl fluid id="dashboard-container">
    <v-layout row wrap>
      <v-flex lg3 sm6 xs12>
        <v-card id="friends">
          <v-card-text class="pa-0">
            <v-container class="pa-0">
              <div class="layout row ma-0">
                <div class="sm6 xs6 flex">
                  <div class="layout column ma-0 justify-center align-center">
                    <v-icon color="indigo" size="56px">mdi-contacts</v-icon>
                  </div>
                </div>
                <div class="sm6 xs6 flex text-sm-center py-3">
                  <div class="headline">Friends</div>
                  <span class="caption">{{ friends.length }}</span>
                </div>
              </div>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <v-card id="favs">
          <v-card-text class="pa-0">
            <v-container class="pa-0">
              <div class="layout row ma-0">
                <div class="sm6 xs6 flex">
                  <div class="layout column ma-0 justify-center align-center">
                    <v-icon color="pink" size="56px">mdi-heart</v-icon>
                  </div>
                </div>
                <div class="sm6 xs6 flex text-sm-center py-3">
                  <div class="headline">Favs</div>
                  <span class="caption">{{ favCount }}</span>
                </div>
              </div>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => {
    return {
      friends: []
    };
  },
  computed: {
    favCount() {
      return this.friends.filter(f => f.fav).length;
    }
  },
  async mounted() {
    const resp = await axios.get("http://localhost:3000/friends");
    this.friends = resp.data;
  }
};
</script>

<style></style>
