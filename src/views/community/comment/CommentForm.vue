<template>
  <div>
    <form class="comment-form d-flex" @submit="addComment">
      <label for="comment" title="댓글">
        <svg width="1.7em" height="1.7em" viewBox="0 0 16 16" class="bi bi-chat-right-dots" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M2 1h12a1 1 0 0 1 1 1v11.586l-2-2A2 2 0 0 0 11.586 11H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
          <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
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
      <button @click="addComment" type="button" class="btn btn-link">
        <svg width="1.7em" height="1.7em" viewBox="0 0 16 16" class="bi bi-plus-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
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