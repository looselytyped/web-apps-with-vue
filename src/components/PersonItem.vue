<template>
  <div>
    <v-list-item :key="friend.id">
      <v-list-item-content>
        <v-list-item-title>
          {{ fullName }}
        </v-list-item-title>
      </v-list-item-content>

      <div class="flex-grow-1"></div>

      <v-btn icon>
        <v-icon class="edit">mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon @click.stop="like()">
        <v-icon class="fav" :color="friend.fav ? 'red' : 'grey'">
          mdi-heart
        </v-icon>
      </v-btn>
    </v-list-item>
    <v-divider v-if="!last"></v-divider>
  </div>
</template>

<script>
export default {
  props: {
    friend: {
      type: Object,
      required: true
    },
    last: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    like() {
      // TODO: Do NOT modify props! Fix this
      this.$emit("friend-liked", this.friend);
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
