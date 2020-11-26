<template>

  <div class="review-detal-page">
    <div class="review-detail-body">
      <div class="review-poster">
        <img :src="this.$route.query.poster_path" class="posterimg" alt="...">
      </div>
      <div class="review-content">
        <div class="review-title-group">
            <p class="review-detail-movie-title">{{this.$route.query.title}}</p>
            <h5><i>{{this.$route.query.release_date}}</i></h5>
        </div>
        <div>
          <div>
            ⭐평점
          </div>
          <div class="progress">
            <div class="progress-bar" role="progressbar" :style="`width: ${this.rank}%`" :aria-valuenow="this.$route.query.vote_average" aria-valuemin="0" aria-valuemax="10"></div>
          </div>
        </div>
            <hr>
        <div>
          <p class="detail-overview">{{this.$route.query.overview}}</p>
        </div>
        <div class="review-detail-btn">
          <button class="review-btn" @click="addWishMovie">wish_movie
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
        </button>

        <button class="review-btn" @click="deleteWishMovie">delete_movie
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
          </svg>
        </button>
        <button class="review-detail-search-btn">
          search_movie
          <svg width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-search"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                  <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
          </svg>
        </button>
        </div>
      </div>

      
    </div>
    <hr>
    <div class="container" v-if="IsReview">
      <div class="d-flex justify-content-center">
      <h3>관련 리뷰가 {{this.reviewCount}} 개 있습니다.</h3>
      <button class="btn btn-link" @click="goToNew" title="새글 작성">
        <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-plus-circle-fill" fill="lightgray" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
        </svg>
      </button>
      </div>
      <table class="table">
        <thead>
          <tr class="white-text">
            <th scope="col">제목</th>
            <th scope="col">평점</th>
            <th scope="col">작성자</th>
            <th scope="col">작성일자</th>
          </tr>
        </thead>
        <tbody>
          <tr class="white-text" v-for="(review, idx) in reviews" :key="idx" :review="review">
            <td> <p class="title-click"> {{ review.title }} </p></td>
            <td> {{ review.rank}}</td>
            <td class="title-click">
              <button type="button" class="btn btn-link" title="프로필로 이동" @click="OnclickUser(review)">
                <svg width="1.7em" height="1.7em" viewBox="0 0 16 16" class="bi bi-person-square color-purple" fill="lightgray" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                  <path fill-rule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
              </button>
            </td>
            <td class="">{{review.created_at}}</td>
          </tr>
        </tbody>
      </table>
      </div>
    <div v-else>
      <h2>아직 작성된 리뷰가 없어요!</h2>
      <br>
      <button type="button" class="goto-search-btn" @click="goToNew">리뷰 작성하러 가기</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "MovieDetail",
  data () {
    return {
      reviews : [],
      IsReview: false,
      reviewCount: 0,
      rank : 1,
    }
  },
  methods: {
    goToNew () {
      console.log(this.$route.query.title)
      this.$router.push({name: 'ReviewForm', query:{movietitle : this.$route.query.title}})
    },
    calculateRank () {
      this.rank = this.$route.query.vote_average * 10
    },
    OnclickUser(review){
      // console.log('왜 안돼', review)
      this.$router.push({name: 'Profile', query:{ userId: review.user }})
    },
    getReviews() {
      axios({
      url:'http://127.0.0.1:8000/community/',
      method: 'GET',
      headers: {
        Authorization: `JWT ${localStorage.getItem('jwt')}`
      },
    }).then((res)=>{
      console.log(res.data)
      for (const review of res.data) {
        if (review.movie_title == this.$route.query.title) {
          this.IsReview = true
          console.log('찾았따!')
          this.IsReview = true
          this.reviews.push(review)
          this.reviewCount = this.reviewCount + 1
        }
      } console.log('총 결과', this.IsReview)
    }).catch((err)=>{
      console.error(err)
    })
    }, 
  },
  created () {
    this.getReviews();
    this.calculateRank();
  },
  computed : {
    // starRank () {
    //   if (review.rank == 1) {
    //     return '⭐' 
    //   } else if (review.rank == 2) {
    //     return '⭐⭐'
    //   } else if (review.rank == 3) {
    //     return '⭐⭐⭐'
    //   } else if (review.rank == 4) {
    //     return '⭐⭐⭐⭐'
    //   } else {
    //     return '⭐⭐⭐⭐⭐'
    //   }
    // },
  },
    beforeRouteLeave (to, from, next) {
      this.IsReview = false
      next ()
  }
}
</script>

<style>
.review-title-group{
  width: 100%;
  text-align: left;

}
.review-detail-btn{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.review-detail-movie-title{
  font-size: 2rem;
  text-align: left;
  font-family: 'Gugi', cursive;
}
.review-btn {
  width: 25%;
  border: none;
  border-radius: 15px;
  height: 3rem;
  background-color: #f3ef07;
  color: black;
  font-size: 1rem;
}
.review-detail-search-btn {
  width: 25%;
  border: none;
  border-radius: 15px;
  height: 3rem;
  background-color: #341eb3;
  color: white;
  font-size: 1rem;
}
.goto-search-btn{
  width: 70%;
  border: none;
  border-radius: 15px;
  height: 3rem;
  background-color: #c703ce;
  color: white;
  font-size: 1.5rem;
}
.review-content{
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: left;
  margin: 0 2rem;
}
.review-detal-page{
  width: 80%;
  height: auto;
  margin: auto;
  padding: 3rem 0;
  position:absolute;
  top: 250px;
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.review-poster{
  width: 30%;
  height: auto;

}
.posterimg{
  width: 100%;
  height: auto;
  object-fit: cover;
}
.review-detail-body{
  display: flex;

  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 60%;
  margin: auto;
}
</style>