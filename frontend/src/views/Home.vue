<template>
  <div class="home">
    <v-row>
      <v-col sm="4">
        <ImageItem v-bind:item="topJeu" />
      </v-col>
      <v-col sm="4">
        <TextItem v-bind:item="totalPlay" />
      </v-col>
      <v-col sm="4">
        <ImageItem v-bind:item="topPlayer" />
      </v-col>
      <v-col sm="4">
        <ImageItem v-bind:item="lastGame1" />
      </v-col>
      <v-col sm="4">
        <ImageItem v-bind:item="lastGame2" />
      </v-col>
      <v-col sm="4">
        <ImageItem v-bind:item="lastGame3" />
      </v-col>
    </v-row>
  </div>
</template>


<script>
import ImageItem from "@/components/ImageItem";
import TextItem from "@/components/TextItem";

export default {
  name: "Home",
  components: {
    ImageItem,
    TextItem,
  },
  data() {
    return {
      topJeu: {
        label: "",
        image_url: "",
      },
      totalPlay: {
        label: "",
        nbVictory: 0,
      },
      topPlayer: {
        label: "",
        image_url: "",
      },
      lastGame1: {
        label: "",
        image_url: "",
      },
      lastGame2: {
        abel: "",
        image_url: "",
      },
      lastGame3: {
        label: "",
        image_url: "",
      },
    };
  },
  created() {
    // Get TOP game
    this.axios
      .get(this.$backUrl + "/games/topGame")
      .then((res) => {
        this.topJeu.label = "Top jeu";
        this.topJeu.image_url =
          this.$backUrl + `/images/games/${res.data.id}.jpg`;
      })
      .catch((err) => console.log(err));
    // Get total game played
    this.axios
      .get(this.$backUrl + "/plays/total")
      .then((res) => {
        this.totalPlay.label = "Total parties jouées";
        this.totalPlay.nbVictoires = res.data;
      })
      .catch((err) => console.log(err));
    // Get TOP player
    this.axios
      .get(this.$backUrl + "/players/topPlayer")
      .then((res) => {
        this.topPlayer.label = "Top joueur";
        this.topPlayer.image_url =
          this.$backUrl + `/images/players/${res.data.id}.jpg`;
      })
      .catch((err) => console.log(err));
    // Get last three played games
    this.axios
      .get(this.$backUrl + "/games/lastThree")
      .then((res) => {
        this.lastGame1.label = "Derniers jeux joués";
        this.lastGame1.image_url =
          this.$backUrl + `/images/games/${res.data[0].id}.jpg`;

        this.lastGame2.label = "Derniers jeux joués";
        this.lastGame2.image_url =
          this.$backUrl + `/images/games/${res.data[1].id}.jpg`;

        this.lastGame3.label = "Derniers jeux joués";
        this.lastGame3.image_url =
          this.$backUrl + `/images/games/${res.data[2].id}.jpg`;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style scoped>
</style>
