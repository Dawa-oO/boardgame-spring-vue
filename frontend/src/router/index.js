import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Players from '../views/Players.vue'
import Games from '../views/Games.vue'
import CreatePlay from '../views/CreatePlay.vue'
import CreatePlayer from '../views/CreatePlayer.vue'
import CreateGame from '../views/CreateGame.vue'
import Login from '@/views/Login.vue'
import store from '@/store/index';

Vue.use(VueRouter)
const routes = [
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
    component: CreatePlay,
    meta: { needAuth: true }/* needAuth est un nom arbitraire */
  },
  {
    path: '/createPlayer',
    name: 'CreatePlayer',
    component: CreatePlayer,
    meta: { needAuth: true }/* needAuth est un nom arbitraire */
  },
  {
    path: '/createGame',
    name: 'CreateGame',
    component: CreateGame,
    meta: { needAuth: true }/* needAuth est un nom arbitraire */
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const userInStore = store.state.user.user;
  const isAuthenticated = userInStore !== '' ? true : false;
  const isProtected = to.matched.some(route => route.meta.needAuth);
  if (!isAuthenticated && isProtected) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router
