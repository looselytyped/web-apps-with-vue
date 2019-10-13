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
import PersonItem from "./PersonItem";

const friends = [
  {
    id: 1,
    firstName: "Michelle",
    lastName: "Mulroy",
    gender: "female",
    fav: true
  },
  {
    id: 2,
    firstName: "Venkat",
    lastName: "Subramanian",
    gender: "male",
    fav: true
  },
  {
    id: 3,
    firstName: "Matt",
    lastName: "Forsythe",
    gender: "none",
    fav: false
  },
  {
    id: 4,
    firstName: "Nate",
    lastName: "Schutta",
    gender: "male",
    fav: false
  }
];

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
  }
};
</script>

<style scoped></style>
