<template>
  <div>
    <h1>{{ user.username}} 님, 이런 영화는 어떠신가요?</h1>
    <iframe allow="autoplay;" width="560" height="315" :src="recommendMovieData.video" frameborder="0"></iframe>
    <h2>{{recommendMovieData.title}}</h2>
    <h6>{{recommendMovieData.release_date}}</h6>
    <p>{{recommendMovieData.overview}}</p>
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