<template>
  <span>
    <div class="screen" @click="Onclick">
      <img class="poster-img" :src="PosterURL" alt="">
    </div>
    <!-- <div>
      <span class="movie-title">{{now_playing_movie.title}}</span>
    </div> -->
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
  methods: {
    Onclick() {
      this.$emit('selectedmovie', this.now_playing_movie)
    },
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
  width: 98%;
  height: 100%;
}
.poster-img{
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>