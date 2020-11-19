<template>
  <div>
    <form @submit="addComment">
      <label for="comment">댓글: </label>
      <input type="text" name="" id="comment" v-model="comment">
      <button>+</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    review_id: String,
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
      }).catch((err)=>{
        console.error(err)
      })
    },
  }

}
</script>

<style>

</style>