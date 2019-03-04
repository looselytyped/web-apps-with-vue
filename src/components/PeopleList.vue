<template>
  <v-container fluid>
    <v-layout row>
      <v-flex grow pa-1>
        <v-card>
          <v-list header>
            <template v-for="(friend, index) in friends">
              <v-list-tile :key="friend.id" avatar ripple @click="like(friend)">
                <v-list-tile-content>
                  <v-list-tile-title
                    >{{ friend.firstName }}
                    {{ friend.lastName }}</v-list-tile-title
                  >
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-icon :color="friend.fav ? 'red' : 'grey'">favorite</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <!-- eslint-disable-next-line vue/valid-v-for -->
              <v-divider v-if="index + 1 < friends.length"></v-divider>
            </template>
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
