<template>
  <div class="players">
    <!--------------------->
    <!------- Loader ------>
    <!--------------------->
    <div v-if="loading" class="text-center">
      <Loader />
    </div>
    <div v-else>
      <v-row>
        <v-col v-for="player in players" :key="player.id" sm="4">
          <PlayerItem v-bind:player="player" />
        </v-col>
      </v-row>
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
  },
};
</script>

<style scoped>
</style>

