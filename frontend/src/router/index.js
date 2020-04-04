import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Players from '../views/Players.vue'
import Games from '../views/Games.vue'
import CreatePlay from '../views/CreatePlay.vue'
import CreatePlayer from '../views/CreatePlayer.vue'
import CreateGame from '../views/CreateGame.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history', // uris without hashes #
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: Home
    },
    {
      path: '/joueurs',
      name: 'Joueurs',
      component: Players
    },
    {
      path: '/jeux',
      name: 'Jeux',
      component: Games
    },
    {
      path: '/creerPartie',
      name: 'Créer une partie',
      component: CreatePlay
    },
    {
      path: '/creerJoueur',
      name: 'Créer un joueur',
      component: CreatePlayer
    },
    {
      path: '/creerJeu',
      name: 'Créer un jeu',
      component: CreateGame
    }
  ]
});

export default router
