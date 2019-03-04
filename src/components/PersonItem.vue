<template>
  <div>
    <v-list-tile :key="friend.id" avatar ripple @click="like(friend)">
      <v-list-tile-content>
        <v-list-tile-title v-text="fullName"></v-list-tile-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <v-icon :color="friend.fav ? 'red' : 'grey'">favorite</v-icon>
      </v-list-tile-action>
    </v-list-tile>
    <v-divider v-if="last"></v-divider>
  </div>
</template>

<script>
export default {
  props: ["friend", "last"],
  methods: {
    like(friend) {
      friend.fav = !friend.fav;
    }
  },
  computed: {
    fullName() {
      return `${this.friend.firstName} ${this.friend.lastName}`;
    }
  }
};
</script>

<style></style>
