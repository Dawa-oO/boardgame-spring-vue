<template>
    <div class="cardPlayer">
        <img :src="image_url" class="card-img-top image" alt="...">
        <div>
            <h5>{{player.pseudo}}</h5>
            <h6>{{player.firstName}}</h6>
            <h6>Parties gagnées : {{nbPlaysWin}}</h6>
        </div>
    </div>
</template>


<script>
    import axios from 'axios';
    export default {
        name: 'CardPlayer',
        props: ["player"],
        data() {
            return {
                image_url: `http://localhost:1991/images/players/${this.player.id}.jpg`,
                nbPlaysWin: 0
            }
        },
        created() {
            axios.get(`http://localhost:1991/plays/total/players/${this.player.id}`)
                .then(res => {
                    this.nbPlaysWin = res.data;
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