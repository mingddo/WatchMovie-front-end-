<template>
  <div>
    <h1>{{this.$route.query.title}}</h1>
    <img :src="this.$route.query.poster_path" alt="">
    <div>
      <p>
        {{this.$route.query.overview}}
      </p>
    </div>
    <div>{{this.$route.query.release_date}}</div>
    <div>{{this.$route.query.vote_average}}</div>
    <div class="container" v-if="!noReview">
      <h3>관련 리뷰가 {{this.reviewCount}} 개 있습니다.</h3>
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
        <button>리뷰 작성하러 가기</button>
        
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
      noReview: true,
      reviewCount: 0,
    }
  },
  methods: {
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
        console.log(review)
        if (review.movie_title == this.$route.query.title) {
          console.log('찾았따!')
          this.noReview = false
          this.reviews.push(review)
          this.reviewCount = this.reviewCount + 1
        } else {
          this.noReview = true
        }
      } 
    }).catch((err)=>{
      console.error(err)
    })
    }, 
  },
  created () {
    this.getReviews();
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
  }
}
</script>

<style>

</style>