<template>
  <span>
    <div class="Yscreen" @click="Onclick">
      <img class="Yposter-img" :src="PosterURL" alt="">
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

</style>