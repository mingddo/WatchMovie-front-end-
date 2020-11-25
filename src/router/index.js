import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/accounts/Signup.vue'
import Login from '../views/accounts/Login.vue'
import Profile from '../views/accounts/Profile.vue'
import ReviewList from '../views/community/ReviewList.vue'
import ReviewDetail from '../views/community/ReviewDetail.vue'
import ReviewForm from '../views/community/ReviewForm.vue'
import MovieList from '../views/Movie/MovieList.vue'
import SearchList from '../views/Movie/SearchList.vue'
import Recommend from '../views/Recommendation/Recommend.vue'
import MovieDetail from'../views/Movie/MovieDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/reviewlist',
    name: 'ReviewList',
    component: ReviewList
  },
  {
    path: '/reviewdetail/',
    name: 'ReviewDetail',
    component: ReviewDetail,
    // props: true
  },
  {
    path: '/reviewform',
    name: 'ReviewForm',
    component: ReviewForm
  },
  
  {
    path: '/movielist',
    name: 'MovieList',
    component: MovieList
  },
  {
    path: '/searchlist',
    name: 'SearchList',
    component: SearchList
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend
  },
  {
    path: '/moviedetail',
    name: 'MovieDetail',
    component: MovieDetail
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
