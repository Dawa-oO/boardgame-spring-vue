<template>
    <div class="createPlayer">
        <h2>Ajouter un joueur</h2>
        <form @submit="checkForm">
            <p class="red" v-if="errors.length">
                <b>Erreur(s) dans le formulaire :</b>
                <ul>
                    <li v-bind:key="error" v-for="error in errors">{{ error }}</li>
                </ul>
            </p>
            <div class="form-group">
                <label for="image">Avatar</label>
                <input type="file" class="form-control-file" id="image" name="image" ref="image" required>
            </div>
            <div class="form-group">
                <label for="pseudo">Pseudo</label>
                <input type="text" class="form-control" id="pseudo" v-model="pseudo" name="pseudo" required>
            </div>
            <div class="form-group">
                <label for="firstName">Prénom</label>
                <input type="text" class="form-control" id="firstName" v-model="firstName" name="firstName" required>
            </div>
            <button type="submit" class="btn btn-primary">Créer</button>
        </form>
    </div>
</template>

<script>

    import Vue from 'vue';
    import VueToast from 'vue-toast-notification';
    import 'vue-toast-notification/dist/theme-default.css';

    Vue.use(VueToast);

    import axios from 'axios';

    export default {
        name: 'CreatePlayer',
        data() {
            return {
                errors: [],
                image: "",
                pseudo: "",
                firstName: ""
            }
        },
        methods: {
            checkForm: function (e) {
                if (this.$refs.image.files[0] && this.pseudo && this.firstName) {
                    this.addPlayer();
                }
                this.errors = [];

                if (!this.$refs.image.files[0]) {
                    this.errors.push('Avatar requis.');
                }
                if (!this.pseudo) {
                    this.errors.push('Pseudo requis.');
                }
                if (!this.firstName) {
                    this.errors.push('Prénom requis.');
                }

                e.preventDefault();
            },
            addPlayer() {
                const player = {"firstName": this.firstName, "pseudo": this.pseudo};

                let formData = new FormData();
                formData.append('file', this.$refs.image.files[0]);
                formData.append('player', JSON.stringify(player));

                axios.post( 'http://localhost:1991/players', formData)
                    .then(() => {
                        this.image="";
                        this.pseudo = "";
                        this.firstName = "";
                        Vue.$toast.open({
                            message: 'Joueur créé',
                            type: 'success'
                        });
                    })
                    .catch(() => {
                        Vue.$toast.open({
                            message: 'Erreur lors de la création',
                            type: 'error'
                        });
                    });
            }
        }
    }

</script>

<style scoped>
    .createPlayer {
        max-width: 40%;
        margin-top: 2%;
        margin-left: auto;
        margin-right: auto;
        text-align: left;
    }
    button {
        float: right;
    }
    label {
        font-weight: bold;
    }
    .red {
        color: red;
    }
</style>