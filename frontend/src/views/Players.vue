<template>
  <div class="players">
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
          <v-text-field v-model="searchQuery" label="Pseudo ou prénom..." />
        </v-col>
        <v-col cols="12" md="4">
          <v-btn elevation="3" @click="clear" color="primary"
            >Réinitialiser</v-btn
          >
        </v-col>
      </v-row>

      <!---------------------->
      <!------- Joueurs ------>
      <!---------------------->
      <div v-if="filteredList == null">
        <v-row>
          <v-col v-for="player in players" :key="player.id" sm="4">
            <PlayerItem v-bind:player="player" />
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
          <v-col v-for="player in filteredList" :key="player.id" sm="4">
            <PlayerItem v-bind:player="player" />
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader";
import PlayerItem from "@/components/PlayerItem";

export default {
  name: "Players",
  components: {
    Loader,
    PlayerItem,
  },
  data() {
    return {
      loading: false,
      searchQuery: "",
      players: [],
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
      // Get all players
      this.axios
        .get(this.$backUrl + "/players")
        .then((res) => {
          this.loading = false;
          this.players = res.data;
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
        return this.players.filter(
          (player) =>
            player.pseudo
              .toUpperCase()
              .indexOf(this.searchQuery.toUpperCase()) !== -1 ||
            player.firstName
              .toUpperCase()
              .indexOf(this.searchQuery.toUpperCase()) !== -1
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

