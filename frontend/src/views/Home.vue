<template>
  <div class="home">
    <!-- Page Content -->
    <div class="container">
      <!-- 1st row -->
      <div class="row">
        <!-- Card 1x1 -->
        <CardImage v-bind:row="row1" />
        <!-- Card 2x1 -->
        <CardImage v-bind:row="row2" />
        <!-- Card 3x1 -->
        <CardText v-bind:row="row3" />
      </div>

      <!-- 2nd row -->
      <div class="row">
        <!-- Card 1x2 -->
        <CardImage v-bind:row="row4" />
        <!-- Card 2x2 -->
        <CardImage v-bind:row="row5" />
        <!-- Card 2x2 -->
        <CardImage v-bind:row="row6" />
      </div>
    </div>
  </div>
</template>


<script>
  import axios from 'axios';
  import CardImage from "../components/CardImage";
  import CardText from "../components/CardText";

  export default {
    name: 'Home',
    components: {
      CardImage,
      CardText
    },
    data() {
      return {
        row1 : {
          label: "",
          image_url: ""
        },
        row2: {
          label: "",
          image_url: ""
        },
        row3 : {
          label1 : "",
          label2 : 0
        },
        row4: {
          label: "",
          image_url: ""
        },
        row5: {
          abel: "",
          image_url: ""
        },
        row6: {
          label: "",
          image_url: ""
        }
      }
    },
    created() {
      // Get TOP game
      axios.get('http://localhost:1991/games/topGame')
              .then(res => {
                this.row1.label = "Top jeu";
                this.row1.image_url = `http://localhost:1991/images/games/${res.data.id}.jpg`;
              })
              .catch(err => console.log(err));
      // Get TOP player
      axios.get('http://localhost:1991/players/topPlayer')
              .then(res => {
                this.row2.label = "Top joueur";
                this.row2.image_url = `http://localhost:1991/images/players/${res.data.id}.jpg`;
              })
              .catch(err => console.log(err));
      // Get total game played
      axios.get('http://localhost:1991/plays/total')
              .then(res => {
                this.row3.label1 = "Total parties jouées";
                this.row3.label2 = res.data;
              })
              .catch(err => console.log(err));
      // Get last three played games
      axios.get('http://localhost:1991/games/lastThree')
              .then(res => {
                this.row4.label = "Derniers jeux joués";
                this.row4.image_url  = `http://localhost:1991/images/games/${res.data[0].id}.jpg`;

                this.row5.label = "Derniers jeux joués";
                this.row5.image_url  = `http://localhost:1991/images/games/${res.data[1].id}.jpg`;

                this.row6.label = "Derniers jeux joués";
                this.row6.image_url  = `http://localhost:1991/images/games/${res.data[2].id}.jpg`;
              })
              .catch(err => console.log(err));
    }
  }
</script>

<style scoped>
  .home {
    text-align: left;
    margin-top: 1.5%;
  }
</style>
