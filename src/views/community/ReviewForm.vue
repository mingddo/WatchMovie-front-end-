<template>
  <div class="review-place">
    <div class="review-page-title-form">
      <p class="review-page-title">Review 작성</p>
    </div>
    <form class="review-form review-movietitle" @submit="addReview">
      <div class="movietitle-input">
        <input v-if="this.$route.query" title="영화명" value="{this.$route.query.movietitle}" placeholder="영화명을 입력해주세요" type="text" id="movietitle" class="form-control" v-model.trim="this.$route.query.movietitle" aria-describedby="passwordHelpBlock">
        <input v-else title="영화명" value="{this.$route.query.movietitle}" placeholder="영화명을 입력해주세요" type="text" id="movietitle" class="form-control" v-model.trim="movietitle" aria-describedby="passwordHelpBlock">
      </div>
      <br>
      <div class="title-input">
        <input title="리뷰 제목" placeholder="리뷰 제목을 입력해주세요" type="text" id="title" class="form-control" v-model.trim="title" aria-describedby="passwordHelpBlock"> 
      </div>
      <br>
      <div class="content-input">
        <textarea title="리뷰 내용" placeholder="내용을 입력해주세요" name="content" class="form-control" cols="100" rows="10" id="content" v-model.trim="content"></textarea>
      </div>
      <br>
      <div class="rank-input" title="평점">
        <select id="rank" class="custom-select custom-select-lg mb-3" placeholder="RANK" v-model="rank">
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
        <svg width="1.7em" height="1.7em" viewBox="0 0 16 16" class="bi bi-check-square-fill" fill="lightgray" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
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
.review-page-title{
  font-size: 3rem;
  text-align: left;
  width: 100%;
}
.review-page-title-form{
  width: 60%;
  margin: 3rem auto;
}
.review-form{
    border-radius: 10px;
  width: 60%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(0, 0, 0, 0.3);
    color: white;

}
.review-place{
  margin: auto;
  position: absolute;
  top: 250px;
  align-self: center;
  width: 85%;
  height: 100%;
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