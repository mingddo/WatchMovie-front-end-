<template>
  <div class="container">
    <h1>Review Detail</h1>
    <hr>
    <h3>{{ $route.query.title }}</h3>
    <p> 내용 : {{ $route.query.content }}</p>
    <h5>평점: {{ $route.query.rank }}</h5>
    <p>작성일: {{$route.query.created_at}}</p>
    <hr>
    <CommentForm :review_id="review_id"/>
    <CommentList/>
  </div>
</template>

<script>
import CommentForm from './comment/CommentForm.vue'
import CommentList from './comment/CommentList.vue'
export default {
  components: { 
    CommentForm,
    CommentList,
     },
  data(){
    return {
      review_id: '',
    }
  },
  name: 'ReviewDetail',
  methods: {
    review_pk(){
      this.review_id = this.$route.query.id
      console.log(this.review_id)
    },
  },
  created() {
    this.review_pk()
  }
}
</script>

<style>

</style>