<template>
  <div>
  <carousel class="slide-frame" :per-page="5" :navigate-to="someLocalProperty" :mouse-drag="false">
    <slide v-for="upcomming_movie in upcomming_movies" :key="upcomming_movie.id">
       <UpcomingItem :upcomming_movie="upcomming_movie"/>
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
  }
}
</script>

<style>

</style>