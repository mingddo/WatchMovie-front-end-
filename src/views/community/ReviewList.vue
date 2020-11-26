<template>
  <div class="review-main">
    <div class="container" style="text-align:left;">
      <p class="review-h1">Review List</p>
    </div>
    <div class="container" style="padding: 0"> 
      <div class="review-content review-movietitle">
        <div class="review-nav d-flex">
          <button class="btn btn-link" @click="goToNew" title="새글 작성">
            <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-plus-circle-fill" fill="lightgray" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
            </svg>
          </button>
        </div>
      <table class="table">
        <thead>
          <tr class="white-text">
            <th scope="col">글 번호</th>
            <th scope="col">제목</th>
            <th scope="col">영화</th>
            <th scope="col">평점</th>
            <th scope="col">작성자</th>
            <th scope="col">작성일자</th>
          </tr>
        </thead>
        <tbody>
          
          <ReviewItem v-for="(review,idx) in reviews" :key="idx"
          :idx="idx" :review="review"/> 
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul class="pagination d-flex justify-content-center">
          <li v-for="(page, idx) in pages" :key="idx" class="page-item"><a class="page-link color-light-gray" href="#" @click="goTopage(page)">{{page}}</a></li>
        </ul>
      </nav>
    </div>
    <ReviewForm @addReview="createReview" class="unvisibility" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ReviewItem from './ReviewItem.vue'
import ReviewForm from './ReviewForm.vue'
export default {
  components: { 
    ReviewItem,
    ReviewForm },
  data(){
    return {
      reviews: [],
      pages: 1,
      currentPage : 1,
    }
  },
  methods: {
    goTopage (page) {
      axios({
      url:`http://127.0.0.1:8000/community/page/${page}/`,
      method: 'GET',
      headers: {
        Authorization: `JWT ${localStorage.getItem('jwt')}`
      },
      }).then((res) => {
        this.reviews = res.data
      }).catch((err) => {
        console.error(err)
      })
    },
    createReview(review){
    this.reviews.push(review)
    // console.log('푸시 잘된다.')
    },
    getReviews() {
      axios({
      url:`http://127.0.0.1:8000/community/`,
      method: 'GET',
      headers: {
        Authorization: `JWT ${localStorage.getItem('jwt')}`
      },
    }).then((res)=>{
      // console.log(res.data)
      this.reviews = res.data
      const count = this.reviews.length
      this.pages = Math.ceil(count/10)
      console.log('몇개?', this.pages)
    }).catch((err)=>{
      console.error(err)
    })
    },
    goToNew () {
      this.$router.push('/reviewform')
    }
  },
  created () {
    this.goTopage(1);
  },
  mounted() {
    this.getReviews();
    this.goTopage(1);
  },
}
</script>

<style scoped>
.review-h1{
  font-size: 3rem;
  padding: 1.5rem 2.5rem;
}
.reviewlist-title{
  width: 90%;
  height: auto;
  margin: auto;
  text-align: left;
}
.review-content{
  padding-top:30px;
  width: 90%;
  height: auto;
  margin: auto;
}
.review-main{
  width: 100%;
  height: auto;
  margin: auto;
  position: absolute;
  top: 300px;
}
  tr {
    border-bottom: 1px solid;
  }
  .unvisibility{
    display: none;
  }
  .review-nav {
    text-align: left;
  }
  .color-light-gray {
    background-color: lightgray;
    color: black;
  }
</style>