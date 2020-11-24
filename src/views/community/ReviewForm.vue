<template>
  <div class="review-place">
    <form class="review-form" @submit="addReview">
      <label for="movietitle">영화제목</label>
      <input type="text" id="movietitle" class="form-control w-100" v-model.trim="movietitle" aria-describedby="passwordHelpBlock">
      <label for="title">제목</label>
      <input type="text" id="title" class="form-control w-100" v-model.trim="title" aria-describedby="passwordHelpBlock">
      <label for="content">내용 : </label>
      <textarea name="content" class="form-control" cols="100" rows="10" id="content" v-model.trim="content"></textarea> <br>
      <label for="rank">평점 : </label>
      <select id="rank" class="custom-select custom-select-lg mb-3" placeholder="RANK" v-model="rank">
        <option selected>Rank</option>
        <option value= 1>1</option>
        <option value= 2>2</option>
        <option value= 3>3</option>
        <option value= 4>4</option>
        <option value= 5>5</option>
      </select>
      
      

      <!-- <input type="number" name="rank" id="rank" maxlength="10"> -->
      <button @click="allow">제출하기</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      movietitle : '',
      title : '',
      content: '',
      rank: '',
      canIgo: false,
    }
  },
  methods: {
    addReview(event) {
      event.preventDefault()
      axios({
        url:'http://127.0.0.1:8000/community/',
        method: 'POST',
        data: {
          movie_title: this.movietitle,
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
      
    },
    allow () {
      if (this.movietitle == '') {
        alert ('영화명을 입력해주세요')
      } else if (this.title == '') {
        alert ('제목을 입력해주세요')
      } else if (this.content == '') {
        alert ('내용을 입력해주세요')
      } else if (this.rank == '') {
        alert ('평점을 입력해주세요')
      } else {
        this.canIgo = true
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.canIgo) {
      next ()
    } else {
      const answer = window.confirm('데이터가 저장되지 않았습니다. 페이지를 나가시겠습니까?')
      if (answer) {
        next ()
      } else {
        next(false)
      }
    }
  }
}
</script>

<style>
.review-form{
  width: 60%;
  height: auto;
  margin-left: auto;
  margin-right: auto;

}
.review-place{
  margin: auto;
}
/* textarea {
  width: 100%;
  height: auto;
  padding: 10px;
  box-sizing: border-box;
  border: solid 2px #1E90FF;
  border-radius: 5px;
  font-size: 16px;
  resize: both;
} */
</style>