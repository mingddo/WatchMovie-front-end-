<template>
  <span>
    <div class="screen">
      <img class="poster-img" :src="PosterURL" alt="">
    </div>
    <div>
      <span class="movie-title">{{now_playing_movie.title}}</span>
    </div>
  </span>
</template>

<script>
// import { Slide } from "vue-carousel";
export default {
  components: {
    // Slide
  },
  props: {
    now_playing_movie: Object,
  },
  computed: {
    PosterURL() {
      // console.log(this.now_playing_movie)
      return this.now_playing_movie.poster_path
    },
  },
}
</script>

<style>
.screen {
  width: 300px;
  height: auto;
}
.poster-img{
  width: 100%;
  height: 100%;
}
</style>