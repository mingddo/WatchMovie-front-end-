<template>
  <div>
    <span v-if="commented">{{ comment.content }}</span> 
    <form v-else @submit="sendUpdatedComment">
      <label for="cmmt">댓글: </label>
      <input type="text" name="" id="cmmt" v-model="update_comment">
      <button>저장하기</button>
    </form>
    <svg v-show="commented" @click="commentDelete" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
    </svg>
    <span>
      <svg v-show="commented" @click="ClickUpdate" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
      </svg>
    </span>

  </div>
</template>

<script>
import axios from 'axios'
export default {
props : {
  comment: Object,
  review_id: [String, Number],
  comments: Array,
},
  data(){
    return {
      update_comment:'',
      commented: true,
    }
  },
  methods:{
    sendUpdatedComment(event){
      event.preventDefault()
      axios({
      url:`http://127.0.0.1:8000/community/${this.review_id}/comment/${this.comment.id}/`,
      method: 'PUT',
      data:{
        content: this.update_comment
      },
      headers: {
        Authorization: `JWT ${localStorage.getItem('jwt')}`
      },
    }).then((res)=>{
      console.log(res.data)
      this.$emit('send_updated_commentID', res.data)
      this.commented = true
    }).catch((err)=>{
      console.error(err)
    })
    },
    commentDelete() {
      axios({
      url:`http://127.0.0.1:8000/community/${this.review_id}/comment/${this.comment.id}/`,
      method: 'DELETE',
      headers: {
        Authorization: `JWT ${localStorage.getItem('jwt')}`
      },
    }).then((res)=> {
      console.log(res.data)
      const CommentIdx = this.comments.findIndex((comment)=>{
        return comment.id === res.data.id
      })
      this.$emit('deleteComments', CommentIdx)
    }).catch((err)=>{
      console.error(err)
    })
    },
    ClickUpdate() {
      console.log(this.comment)
    this.commented = false
    this.update_comment = this.comment.content
  },
  },
    
}
</script>

<style>

</style>