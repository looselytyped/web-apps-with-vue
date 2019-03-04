<template>
  <v-container fluid>
    <v-layout row>
      <v-flex grow pa-1>
        <v-card>
          <v-list header>
            <template v-for="(friend, index) in friends">
              <v-list-item :key="friend.id">
                <v-list-item-content>
                  <v-list-item-title
                    >{{ friend.firstName }}
                    {{ friend.lastName }}</v-list-item-title
                  >
                </v-list-item-content>

                <v-btn icon>
                  <v-icon class="edit">
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn icon @click.stop="like(friend)">
                  <v-icon class="fav" :color="friend.fav ? 'red' : 'grey'">
                    mdi-heart
                  </v-icon>
                </v-btn>
              </v-list-item>

              <!-- eslint-disable-next-line vue/valid-v-for -->
              <v-divider v-if="index !== friends.length - 1"></v-divider>
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
