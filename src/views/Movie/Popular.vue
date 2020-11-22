<template>

  <carousel class="slide-frame" :per-page="5" :navigate-to="someLocalProperty" :mouse-drag="false">
    <slide v-for="popular_movie in popular_movies" :key="popular_movie.id">
       <PopularItem :popular_movie="popular_movie"/>
    </slide>
  </carousel>

</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import PopularItem from './PopularItem.vue'
export default {
  components: {
    Carousel,
    Slide,
    PopularItem,
  },
    props: {
    popular_movies: Array,
  }
}
</script>

<style>

</style>