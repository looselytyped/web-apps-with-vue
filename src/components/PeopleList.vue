<template>
  <v-container fluid>
    <v-layout row>
      <v-flex grow pa-1>
        <v-card>
          <v-list header>
            <PersonItem
              v-for="(friend, index) in friends"
              :key="friend.id"
              :friend="friend"
              :last="index + 1 < friends.length"
              @notify-parent="like"
            ></PersonItem>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex shrink pa-1>
        <v-btn color="success" dark large>Add Friend</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PersonItem from "./PersonItem";
import axios from "axios";

const friends = [];

export default {
  components: {
    PersonItem
  },
  data: () => {
    return {
      friends
    };
  },
  methods: {
    like(friend) {
      friend.fav = !friend.fav;
    }
  },
  mounted() {
    axios.get("http://localhost:3000/friends").then(response => {
      this.friends = response.data;
    });
  }
};
</script>

<style scoped></style>
