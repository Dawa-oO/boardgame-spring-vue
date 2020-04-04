<template>
    <div class="cardGame">
        <img :src="image_url" class="card-img-top image" alt="...">
        <div>
            <h5>{{game.name}}</h5>
            <h6>Joueurs : {{game.minNbPlayers}} à {{game.maxNbPlayers}}</h6>
            <h6>Durée : {{game.averageTimePlayed}} minutes</h6>
            <h6>Meilleur score : {{topScore}}</h6>
            <h6>Parties jouées : {{nbPlaysPlayed}}</h6>
            <h6>Top joueur : {{topPlayer.pseudo}} ({{topPlayer.nbVictory}} victoires)</h6>
        </div>
    </div>
</template>


<script>
    import axios from 'axios';
    export default {
        name: 'CardGame',
        props: ["game"],
        data() {
            return {
                image_url: `http://localhost:1991/images/games/${this.game.id}.jpg`,
                nbPlaysPlayed: 0,
                topPlayer: {pseudo:"", nbVictory: 0},
                topScore: 0
            }
        },
        created() {
            // Get total nb plays played for this game
            axios.get(`http://localhost:1991/plays/total/${this.game.id}`)
                .then(res => {
                    this.nbPlaysPlayed = res.data;
                })
                .catch(err => console.log(err));
            // Get top player for this game
            axios.get(`http://localhost:1991/plays/topPlayer/${this.game.id}`)
                .then(res => {
                    this.topPlayer.nbVictory = res.data.nbVictory;
                    axios.get(`http://localhost:1991/players/${res.data.winnerId}`)
                        .then(res2 =>{
                            this.topPlayer.pseudo = res2.data.pseudo;
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            // Get top score for this game
            axios.get(`http://localhost:1991/plays/topScore/${this.game.id}`)
                .then(res => {
                    this.topScore = res.data;
                })
                .catch(err => console.log(err));
        }
    }
</script>

<style scoped>
    .image {
        object-fit: contain !important;
        width: 300px !important;
        height: 300px !important;
        margin: 5% auto 3% !important;
    }
</style>