<template>
  <div>
    <h1>Review List</h1>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">title</th>
            <th scope="col">rank</th>
            <th scope="col">user</th>
            <th scope="col">created_at</th>
          </tr>
        </thead>
        <tbody>
          
          <ReviewItem v-for="(review,idx) in reviews" :key="idx"
          :idx="idx" :review="review"/> 
        </tbody>
      </table>
    </div>
    <ReviewForm @addReview="createReview" class="unvisibility" />
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
    }
  },
  methods: {
    createReview(review){
    this.reviews.push(review)
    // console.log('푸시 잘된다.')
  },
    getReviews() {
      axios({
      url:'http://127.0.0.1:8000/community/',
      method: 'GET',
      headers: {
        Authorization: `JWT ${localStorage.getItem('jwt')}`
      },
    }).then((res)=>{
      // console.log(res.data)
      this.reviews = res.data
    }).catch((err)=>{
      console.error(err)
    })
  },
  
},
  mounted() {
    this.getReviews()
  }
}
</script>

<style scoped>
  tr {
    border-bottom: 1px solid;
  }
.unvisibility{
  display: none;
}
</style>