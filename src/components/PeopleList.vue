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
            @friend-liked="updateFav"
            @friend-edited="edit"
          ></PersonItem>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex shrink pa-1>
      <v-btn
        id="add-friend"
        color="success"
        large
        :to="{ name: 'AddEditFriend' }"
      >
        Add Friend
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PersonItem from "./PersonItem";

export default {
  components: {
    PersonItem
  },
  methods: {
    updateFav(friend) {
      friend.fav ? this.unlike(friend) : this.like(friend);
    },
    edit(friend) {
      this.$router.push({
        name: "EditFriend",
        params: { friendId: friend.id }
      });
    },
    ...mapActions(["fetchFriends", "like", "unlike"])
  },
  computed: {
    ...mapState(["friends"])
  }
};
</script>

<style scoped></style>
