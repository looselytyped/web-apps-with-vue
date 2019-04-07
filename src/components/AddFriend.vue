<template>
  <v-form ref="form" v-model="valid" id="add-friend-form">
    <v-text-field
      v-model="friend.firstName"
      :rules="nameRules"
      label="First name"
      id="firstName"
      required
    ></v-text-field>

    <v-text-field
      v-model="friend.lastName"
      :rules="nameRules"
      label="Last name"
      id="lastName"
      required
    ></v-text-field>

    <v-checkbox
      v-model="friend.fav"
      label="Fav?"
      id="fav"
      required
    ></v-checkbox>

    <v-radio-group v-model="friend.gender" id="gender" row>
      <v-radio label="Male" :value="genders.male"></v-radio>
      <v-radio label="Female" :value="genders.female"></v-radio>
      <v-radio label="Undisclosed" :value="genders.undisclosed"></v-radio>
    </v-radio-group>

    <v-btn color="error" @click="reset">
      Reset Form
    </v-btn>

    <v-btn color="success" :disabled="!valid" id="submit" @click="submit">
      Submit
    </v-btn>

    <v-btn :to="{ name: 'People' }">Cancel</v-btn>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      valid: true,
      friend: {
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
      nameRules: [v => !!v || "Name is required"]
    };
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    submit() {
      const friend = {
        firstName: this.friend.firstName,
        lastName: this.friend.lastName,
        gender: this.friend.gender,
        fav: this.friend.fav
      };
      axios.post("http://localhost:3000/friends", friend).then(() => {
        this.$router.push({ name: "People" });
      });
    }
  }
};
</script>

<style></style>
