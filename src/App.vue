<template>
  <div id="app">
    <div id="nav">
      <div v-if="login">
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
    <router-view @login="setLogin"/>
  </div>
</template>

<script>
export default {
  data(){
    return {
      login: false,
    }
  },
  methods:{
    setLogin() {
      this.login = true
    },
    logout(){
      this.login = false
      localStorage.removeItem('jwt')
      this.$router.push('/login')
    },
  },
  created() {
    if (localStorage.getItem('jwt')){
      this.login = true
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
