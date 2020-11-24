<template>

  <carousel class="slide-frame" :perPageCustom="[[768, 2], [1024, 5]]" :autoplay="true" :autoplay-timeout="5000" :loop="true">
    <slide v-for="popular_movie in popular_movies" :key="popular_movie.id">
       <PopularItem :popular_movie="popular_movie" @selectedmovie="selectedmovie"/>
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
  },
  methods: {
  selectedmovie(selectMovie){
    this.$emit('selectedmovie',selectMovie)
  }
  },
}
</script>

<style>
.slide-frame{
  width: 100%;
  height: auto;
  margin: auto;
  padding: auto;
}
</style>