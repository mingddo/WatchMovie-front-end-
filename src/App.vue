<template>
  <div id="app">

      <div class="homelogo">
        <img @click="gotoHome" src="@/assets/logo.png" alt="">
      </div>
      <span v-show="login">
        <div @click="gotoMovielist" class="nav-movie">Movie</div>
        <div @click="gotoReview" class="nav-review">Review</div>
        <div @click="logout" class="nav-logout">Logout</div>
        <div @click="gotoProfile" class="profile-logo">
          <img class="profile-logo-img" src="@/assets/user-1.png" alt="">
        </div>
        <div class="searchbar">
          <div class="input-group w-60" v-show="canIseen">
            <input
              type="text"
              class="form-control"       
              aria-label="Dollar amount (with dot and two decimal places)"
              placeholder="영화명 검색"
              v-model.trim="inputMovie"
              @keypress.enter="OnClick"
            />
            <div class="input-group-append" @click="OnClick">
              <button class="input-group-text">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-search"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
            <div v-show="canIseen === false" class="input-group-append" @click="CanSee" >
              <button class="input-group-text">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-search"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                  />
                </svg>
              </button>
            </div>
        </div>
      </span>

      <div id="nav">
      <div class="wallpaper animate__animated animate__fadeIn" :style="{'background': 'linear-gradient( to bottom, rgba(0, 0, 0, 0), #141414), url(' +require(`@/assets/${radomNum}.jpg`) + ')'}">
      
      </div>

      <Home class="none-visible" :user="user"/>

 
    </div>
    <router-view @login="setLogin" :user="user" :key="$route.fullPath"/>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import _ from 'lodash'
import axios from 'axios'
import Home from './views/Home.vue';
export default {
  components: { Home },
  data() {
    return {
      radomNum : '',
      user: "",
      login: false,
      inputMovie: '',
      searchMovie: [],
      canIseen: false,
    };
  },
  methods: {
    randomNumber(){
    this.radomNum = _.random(1,22)
    console.log(this.radomNum)
    },
    CanSee () {
      this.canIseen = true
      console.log("이제 보여", this.canIseen)
    },
    OnClick() {
      const keyword = this.inputMovie
      axios.get(`http://127.0.0.1:8000/movies/search/${keyword}/`, )
      .then((res) => {
        console.log(res.data)

        this.searchMovie = res.data
        console.log(this.searchMovie)
        this.$router.push({ name: "SearchList", query: { searchMovie: this.searchMovie, inputMovie : this.inputMovie }, });
        this.canIseen = false
        // console.log("이제 안보여", this.canIseen)
      })
      .catch((err) => {
        console.log(err)
      })

      // this.inputMovie=''
      },
    gotoProfile() {
      this.$router.push({ name: "Profile", query:{ userId: this.user.user_id}});
    },
    gotoReview() {
      this.$router.push({ name: "ReviewList"});
    },
    gotoMovielist(){
      this.$router.push({ name: "MovieList"});
    },
    gotoHome(){
       this.$router.push({ name: "Home"});
    },
    getUserName() {
      // console.log(VueJwtDecode.decode(localStorage.getItem('jwt')))
      this.user = VueJwtDecode.decode(localStorage.getItem("jwt"));
    },
    setLogin() {
      this.login = true;
      this.getUserName()

    },
    logout() {
      this.login = false;
      localStorage.removeItem("jwt");
      this.$router.push({ name: "Home"});
    },
  },
  watch:{
    $route(){
      this.randomNumber()
    }
  },
  // updated(){
  //     this.randomNumber()
  // },
  created() {
    this.randomNumber()
    if (localStorage.getItem("jwt")) {
      this.login = true;
      this.getUserName();
    }
  },
};
</script>

<style>
.animate__animated.animate__fadeIn {
  --animate-duration: 3s;
}
.none-visible{
  display: none;
}
.searchbar{
  position: absolute;
  z-index: 99;
  widows: 60%;
  height: auto;
  left: 650px;
  top: 108px;
}
.nav-logout{
  position: absolute;
  left: 503px;
  top: 97px;
  height:  0em;
  z-index: 90;
  font-size: 2.1rem;
  margin: 0;
  padding: 0;
  cursor: pointer;
  color:#8504ee;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 700;
}
.nav-movie{
  position: absolute;
  left: 265px;
  top: 98px;
  height:  0em;
  z-index: 90;
  font-size: 2.1rem;
  margin: 0;
  padding: 0;
  cursor: pointer;
  color: rgb(255, 0, 221);
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 700;
}
.nav-review{
  position: absolute;
  top: 98px;
  left: 380px;
  height:  0em;
  z-index: 90;
  font-size: 2rem;
  margin: 0;
  padding: 0;
  cursor: pointer;
  font-family: 'Nanum Gothic', sans-serif;
  color: rgb(255, 0, 221);
  font-weight: 700;
}

.homelogo{
  position: relative;
  /* top: 1rem; */
  z-index: 99;
  width: 0.4rem;
  height: 0rem;
  margin: 0 3rem;
  cursor: pointer;
}
.profile-logo{
  position: absolute;
  top: 70px;
  right: 100px;
  z-index: 99;
  width: 4%;
  height: auto;
  cursor: pointer;
}
.profile-logo-img{
  border-radius: 100px;
  width: 100%;
  height: auto;
}
.wallpaper{
  width: 100%;
  height: 40rem;
  background-repeat: no-repeat !important ;
  background-size: cover !important;
  z-index: 2;
}
.profile-icon {
  width: 50px;
  height: auto;
  cursor: pointer;
}

#seen {
  display: block;
  transition-delay: 0.5s
}
html{
  background-color: #141414;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: #141414;
  display: flex;
  flex-direction: column;
  justify-content: center;


}

#nav {
  padding: 0;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;

}
</style>
