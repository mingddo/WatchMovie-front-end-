<template>
  <span>
    <div class="Yscreen" @click="Onclick">
      <img class="Yposter-img" :src="PosterURL" alt="">
    </div>
    <!-- <div>
      <span class="movie-title">{{popular_movie.title}}</span>
    </div> -->
  </span>
</template>

<script>

export default {
  props: {
    popular_movie: Object,
  },
  methods: {
  Onclick() {
    this.$emit('selectedmovie', this.popular_movie)
  },
  },
  computed: {
    PosterURL() {
      return this.popular_movie.poster_path
    },
  },
}
</script>

<style>
.Yscreen{
  width: 98%;
  height: auto;
}
.Yposter-img{
    width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>