<template>
  <div class="review-place">
    <form class="review-form" @submit="addReview">
      <div class="movietitle-input d-flex row">
        <label for="movietitle" class="col">영화 :</label>
        <input type="text" id="movietitle" class="form-control col-lg-10 col-md-8 col-sm-6 col-4" v-model.trim="movietitle" aria-describedby="passwordHelpBlock">
      </div>
      <br>
      <div class="title-input d-flex row">
        <label for="title" class="col">제목 :</label>
        <input type="text" id="title" class="form-control col-lg-10 col-md-8 col-sm-6 col-4" v-model.trim="title" aria-describedby="passwordHelpBlock"> 
      </div>
      <br>
      <div class="content-input d-flex row">
        <label for="content" class="col">내용 :</label>
        <textarea name="content" class="form-control col-lg-10 col-md-8 col-sm-6 col-4" cols="100" rows="10" id="content" v-model.trim="content"></textarea>
      </div>
      <br>
      <div class="rank-input d-flex row">
        <label for="rank" class="col">평점 : </label>
        <select id="rank" class="custom-select custom-select-lg mb-3 col-lg-10 col-md-8 col-sm-6 col-4" placeholder="RANK" v-model="rank">
          <option selected>Rank</option>
          <option value= 1>1</option>
          <option value= 2>2</option>
          <option value= 3>3</option>
          <option value= 4>4</option>
          <option value= 5>5</option>
        </select>
      </div>
    
      <!-- <input type="number" name="rank" id="rank" maxlength="10"> -->
      <button @click="allow" class="btn btn-lg btn-link" title="작성하기">
        <svg width="1.7em" height="1.7em" viewBox="0 0 16 16" class="bi bi-check-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
        </svg>
      </button>
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
.movie-title-input {
  
}
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