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
            <th scope="col">created_at</th>
          </tr>
        </thead>
        <tbody>
          <ReviewItem v-for="(review,idx) in reviews" :key="idx"
          :idx="idx" :review="review"/> 
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ReviewItem from './ReviewItem.vue'
export default {
  components: { 
    ReviewItem },
  data(){
    return {
      reviews: [],

      // reviews : [{id: 1, title:'첫 번째 리뷰', content:'내용', rank:'3', created_at:'11-19'},
      // {id: 2, title:'두 번째 리뷰', content:'내용', rank:'2', created_at:'11-12'}
      // ],
    }
  },
  methods: {
    getReviews() {
      axios({
      url:'http://127.0.0.1:8000/community/',
      method: 'GET',
      headers: {
        Authorization: `JWT ${localStorage.getItem('jwt')}`
      },
    }).then((res)=>{
      console.log(res.data)
      this.reviews = res.data
    }).catch((err)=>{
      console.error(err)
    })
  },
},
  created() {
    this.getReviews()
  }
}
</script>

<style scoped>
  tr {
    border-bottom: 1px solid;
  }

</style>