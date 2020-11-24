<template>
  <tr>
    <td>{{ review.id }}</td>
    <td> <p class="title-click" @click="OnClick"> {{ review.title }} </p></td>
    <td class="title-click" @click="OnSearch" :title="searchTitle"><p>{{ review.movie_title }}</p></td>
    <td> {{review.rank}}</td>
    <td class="title-click">
      <button type="button" class="btn btn-link" title="프로필로 이동" @click="OnclickUser">
        <svg width="1.7em" height="1.7em" viewBox="0 0 16 16" class="bi bi-person-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          <path fill-rule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        </svg>
      </button>
    </td>
    <td>{{review.created_at}}</td>
  </tr>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      starRating : '',
      searchTitle: `${this.review.movie_title} 네이버에 검색하기`,
    }
  },
  props: {
    review: Object,
    idx: Number,
  },
  methods: {
    OnSearch () {
      console.log(this.review)
      const keyword = this.review.movie_title
        axios.get(`http://127.0.0.1:8000/movies/search/${keyword}/`, )
        .then((res) => {
          console.log(res.data)

          const searchMovie = res.data
          this.$router.push({ name: "SearchList", query: { searchMovie: searchMovie, inputMovie : this.review.movie_title }, });
        })
        .catch((err) => {
          console.log(err)
        })

    },
    OnclickUser(){
      this.$router.push({name: 'Profile', query:{ userId: this.review.user }})
    },
    OnClick() {
      this.$router.push({name: 'ReviewDetail', query: {...this.review}})
    },
  },
  }
</script>

<style>
.title-click:hover {
  cursor: pointer;
  text-decoration: underline;
  color: red;
}

</style>