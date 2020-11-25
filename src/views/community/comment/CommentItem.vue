<template>
  <div class="comment-box white-text">
    <p>{{ comment.usernName }}</p>
    <table class="table">
      <tbody class="comment-table">
        <tr v-if="commented" class="row white-text">
          <td class="col-1">
            
            <button type="button" class="btn btn-link" @click="goProfile" title="프로필페이지 가기">
              <svg width="1.7em" height="1.7em" viewBox="0 0 16 16" class="bi bi-person-square" fill="lightgray" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                <path fill-rule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              </svg>
            </button>
          </td>
          <td class="col mx-auto hor-center">
            <div class="nanum-gothic-font">{{ comment.content }}</div>
          </td>
          <td class="col-2 hor-center">
            <div class="nanum-gothic-font">{{ comment.updated_at }}</div>
          </td>
          <td class="col-1">
            <div class="btn-group" title="수정 및 삭제" v-show="commented">
              <button type="button" class="btn btn-link dropdown-toggle dropdown-toggle-split color-lightgray" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-justify" fill="lightgray" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                </svg>
              </button>
              <div class="dropdown-menu">
                <button @click="ClickUpdate" type="button" class="btn btn-link dropdown-item" title="수정"> 
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                  </svg>
                </button>
                <div class="dropdown-divider"></div>
                <button @click="commentDelete" type="button" class="btn btn-link dropdown-item" title="삭제">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </button>
              </div>
            </div>
          </td>
        </tr>
        <tr v-else class="row">
          <td class="col">댓글:</td>
          <td class="col-9"><input type="text" name="" id="cmmt" class="comment-update-form" v-model="update_comment" @keypress.enter="sendUpdatedComment"></td>
          <td class="col">
            <button type="button" @click="sendUpdatedComment" class="btn btn-link" title="수정하기">
              <svg width="1.7em" height="1.7em" viewBox="0 0 16 16" class="bi bi-check-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

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
    goProfile () {
      this.$router.push({ name: "Profile", query:{ userId: this.comment.user}});
    },
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
  .comment-box {
    text-align: left;
  }
  .comment-update-form {
    width: 100%
  }
  .comment-table {
    color: black;
  }
  .hor-center {
    display: flex;
    align-items: center;
  }
</style>