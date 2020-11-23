<template>
  <div class="container">
    <h2> "<b>{{ $route.query.inputMovie }}</b>" 에 대한 검색결과가 {{ count }}건 있습니다.</h2>
    <hr>
    <!-- <div>{{$route.query}}</div> -->
    <div v-for="(movie, idx) in $route.query.searchMovie" :key="idx">
      <div class="d-flex">
      <span>
        <img :src="movie.image" alt="영화이미지">
      </span>
      <span>
        <a :href="movie.link" v-html="movie.title" title="네이버로 이동"></a>
          <p v-html="movie.subtitle"></p>
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
  computed : {
    count () {
      return this.$route.query.searchMovie.length
    }
  }
}
</script>

<style>

</style>