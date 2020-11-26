<template>
  <div class="searchlist">
    <h2> "<b>{{ $route.query.inputMovie }}</b>" 에 대한 검색결과가 {{ count }}건 있습니다.</h2>
    <hr>
    <!-- <div>{{$route.query}}</div> -->
    <div width="100%" v-for="(movie, idx) in $route.query.searchMovie" :key="idx">
      <div class="d-flex" width="100%">
        <div width="100%">
          <img class="search-content-img" :src="movie.image" alt="영화이미지">
        </div>
        <div class="search-content" width="100%">
          <div>
            <h3><a :href="movie.link" v-html="movie.title" title="네이버로 이동"></a></h3>
            <h5><i v-html="movie.subtitle"></i></h5>
          </div>
          <div>
            ⭐평점 : {{movie.userRating}}
          </div>
          <div v-html="movie.actor"></div>
          <div v-html="movie.director"></div>
        </div>
      </div>


      <hr>
    </div>

  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'Query',
  data () {
    return {
    }
  },
  computed : {
    count () {
      return _.size(this.$route.query.searchMovie)
    },
  }
}
</script>

<style>
.searchlist{
  width: 60%;
  height: auto;
  position:absolute;
  top: 300px;
  margin: auto;
  align-self:center;
}
.search-content {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  margin-left: 2rem;
}
.search-content-img {
  margin-left: 4rem;
}
</style>