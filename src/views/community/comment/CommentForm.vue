<template>
  <div>
    <form class="comment-form" @submit="addComment">
      <label for="comment">댓글</label>
        <input
          type="text"
          id="comment"
          class="form-control w-100 comment-place"
          v-model.trim="comment"
          aria-describedby="passwordHelpBlock"
        />

      <button>+</button>
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
  width: 60%;
  height: auto;
  margin-left: auto;
  margin-right: auto;

}
.comment-place{
  margin: auto;
}
</style>