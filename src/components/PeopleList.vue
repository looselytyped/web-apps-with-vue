<template>
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
            @friend-edited="edit"
          ></PersonItem>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex shrink pa-1>
      <v-btn color="success" large :to="{ name: 'AddEditFriend' }">
        Add Friend
      </v-btn>
    </v-flex>
  </v-layout>
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
    },
    edit(friend) {
      this.$router.push({
        name: "EditFriend",
        params: { friendId: friend.id }
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
