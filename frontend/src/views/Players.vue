<template>
  <div class="players">
    <div v-if="loading" class="loading">
      Loading...
    </div>
    <carousel :per-page="4" :mouse-drag="false" v-if="!loading" :autoplay="true" :loop="true" :autoplayTimeout="3000" >
      <slide v-bind:key="player.id" v-for="player in players">
        <CardPlayer v-bind:player="player" />
      </slide>
    </carousel>
  </div>
</template>

<script>

  import { Carousel, Slide } from 'vue-carousel';
  import CardPlayer from "../components/CardPlayer";
  import axios from "axios";

  export default {
    name: 'Players',
    components: {
      Carousel,
      Slide,
      CardPlayer
    },
    data() {
      return {
        loading: false,
        players : []
      }
    },
    created() {
      this.fetchData();

    },
    watch: {
      // call again the method if the route changes
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        this.loading = true;
        // Get all players
        axios.get('http://localhost:1991/players')
                .then(res => {
                  this.loading = false;
                  this.players = res.data;
                })
                .catch(err => console.log(err));
      }
    }
  }


</script>

<style scoped>

</style>

