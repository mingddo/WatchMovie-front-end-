<template>
  <span>

  <carousel class="slide-frame" :perPageCustom="[ [768, 3], [1024, 7]]" 
  :navigationNextLabel="next"
  :autoplay="true" :autoplay-timeout="5000" :loop="true">
    <slide v-for="now_playing_movie in now_playing_movies" :key="now_playing_movie.id">
       <NowItem :now_playing_movie="now_playing_movie" @selectedmovie="selectedmovie"/>
    </slide>
  </carousel>
  </span>
</template>

<script>
import { Carousel, Slide } from "vue-carousel"
import NowItem from './NowItem.vue';
export default {
  data(){
    return {
      now_movies: [],
      next: '▶'
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
  methods: {
    selectedmovie(selectMovie){
      this.$emit('selectedmovie',selectMovie)
    }
  },
  computed:{
    navigation_next(){
      return <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-right-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
</svg>
    }
  }
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