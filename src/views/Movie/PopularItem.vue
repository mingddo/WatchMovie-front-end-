<template>
  <span>
    <div class="screen">
      <img class="poster-img" :src="PosterURL" alt="">
    </div>
    <div>
      <span class="movie-title">{{popular_movie.title}}</span>
    </div>
  </span>
</template>

<script>

export default {
  props: {
    popular_movie: Object,
  },
  computed: {
    PosterURL() {
      return this.popular_movie.poster_path
    },
  },
}
</script>

<style>

</style>