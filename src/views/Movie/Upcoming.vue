<template>
  <div>
  <carousel class="slide-frame" :perPageCustom="[[768, 2], [1024, 5]]" :autoplay="true" :loop="true" :autoplay-timeout="5000">
    <slide v-for="upcomming_movie in upcomming_movies" :key="upcomming_movie.id">
       <UpcomingItem :upcomming_movie="upcomming_movie" @selectedmovie="selectedmovie"/>
    </slide>
  </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import UpcomingItem from './UpcomingItem.vue'
export default {
  components: {
    Carousel,
    Slide,
    UpcomingItem
  },
  props: {
    upcomming_movies: Array,
  },
    methods: {
    selectedmovie(selectMovie){
      this.$emit('selectedmovie',selectMovie)
    }
  },
}
</script>

<style>

</style>