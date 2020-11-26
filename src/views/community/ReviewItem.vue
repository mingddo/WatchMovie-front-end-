<template>
  <tr class="white-text">
    <td>{{ review.id }}</td>
    <td> <p class="title-click" @click="OnClick"> {{ review.title }} </p></td>
    <td class="title-click" @click="movieDetail" :title="searchTitle"><p>{{ review.movie_title }}</p></td>
    <td> {{starRank}}</td>
    <td class="title-click" @click="OnclickUser">
      <p>{{ this.user }}</p>
    </td>
    <td>
      {{review.created_at}}
    </td>
  </tr>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      starRating : '',
      searchTitle: `${this.review.movie_title} 네이버에 검색하기`,
      Movie: {},
      user : '',
    }
  },
  props: {
    review: Object,
    idx: Number,
  },
  methods: {
    getUsername () {
      axios({
        url: `http://127.0.0.1:8000/accounts/${this.review.user}/`,
        method: 'GET',
        headers: {
          Authorization: `JWT ${localStorage.getItem('jwt')}`
        },
      })
      .then((res) => {
        console.log(res.data)
        this.user = res.data.username
      })
    },
    movieDetail () {
      axios({
        url: `https://api.themoviedb.org/3/search/movie?query=${this.review.movie_title}&api_key=8891da6c530f993ba51066b80edfa91d&language=ko-kr`,
        method: 'GET',
      })
      .then((res) => {
        let found = false
        for (const result of res.data.results) {
          console.log('결과는?', result)
          if (this.review.movie_title === result.title) {
            this.Movie = result
            found = true
            console.log('찾았다!', found)
            break
          }
          if (!found) {
            this.Movie = res.data.results[0]
          }
        } 
        console.log(res.data.results)
        this.$router.push({name: "MovieDetail", query: {...this.Movie, poster_path:`https://image.tmdb.org/t/p/w500${this.Movie.poster_path}`}})
      })
    },
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
  created () {
    this.getUsername();
  },
    computed : {
    starRank () {
      if (this.review.rank == 1) {
        return '⭐' 
      } else if (this.review.rank == 2) {
        return '⭐⭐'
      } else if (this.review.rank == 3) {
        return '⭐⭐⭐'
      } else if (this.review.rank == 4) {
        return '⭐⭐⭐⭐'
      } else {
        return '⭐⭐⭐⭐⭐'
      }
    },
  }
  }
</script>

<style>
.white-text {
  color: white;
}
.title-click:hover {
  cursor: pointer;
  text-decoration: underline;
}
.color-purple {
  color: #45269b
}

</style>