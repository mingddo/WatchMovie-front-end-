<template>
  <div class="home">
    <div class="home-section first-box">
      <div v-show="!login" class="first-bolck-logout">
        <div class="right-box">
          <div class="first-box-body">
            <p class="right-singup">W</p>
            <p class="first-content">아직 회원이 아니신가요?</p>
          </div>
          <button @click="gotosignup" class="home-signup-btn">
            <!-- <router-link to="/signup">Signup</router-link> -->
            Signup
          </button>
        </div>
        <div class="left-box">
          <div class="first-box-body">
            <p class="left-login">M</p>
            <p class="first-content">이미 회원이신가요?</p>
          </div>
          <button @click="gotologin" class="home-login-btn">
            <!-- <router-link to="/login">Login</router-link> -->
            Login
          </button>
        </div>
      </div>
      <div v-show="login" class="first-bolck-login">
        <p>{{ user.username }}님, 안녕하세요</p>
      </div>
    </div>
    <div class="home-section secondbox"></div>
    <div class="home-section">우리 소개 페이지</div>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {
    user: Object,
  },
  data() {
    return {
      login: false,
    };
  },
  components: {},
  methods:{
    gotologin(){
      this.$router.push("/login");
    },
    gotosignup(){
      this.$router.push("/signup");
    },
  },
  created() {
    if (localStorage.getItem("jwt")) {
      this.login = true;
      console.log("왜 안찍히지?", this.login);
    }
  },
};
</script>
<style>
.home {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 300px;
}

.first-content{
  font-size: 2.8rem;
}
.first-bolck-logout {
  width: 100%;
  height: 50rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.first-box-body{
  width: 100%;
  height: 30%;
}
.left-box {
  width: 80%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.left-login {
  justify-self: start;
}
.home-login-btn {
  width: 10rem;
  height: 6rem;
  border-radius: 40px;
  font-size: 2.5rem;
  background-color: #45269b;
  border: none;
  cursor: pointer;
  color: white;
  font-family: "Nanum Gothic", sans-serif;
  font-weight: 700;
}
.home-signup-btn {
  width: 10rem;
  height: 6rem;
  border-radius: 40px;
  font-size: 2rem;
  background-color: #f20ac8;
  border: none;
  cursor: pointer;
  color: white;
  font-family: "Nanum Gothic", sans-serif;
  font-weight: 700;
}
.right-box {
  width: 80%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.home-section {
  width: 100%;
  min-height: 40rem;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.secondbox{
background-color: rgb(236, 236, 234);
}
.first-bolck-login {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  font-family: "Nanum Gothic", sans-serif;
  font-weight: 700;
}
</style>