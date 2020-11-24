<template>
  <span>
    <div class="Yscreen" @click="Onclick">
      <img class="Yposter-img" :src="PosterURL" alt="">
    </div>
    <!-- <div>
      <span class="movie-title">{{upcomming_movie.title}}</span>
    </div> -->
  </span>
</template>

<script>

export default {
  props: {
    upcomming_movie: Object,
  },
  methods:{
    Onclick() {
      this.$emit('selectedmovie', this.upcomming_movie)
    },
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