<template>
  <v-card class="mx-auto card-outter" max-width="400" max-height="350px">
    <v-img
      class="white--text align-end"
      height="200"
      :src="image_url"
      contain
    />

    <v-card-title>{{ player.pseudo }}</v-card-title>

    <v-card-text class="text--primary">
      <div>{{ player.firstName }}</div>
      <div>Parties gagnées : {{ nbPlaysWin }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "PlayerItem",
  props: ["player"],
  data() {
    return {
      image_url: this.$backUrl + `/images/players/${this.player.id}.jpg`,
      nbPlaysWin: 0,
    };
  },
  created() {
    this.axios
      .get(this.$backUrl + `/plays/total/players/${this.player.id}`)
      .then((res) => {
        this.nbPlaysWin = res.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss" scoped>
</style>