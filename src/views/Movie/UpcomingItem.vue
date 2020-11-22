<template>
  <span>
    <div class="screen">
      <img class="poster-img" :src="PosterURL" alt="">
    </div>
    <div>
      <span class="movie-title">{{upcomming_movie.title}}</span>
    </div>
  </span>
</template>

<script>

export default {
  props: {
    upcomming_movie: Object,
  },
  computed: {
    PosterURL() {
      return this.upcomming_movie.poster_path
    },
  },
}
</script>

<style>

</style>