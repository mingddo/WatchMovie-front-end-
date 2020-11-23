<template>
  <div>
    <h1>{{ user.username}} 님, 이런 영화는 어떠신가요?</h1>
    <div>
      
      <iframe allow="autoplay;" width="560" height="315" :src="recommendMovieData.video" frameborder="0"></iframe>
      <div class="d-flex">
        <h2>{{recommendMovieData.title}}</h2>
        <h1 v-if="recommendMovieData.adult" title="미성년관람불가">🔞</h1>
        <h1 v-else title="미성년관람가능">⭕</h1>
      </div>
      <h6>{{recommendMovieData.release_date}}</h6>
      <p>{{recommendMovieData.overview}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommendMovieData: Object,
    user: Object,
  },

}
</script>

<style>

</style>