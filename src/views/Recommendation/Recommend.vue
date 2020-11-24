<template>
  <div class="recommend-box-frame">
    <h2 class="recommend">{{ user.username}} 님, </h2>
    <h2 class="recommend">이런 영화는 어떠신가요?</h2>
    <div class="recommend-box-content">
      
      <iframe allow="autoplay;" width="100%" height="315" :src="recommendMovieData.video" frameborder="0"></iframe>
      <div class="recommend-text">
        <div class="rexommend-title gugi-font">
        <h2>{{recommendMovieData.title}}</h2>
        </div>
        <div>
        <div v-if="recommendMovieData.adult" title="미성년관람불가">🔞</div>
        <div v-else title="미성년관람가능">⭕</div>
        </div>
      </div>
      <h6 class="noto-sans-font">{{recommendMovieData.release_date}}</h6>
      <p class="rexommend-title nanum-gothic-font">{{recommendMovieData.overview}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommendMovieData: Object,
    user: Object,
  },

}
</script>

<style>
.rexommend-title{
  text-align: left;
}
.recommend{
  width: 80%;
  height: auto;
  margin: 0;
}
.recommend-box-content{
  width: 100%;
  height: 80%;
  margin: auto;
}
.recommend-box-frame{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.recommend-text{
  width: 100%;
  height: 30%;
  display: inline;
}
.recommend-text p{
  border: nonepx;
  font-size: 30px;
}
</style>