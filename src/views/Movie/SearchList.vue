<template>
  <div class="container">
    <h2>검색결과</h2>
    <!-- <div>{{$route.query}}</div> -->
    <div v-for="(movie, idx) in $route.query" :key="idx">
      <div class="d-flex">
      <span>
        <img :src="movie.image" alt="영화이미지">
      </span>
      <span>
        <a :href="movie.link" v-html="movie.title" title="네이버로 이동"></a>
          <p>{{movie.subtitle}}</p>
          <p>{{movie.actor}}</p>
          <p>{{movie.director}}</p>
          <p>{{movie.pudDate}}</p>
          <p>{{movie.userRating}}</p>
      </span>
      </div>
      <hr>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Query',
}
</script>

<style>

</style>