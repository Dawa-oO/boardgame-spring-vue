<template>
    <div class="games">
        <div v-if="loading" class="loading">
            Loading...
        </div>
        <carousel :per-page="4" :mouse-drag="false" v-if="!loading" :autoplay="true" :loop="true" :autoplayTimeout="3000" >
            <slide v-bind:key="game.id" v-for="game in games">
                <CardGame v-bind:game="game" />
            </slide>
        </carousel>
    </div>
</template>

<script>

    import { Carousel, Slide } from 'vue-carousel';
    import CardGame from "../components/CardGame";
    import axios from "axios";

    export default {
        name: 'Games',
        components: {
            Carousel,
            Slide,
            CardGame
        },
        data() {
            return {
                loading: false,
                games : []
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
                // Get all games
                axios.get('http://localhost:1991/games')
                    .then(res => {
                        this.loading = false;
                        this.games = res.data;
                    })
                    .catch(err => console.log(err));
            }
        }
    }


</script>

<style scoped>

</style>

