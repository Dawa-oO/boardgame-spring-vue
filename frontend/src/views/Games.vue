<template>
  <div class="games">
    <!--------------------->
    <!------- Loader ------>
    <!--------------------->
    <div v-if="loading" class="text-center">
      <Loader />
    </div>

    <!-------------------------->
    <!------ Search field ------>
    <!-------------------------->
    <div v-else>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="searchQuery" label="Nom..." />
        </v-col>
        <v-col cols="12" md="4">
          <v-btn elevation="3" @click="clear" color="primary"
            >Réinitialiser</v-btn
          >
        </v-col>
      </v-row>

      <!------------------->
      <!------- Jeux ------>
      <!------------------->
      <div v-if="filteredList == null">
        <v-row>
          <v-col v-for="game in games" :key="game.id" sm="4">
            <GameItem v-bind:game="game" />
          </v-col>
        </v-row>
      </div>
      <!-- Aucun résultat trouvé lors de la recherche -->
      <div v-else-if="filteredList.length == 0">
        <h2>Désolé</h2>
        <p>Aucun résultat trouvé..</p>
      </div>
      <!-- Des résultats ont été trouvés lors de la recherche -->
      <div v-else>
        <h1>
          {{ filteredList.length }} résultat<span v-if="filteredList.length > 1"
            >s</span
          >
        </h1>
        <v-row>
          <v-col v-for="game in filteredList" :key="game.id" sm="4">
            <GameItem v-bind:game="game" />
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader";
import GameItem from "@/components/GameItem";

export default {
  name: "Games",
  components: {
    GameItem,
    Loader,
  },
  data() {
    return {
      loading: false,
      searchQuery: "",
      games: [],
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      this.loading = true;
      // Get all games
      this.axios
        .get(this.$backUrl + "/games")
        .then((res) => {
          this.loading = false;
          this.games = res.data;
        })
        .catch((err) => console.log(err));
    },
    clear() {
      this.searchQuery = "";
    },
  },
  computed: {
    filteredList() {
      if (this.searchQuery) {
        return this.games.filter(
          (game) =>
            game.name.toUpperCase().indexOf(this.searchQuery.toUpperCase()) !==
            -1
        );
      } else {
        return null;
      }
    },
  },
};
</script>

<style scoped>
</style>

