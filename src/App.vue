<template>
  <div id="app">
    <div id="nav">
      <div v-if="login">
        <span>
          <svg
            @click="gotoProfile"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-people-fill profile-icon"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
            />
          </svg>
        </span>
        <div class="container">
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
        <span>{{ getUserName1 }} 님 안녕하세요</span>
        <router-link to="/">Home</router-link> |
        <router-link to="/reviewlist">ReviewList</router-link> |
        <router-link to="/reviewform">ReviewForm</router-link> |
        <router-link to="/movielist">MovieList</router-link> |
        <router-link to="/recommend">Recommend</router-link> |
        <router-link to="#" @click.native="logout">Logout</router-link>
      </div>
      <div v-else>
        <router-link to="/">Home</router-link> |
        <router-link to="/signup">Signup</router-link> |
        <router-link to="/login">Login</router-link>
      </div>
    </div>
    <router-view @login="setLogin" :user="user"/>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import axios from 'axios'
export default {
  data() {
    return {
      user: "",
      login: false,
      inputMovie: '',
      searchMovie: [],
      canIseen: false,
    };
  },
  methods: {
    CanSee () {
      this.canIseen = true
      // console.log("이제 보여", this.canIseen)
    },
    OnClick() {
      const keyword = this.inputMovie
      axios.get(`http://127.0.0.1:8000/movies/search/${keyword}/`, )
      .then((res) => {
        // console.log(res.data)

        this.searchMovie = res.data
        // console.log(this.searchMovie)
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
    getUserName() {
      console.log("이름 가져오는 것",VueJwtDecode.decode(localStorage.getItem('jwt')))
      this.user = VueJwtDecode.decode(localStorage.getItem("jwt"));
    },
    setLogin() {
      this.login = true;
    },
    logout() {
      this.login = false;
      localStorage.removeItem("jwt");
      this.$router.push("/login");
    },
  },
  computed:{
     getUserName1() {
      console.log("이름 가져오는 것",VueJwtDecode.decode(localStorage.getItem('jwt')))
      return VueJwtDecode.decode(localStorage.getItem("jwt")).username
    },
  },
 
  created() {
    if (localStorage.getItem("jwt")) {
      this.login = true;
      // this.getUserName();

    }
    this.getUserName();
  },

}
</script>

<style>
.profile-icon {
  width: 50px;
  height: auto;
  cursor: pointer;
}

#seen {
  display: block;
  transition-delay: 0.5s
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color:#141414;

}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: red;

}
</style>
