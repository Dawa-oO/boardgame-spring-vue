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
      name: 'Home',
      component: Home
    },
    {
      path: '/players',
      name: 'Players',
      component: Players
    },
    {
      path: '/games',
      name: 'Games',
      component: Games
    },
    {
      path: '/createPlay',
      name: 'CreatePlay',
      component: CreatePlay
    },
    {
      path: '/createPlayer',
      name: 'CreatePlayer',
      component: CreatePlayer
    },
    {
      path: '/createGame',
      name: 'CreateGame',
      component: CreateGame
    }
  ]
});

export default router
