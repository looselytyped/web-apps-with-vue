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
              :last="index === friends.length - 1"
              @friend-liked="like"
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
import axios from "axios";
import PersonItem from "./PersonItem";

export default {
  components: {
    PersonItem
  },
  data: () => {
    return {
      friends: []
    };
  },
  methods: {
    async like(friend) {
      friend.fav = !friend.fav;
      await axios.patch(`http://localhost:3000/friends/${friend.id}`, {
        fav: friend.fav
      });
    }
  },
  async mounted() {
    const resp = await axios.get("http://localhost:3000/friends");
    this.friends = resp.data;
  }
};
</script>

<style scoped></style>
