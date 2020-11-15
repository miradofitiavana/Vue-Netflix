import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Auth from '../mixins/Authentication';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/movies',
    name: 'Movies',
    component: () => import('../views/Movies.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/series',
    name: 'Series',
    component: () => import('../views/Series.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../views/News.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/news/:media_type',
    name: 'NewsMedia',
    component: () => import('../views/News.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/watchlist/:media_type',
    name: 'WatchlistMedia',
    component: () => import('../views/Watchlist.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/coming',
    name: 'Coming',
    component: () => import('../views/Coming.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/details/:media/:id",
    name: "Details",
    component: () => import("../views/Details.vue"),
    meta: {
      requiresAuth: false
    }
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = JSON.parse(localStorage.getItem('user_token')) || { user: { iud: '', username: '' } };
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && currentUser.user.iud == '') next('login');
  else next();
});

export default router
