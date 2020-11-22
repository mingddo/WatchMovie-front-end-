<template>
  <div>
    <div class="jumbotron">
      <h1 class="display-4">{{ user.username }}</h1>
      <p class="lead">여기는 프로필 페이지다. 아직 완성이 되지 않아따..............................................</p>
      <hr class="my-4">
      <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
      <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VueJwtDecode from 'vue-jwt-decode'
export default {
  data() {
    return {
      user: {},
    }
  },
  methods: {
    getUserName(){
      const USER_PK = VueJwtDecode.decode(localStorage.getItem('jwt')).user_id
      axios({
        url:`http://127.0.0.1:8000/accounts/${USER_PK}/`,
        method: 'GET',
        headers: {
          Authorization: `JWT ${localStorage.getItem('jwt')}`
        },
      }).then((res)=>{
        console.log(res.data)
        this.user = res.data
      }).catch((err)=>{
        console.error(err)
      })

    },
  },
created() {
  this.getUserName()
}
}
</script>

<style>

</style>