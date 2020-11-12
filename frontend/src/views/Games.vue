<template>
  <div class="games">
    <!--------------------->
    <!------- Loader ------>
    <!--------------------->
    <!-- <div v-if="loading" class="text-center">
      <Loader />
    </div>
    <div v-else> -->
    <v-row>
      <v-col v-for="game in games" :key="game.id" sm="4">
        <GameItem v-bind:game="game" />
      </v-col>
    </v-row>
    <!-- </div> -->
  </div>
</template>

<script>
// import Loader from "@/components/Loader";
import GameItem from "@/components/GameItem";

export default {
  name: "Games",
  components: {
    GameItem,
  },
  data() {
    return {
      loading: false,
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
  },
};
</script>

<style scoped>
</style>

