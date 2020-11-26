<template>
  <div class="home">
    <div class="home-section first-box">
      <div v-show="!login" class="first-bolck-logout">
        <div class="right-box">
          <div class="first-box-body">

            <p class="first-content">아직 회원이 아니신가요?</p>
          </div>
          <button @click="gotosignup" class="home-signup-btn">
            <!-- <router-link to="/signup">Signup</router-link> -->
            Signup
          </button>
        </div>
        <div class="left-box">
          <div class="first-box-body">

            <p class="first-content">이미 회원이신가요?</p>
          </div>
          <button @click="gotologin" class="home-login-btn">
            <!-- <router-link to="/login">Login</router-link> -->
            Login
          </button>
        </div>
      </div>
      <div v-show="login" class="first-bolck-login">
        <p class="animate__animated animate__fadeIn">{{ user.username }}님, 안녕하세요</p>
      </div>


    </div>
    <div class="home-section secondbox" style="color:black;">

      <div class="explain-frame">
        <div class="explain-img">
          <svg viewBox="0 0 16 16" class="bi bi-film" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0h8v6H4V1zm8 8H4v6h8V9zM1 1h2v2H1V1zm2 3H1v2h2V4zM1 7h2v2H1V7zm2 3H1v2h2v-2zm-2 3h2v2H1v-2zM15 1h-2v2h2V1zm-2 3h2v2h-2V4zm2 3h-2v2h2V7zm-2 3h2v2h-2v-2zm2 3h-2v2h2v-2z"/>
          </svg>
        </div>
        <div class="explian-title">
          <h1 class="display-4">Movie</h1>
          <p class="lead">우리는 다양한 영화 정보를 제공합니다.</p>
        </div>
        <button class="btn btn-link button-animation-hor" style=" margin-bottom: 1rem" @click="movie_Toggle">
          <svg width="2em" height="2em" viewBox="0 0 16 16" style="color: #141414;" class="bi bi-chevron-compact-down button-animation-hor" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"/>
          </svg>
        </button>
        <div :class="{hide:!movieBtn}" class="animate__animated animate__fadeIn ">
          <ul class="explain-content">
            <p>우리는 300여개의 영화 데이터를 보유하고 있습니다.</p>
            <p>데이터에 없어도 당신이 입력한 영화를 찾을 수 있습니다.</p>
            <p>영화 검색창을 통해 더욱 많은 정보를 만날 수 있습니다.</p>
          </ul>
        </div>
      </div>


      <div class="explain-frame">
        <div class="explain-img">
          <svg  viewBox="0 0 16 16" class="bi bi-suit-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
          </svg>
        </div>
        <div class="explian-title">
          <h1 class="display-4">Wish</h1>
          <p class="lead">당신은 그저 선택하세요.</p>
        </div>
        <button class="btn btn-link button-animation-hor" style=" margin-bottom: 1rem"  @click="wish_Toggle">
          <svg width="2em" height="2em" style="color: #141414;" viewBox="0 0 16 16" class="bi bi-chevron-compact-down button-animation-hor" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"/>
          </svg>
        </button>
          <div :class="{hide:!wishBtn}" class="animate__animated animate__fadeIn ">
            <ul class="explain-content">
              <p>Wish를 통해 당신의 취향을 반영합니다.</p>
              <p>물론 wish는 언제나 수정할 수 있습니다.</p>
              <p>당신의 취향과 유사한 영화를 추천합니다.</p>
            </ul>
          </div>

      </div>
        <div class="explain-frame">
          <div class="explain-img">
            <svg  viewBox="0 0 16 16" class="bi bi-people-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
            </svg>
          </div>
          <div class="explian-title">
            <h1 class="display-4">With</h1>
            <p class="lead">사람들과 함께 리뷰를 나눠보세요.</p>
          </div>
          <button class="btn btn-link button-animation-hor" style=" margin-bottom: 1rem" @click="with_Toggle">
            <svg width="2em" height="2em" style="color: #141414;" viewBox="0 0 16 16" class="bi bi-chevron-compact-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"/>
            </svg>
          </button>
          <div :class="{hide:!withBtn}" class="animate__animated animate__fadeIn ">
            <ul class="explain-content">
              <p>영화에 대해 의견을 나눌 수 있습니다.</p>
              <p>댓글을 통해 소통할 수 있습니다.</p>
              <p>취향이 같은 유저는 구독하세요!</p>
            </ul>
          </div>
        </div>

    </div>


    <div class="home-section-third">


          <div class="third-part">
            <div class="third-one">
              <h1 class="display-4 font-color" style="color:white;">Language</h1>
              <div class="logos">
                <img class="image-size" src="https://www.flaticon.com/svg/static/icons/svg/919/919852.svg" alt="">
                <img class="image-size" src="https://www.flaticon.com/svg/static/icons/svg/919/919828.svg" alt="">
              </div>
            </div>

            <div class="third-one">
              <h1 class="display-4 font-color" style="color:white;">Framework</h1>
              <div class="logos">
                <img class="image-size" src="https://media.vlpt.us/images/ooknimm/post/bc257edd-4556-4520-add6-98d6a0f558a2/img.png" alt="">
                <img class="image-size" src="https://kr.vuejs.org/images/logo.png" alt="">
              </div>
            </div>

            </div>

          <div class="third-two">
          <h1 class="display-4 font-color" >Developer</h1>
          <div class="people-info">
            <div class="person">
              <img class="image-size" src="https://www.flaticon.com/svg/static/icons/svg/3368/3368675.svg" alt="">
              <p class="name">장수민</p>
              <p class="lead" style="color:#45269b;">Backend</p>
            </div>
            <div class="person">
              <img class="image-size" src="https://www.flaticon.com/svg/static/icons/svg/3368/3368788.svg" alt="">
              <p class="name">명도균</p>
              <p class="lead" style="color:#45269b;">Frontend</p>
            </div>
          </div>
          </div>


    </div>
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
      movieBtn: false,
      wishBtn: false,
      withBtn: false,
    };
  },
  components: {},
  methods:{
    movie_Toggle(){
      console.log(this.movieBtn)
      this.movieBtn = !this.movieBtn
    },
    wish_Toggle(){
      this.wishBtn = !this.wishBtn
    },
    with_Toggle(){
      this.withBtn = !this.withBtn
    },
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
.name{
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: bold;
  font-size: 3rem;
}
.font-color{
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 700;
  color: #f20ac8;
}
.logos{
width: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;

}
.people-info{
    width: 60%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.person{
  width: 40%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  margin: 2rem;
}
.third-one{
  width: 50%;
  height: 18rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.third-two{
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.third-part{
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
}
.animate__animated.animate__fadeIn {
  --animate-duration: 3s;
}

.hidden{
transition: all 600ms cubic-bezier(0.86, 0, 0.07, 1);
}
.bi-film{
  color: #45269b;
}
.lead{
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: bold;
}
.bi-people-fill{
  color: #45269b;
}
.bi-suit-heart-fill{
  color: #F20AC8;
}
.explain-content{
  width: 100%;
  word-break: keep-all;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
    font-family: 'Noto Sans KR', sans-serif;
}
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
.home-section-third {
  width: 100%;
  min-height: 40rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.secondbox{
  background-color: rgb(236, 236, 234);
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.explain-frame{
  width: 33%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.explain-img{
  width: 20%;
  height: auto;
}
.first-bolck-login {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  font-family: "Nanum Gothic", sans-serif;
  font-weight: 700;
}
.button-animation-hor :hover {
  cursor: pointer;
  transform: translateY(1px);
}
.image-size {
  width: 8em;
  height: 8em;
}
</style>