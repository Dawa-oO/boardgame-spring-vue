<template>
  <v-card class="mx-auto card-outter" max-width="400" max-height="400px">
    <v-img
      class="white--text align-end"
      height="200"
      :src="image_url"
      contain
    />

    <v-card-title>{{ game.name }}</v-card-title>

    <v-card-text class="text--primary">
      <div>Joueurs : {{ game.minNbPlayers }} à {{ game.maxNbPlayers }}</div>
      <div>Durée : {{ game.averageTimePlayed }} minutes</div>
      <div>Meilleur score : {{ topScore }}</div>
      <div>Parties jouées : {{ nbPlaysPlayed }}</div>
      <div v-if="topPlayer.pseudo">
        Top joueur : {{ topPlayer.pseudo }} ({{ topPlayer.nbVictory }}
        victoires)
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "GameItem",
  props: {
    game: {
      type: Object,
    },
  },
  data() {
    return {
      image_url: this.$backUrl + `/images/games/${this.game.id}.jpg`,
      nbPlaysPlayed: 0,
      topPlayer: { pseudo: "", nbVictory: 0 },
      topScore: 0,
    };
  },
  created() {
    // Get total nb plays played for this game
    this.axios
      .get(this.$backUrl + `/plays/total/${this.game.id}`)
      .then((res) => {
        this.nbPlaysPlayed = res.data;
      })
      .catch((err) => console.log(err));
    // Get top player for this game
    this.axios
      .get(this.$backUrl + `/plays/topPlayer/${this.game.id}`)
      .then((res) => {
        this.topPlayer.nbVictory = res.data.nbVictory;
        if (res.data.winnerId) {
          this.axios
            .get(this.$backUrl + `/players/${res.data.winnerId}`)
            .then((res2) => {
              this.topPlayer.pseudo = res2.data.pseudo;
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
    // Get top score for this game
    this.axios
      .get(this.$backUrl + `/plays/topScore/${this.game.id}`)
      .then((res) => {
        this.topScore = res.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss" scoped>
</style>