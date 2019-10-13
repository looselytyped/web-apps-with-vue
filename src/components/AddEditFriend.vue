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

    <v-checkbox
      v-model="selectedFriend.fav"
      label="Fav?"
      id="fav"
      required
    ></v-checkbox>

    <v-radio-group v-model="selectedFriend.gender" id="gender" row>
      <v-radio label="Male" :value="genders.male"></v-radio>
      <v-radio label="Female" :value="genders.female"></v-radio>
      <v-radio label="Undisclosed" :value="genders.undisclosed"></v-radio>
    </v-radio-group>

    <v-btn class="ma-2" color="error" @click="reset">
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
import axios from "axios";

export default {
  data() {
    return {
      valid: true,
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
      nameRules: [v => !!v || "Name is required"]
    };
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    async submit() {
      const submission = {
        ...this.selectedFriend
      };
      await axios.post("http://localhost:3000/friends", submission);
      this.$router.push({ name: "People" });
    }
  }
};
</script>

<style></style>
