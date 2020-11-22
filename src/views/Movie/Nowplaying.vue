<template>

  <carousel class="slide-frame" :per-page="5" :navigate-to="someLocalProperty" :mouse-drag="false">
    <slide v-for="now_playing_movie in now_playing_movies" :key="now_playing_movie.id">
       <NowItem :now_playing_movie="now_playing_movie"/>
    </slide>
  </carousel>
</template>

<script>
import { Carousel, Slide } from "vue-carousel"
import NowItem from './NowItem.vue';
export default {
  data(){
    return {
      now_movies: []
    }
  },
  components: {
    Carousel,
    Slide,
    NowItem,
  },
  props: {
    now_playing_movies: Array,
  },
};
</script>

<style>
.slide-frame{
  width: 100%;
  height: auto;
  margin: auto;
  padding: auto;
}
</style>