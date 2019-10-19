<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      v-model="selectedFriend.firstName"
      :rules="nameRules"
      label="First name"
      id="firstName"
      required
    ></v-text-field>

    <v-text-field
      v-model="selectedFriend.lastName"
      :rules="nameRules"
      label="Last name"
      id="lastName"
      required
    ></v-text-field>

    <v-checkbox v-model="selectedFriend.fav" label="Fav?" id="fav"></v-checkbox>

    <v-radio-group v-model="selectedFriend.gender" id="gender" row>
      <v-radio label="Male" :value="genders.male"></v-radio>
      <v-radio label="Female" :value="genders.female"></v-radio>
      <v-radio label="Undisclosed" :value="genders.undisclosed"></v-radio>
    </v-radio-group>

    <v-btn color="error" class="ma-2" @click="reset" v-if="!editing">
      Reset Form
    </v-btn>

    <v-btn
      class="ma-2"
      color="success"
      :disabled="!valid"
      id="submit"
      @click="submit"
    >
      Submit
    </v-btn>

    <v-btn class="ma-2" :to="{ name: 'People' }">Cancel</v-btn>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    friendId: {
      type: Number
    }
  },
  data() {
    return {
      valid: false,
      selectedFriend: {
        firstName: "",
        lastName: "",
        gender: "male",
        fav: false
      },
      genders: {
        male: "male",
        female: "female",
        undisclosed: "undisclosed"
      },
      nameRules: [v => !!v || "Name is required"],
      editing: false
    };
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    submit() {
      const submission = {
        ...this.selectedFriend
      };
      if (this.editing) {
        this.updateFriend(submission);
      } else {
        this.addFriend(submission);
      }
      this.$router.push({ name: "People" });
    },
    ...mapActions(["addFriend", "updateFriend"])
  },
  computed: {
    ...mapGetters({
      getFriendById: "friendById"
    })
  },
  async mounted() {
    if (this.friendId) {
      this.editing = true;
      this.selectedFriend = this.getFriendById(this.friendId);
    }
  }
};
</script>

<style></style>
