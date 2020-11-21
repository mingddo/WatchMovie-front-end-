<template>
<div class="container">
  <div class="review-box"> 
    <h1>Review Detail</h1>
      <hr>
    <div class="review-title">
      <h3>{{ review.title }}</h3>
    </div>
    <div class="review-U-D">
      <input @click="delete_review" class="btn-btn" type="button" value="delete">
      <input class="btn-btn" type="button" value="update">
    </div>
    <div class="review-contents">
      <p> 내용 : {{ $route.query.content }}</p>
      <h5>평점: {{ $route.query.rank }}</h5>
      <p>작성일: {{$route.query.created_at}}</p>
      <hr>
    </div>
    
  </div>
    <CommentForm @addComment="AddComment" :review_id="review_id"/>

  <div>
    <h4>댓글</h4>
    <div class="comment-box">
      <CommentItem @send_updated_commentID='send_updated_commentID' 
      @deleteComments="deleteComments" v-for="comment in comments" 
      :comments="comments" :key="comment.id" :comment="comment" :review_id="review_id"/>
    </div>

</div>
</div>
</template>

<script>
import axios from 'axios'
import CommentForm from './comment/CommentForm.vue'
import CommentItem from './comment/CommentItem.vue'

export default {
  props: {
    review: Object,
  },
  components: { 
    CommentForm,
    CommentItem,

     },
  data(){
    return {
      review_id: '',
      reviews : [],
      // review : {},
      addcomment: {},
      comments: [],
    }
  },
  name: 'ReviewDetail',
  methods: {
    send_updated_commentID(updatedCommnet) {
      this.comments = this.comments.map((cmt)=>{
        if(cmt.id === updatedCommnet.id){
          return updatedCommnet
        }else{
          return cmt
        }
      })
    },
    deleteComments(idx) {
      this.comments.splice(idx, 1)
    },
    AddComment(comment){
      this.comments.push(comment)
      console.log('푸쉬 ok', comment)
    },
    getComment(){
      axios({
        url:`http://127.0.0.1:8000/community/${this.review_id}/comment/`,
        method: 'GET',
        headers: {
        Authorization: `JWT ${localStorage.getItem('jwt')}`
      },
      }).then((res)=>{
        console.log(res.data)
        this.comments = res.data
      }).catch((err=>{
        console.error(err)
      }))
    },
    review_pk(){
      this.review_id = this.$route.query.id
      console.log(this.review_id)
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
      this.reviews = res.data
    }).catch((err)=>{
      console.error(err)
    })
  },
  delete_review(){
    axios({
      url:`http://127.0.0.1:8000/community/${this.review_id}/`,
      method: 'DELETE',
      headers: {
        Authorization: `JWT ${localStorage.getItem('jwt')}`
      },
    }).then((res)=>{
      console.log(res.data)
      this.$router.push({name:'ReviewList'})
    }).catch((err)=>{
      console.error(err)
    })
  },
  },
  computed:{

  },
  created() {
    this.review_pk()
    this.getComment()
    this.getReviews()
  },
  mounted(){
    this.getComment()
  },
}
</script>

<style>
.comment_list{
  list-style: none;
  /* border-bottom: rgb(141, 136, 136) solid;
  font-size: 20px; */

}
</style>