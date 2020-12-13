<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <h2>Ajouter une partie</h2>
    <v-select
      v-model="game"
      item-text="name"
      item-value="id"
      :items="games"
      :rules="[(v) => !!v || 'Jeu obligatoire']"
      label="Jeux"
      required
    ></v-select>

    <v-select
      v-model="winner"
      item-text="pseudo"
      item-value="id"
      :items="players"
      :rules="[(v) => !!v || 'Vainqueur obligatoire']"
      label="Vainqueur"
      required
    ></v-select>

    <v-text-field
      v-model="score"
      :rules="[(v) => !!v || 'Score obligatoire']"
      label="Score maximal"
      required
    ></v-text-field>

    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="date"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="Date"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" no-title scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
        <v-btn text color="primary" @click="$refs.menu.save(date)"> OK </v-btn>
      </v-date-picker>
    </v-menu>

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
  name: "CreatePlay",
  data() {
    return {
      valid: true,
      menu: false,
      games: [],
      players: [],
      game: "",
      winner: "",
      score: "",
      date: new Date().toISOString().substr(0, 10),
    };
  },
  created() {
    this.axios
      .get(this.$backUrl + "/games")
      .then((res) => {
        this.games = res.data;
      })
      .catch((err) => console.log(err));
    this.axios
      .get(this.$backUrl + "/players")
      .then((res) => {
        this.players = res.data;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      this.addPlay();
    },
    addPlay() {
      const play = {
        game: {
          id: this.game,
        },
        gameDate: this.date,
        player: {
          id: this.winner,
        },
        score: this.score,
      };
      this.axios
        .post(this.$backUrl + "/plays", play, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          this.game = "";
          this.date = "";
          this.winner = "";
          this.score = "";
          Vue.$toast.open({
            message: "Partie créée",
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