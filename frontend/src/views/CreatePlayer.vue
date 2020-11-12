<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <h2>Ajouter un joueur</h2>

    <v-file-input
      accept="image/jpeg"
      label="Avatar"
      prepend-icon="mdi-camera"
      v-model="image"
      required
    ></v-file-input>

    <v-text-field
      v-model="pseudo"
      :rules="[(v) => !!v || 'Pseudo obligatoire']"
      label="Pseudo"
      required
    ></v-text-field>

    <v-text-field
      v-model="firstName"
      :rules="[(v) => !!v || 'Prénom obligatoire']"
      label="Prénom"
      required
    ></v-text-field>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
      Créer
    </v-btn>
  </v-form>
</template>

<script>
import Vue from "vue";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";

Vue.use(VueToast);

export default {
  name: "CreatePlayer",
  data() {
    return {
      valid: true,
      image: null,
      pseudo: "",
      firstName: "",
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      this.addPlayer();
    },
    addPlayer() {
      const player = { firstName: this.firstName, pseudo: this.pseudo };
      let formData = new FormData();
      formData.append("file", this.image);
      formData.append("player", JSON.stringify(player));

      this.axios
        .post(this.$backUrl + "/players", formData)
        .then(() => {
          this.image = "";
          this.pseudo = "";
          this.firstName = "";
          Vue.$toast.open({
            message: "Joueur créé",
            type: "success",
          });
          this.$refs.form.reset();
        })
        .catch(() => {
          Vue.$toast.open({
            message: "Erreur lors de la création",
            type: "error",
          });
        });
    },
  },
};
</script>

<style scoped>
</style>