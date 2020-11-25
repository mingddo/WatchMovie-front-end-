<template>
  <div>
    <form class="comment-form d-flex" @submit="addComment">
      <label for="comment" title="댓글">
        <svg width="1.7em" height="1.7em" viewBox="0 0 16 16" class="bi bi-chat-right-text-fill" fill="lightgray" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2zM3.5 3a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
        </svg>
      </label>
        <input
          type="text"
          id="comment"
          placeholder="댓글을 입력해주세요"
          class="form-control comment-place"
          v-model.trim="comment"
          aria-describedby="passwordHelpBlock"
        >
      <button @click="addComment" type="button" class="btn btn-link" title="댓글 등록">
        <svg width="1.7em" height="1.7em" viewBox="0 0 16 16" class="bi bi-plus-square-fill" fill="lightgray" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
        </svg>
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    review_id: [Number, String]
  },
  data() {
    return {
      comment: '',
    }
  },
  methods: {
    addComment() {
      event.preventDefault()
      axios({
        url: `http://127.0.0.1:8000/community/${this.review_id}/comment/`,
        method: 'POST',
        data: {
          content: this.comment,
        },
        headers: {
        Authorization: `JWT ${localStorage.getItem('jwt')}`
      },
      }).then((res)=>{
        console.log(res.data)
        this.$emit('addComment', res.data)
      }).catch((err)=>{
        console.error(err)
      })
      this.comment = ''
    },
  }

}
</script>

<style>
.comment-form{
  
  height: auto;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
}
.comment-place{
  width: 90%;
  margin: auto;
}
</style>