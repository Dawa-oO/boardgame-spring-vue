<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <h2>Ajouter un jeu</h2>

    <v-file-input
      accept="image/jpeg"
      label="Image du jeu"
      prepend-icon="mdi-camera"
      v-model="image"
      required
    ></v-file-input>

    <v-text-field
      v-model="name"
      :rules="[(v) => !!v || 'Nom obligatoire']"
      label="Nom"
      required
    ></v-text-field>

    <v-text-field
      v-model="minNbPlayers"
      :rules="[(v) => !!v || 'Nombre minimum de joueurs obligatoire']"
      label="Nombre minimum de joueurs"
      type="number"
      required
    ></v-text-field>

    <v-text-field
      v-model="maxNbPlayers"
      :rules="[(v) => !!v || 'Nombre maximum de joueurs obligatoire']"
      label="Nombre maximum de joueurs"
      type="number"
      required
    ></v-text-field>

    <v-text-field
      v-model="averageTimePlayed"
      :rules="[(v) => !!v || 'Durée moyenne obligatoire']"
      label="Durée moyenne d'une partie"
      type="number"
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
  name: "CreateGame",
  data() {
    return {
      valid: true,
      image: null,
      name: "",
      minNbPlayers: 0,
      maxNbPlayers: 0,
      averageTimePlayed: 0,
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      this.addGame();
    },
    addGame() {
      const game = {
        averageTimePlayed: this.averageTimePlayed,
        maxNbPlayers: this.maxNbPlayers,
        minNbPlayers: this.minNbPlayers,
        name: this.name,
      };

      let formData = new FormData();
      formData.append("file", this.image);
      formData.append("game", JSON.stringify(game));

      this.axios
        .post(this.$backUrl + "/games", formData)
        .then(() => {
          this.image = "";
          this.averageTimePlayed = 0;
          this.maxNbPlayers = 0;
          this.minNbPlayers = 0;
          this.name = "";
          Vue.$toast.open({
            message: "Jeu créé",
            type: "success",
          });
          this.$refs.form.reset();
        })
        .catch((err) => {
          Vue.$toast.open({
            message: "Erreur lors de la création : " + err,
            type: "error",
          });
        });
    },
  },
};
</script>

<style scoped>
</style>