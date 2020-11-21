<template>
  <div>
    <form @submit="addReview">
      <label for="title">제목 : </label>
      <input type="text" id="title" size="98" v-model.trim="title"> <br>
      <label for="content">내용 : </label>
      <textarea name="content" cols="100" rows="10" id="content" v-model.trim="content"></textarea> <br>
      <label for="rank">평점 : </label>
      <select name="" id="" v-model="rank">
        <option value= 0>0</option>
        <option value= 1>1</option>
        <option value= 2>2</option>
        <option value= 3>3</option>
        <option value= 4>4</option>
        <option value= 5>5</option>
      </select> <br>
      <!-- <input type="number" name="rank" id="rank" maxlength="10"> -->
      <button>제출하기</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
data() {
  return {
    title : '',
    content: '',
    rank: '',
  }
},
methods: {
  addReview(event) {
    event.preventDefault()
    axios({
      url:'http://127.0.0.1:8000/community/',
      method: 'POST',
      data: {
        title: this.title,
        content: this.content,
        rank: this.rank
      },
      headers: {
        Authorization: `JWT ${localStorage.getItem('jwt')}`
      },
    }).then((res)=>{
      console.log(res.data)
      this.$emit('addReview', res.data)
      this.$router.push({name: 'ReviewList' })
    }).catch((err)=>{
      console.error(err)
    })
    
  }
},

}
</script>

<style>

</style>