<template>
  <div class="container review-movietitle">
    <div v-if="revied" class="review-show bg-gray">
      <div>
        <div class="btn-group dropright color-lightgray">
          <button type="button" class="btn btn-link dropdown-toggle d-flex color-lightgray" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <h1 class="gugi-font color-lightgray">{{ movietitle }}</h1>
          </button>
          <div class="dropdown-menu">
            <a @click="searchThisMovie" class="dropdown-item d-flex justify-content-center color-lightgray" href="#">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
              </svg>
            </a>
            <a @click="addWishMovie" class="dropdown-item d-flex justify-content-center" :class="{disabled : !this.canIwish}" href="#">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg>
            </a>
          </div>
        </div>

        <h6>{{ starRank }}</h6>
        <div class="d-flex">
          <button type="button" class="btn btn-link" title="프로필로 이동" @click="goProfile">
            <svg width="1.7em" height="1.7em" viewBox="0 0 16 16" class="bi bi-person-square color-purple" fill="lightgray" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
              <path fill-rule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>
          </button>
          <p>{{reviewUsername}}</p>
        </div>
      </div>
      <hr>
      <div>
        <div class="review-title">
          <h3 class="nanum-gothic-font"><b>{{ title }}</b></h3>
        </div>
        <div class="review-U-D" v-if="this.nowUser == this.reviewUser">
          <div class="btn-group purple" title="수정 및 삭제">
            <button type="button" class="btn btn-link dropdown-toggle dropdown-toggle-split color-lightgray" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-justify" fill="lightgray" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
            <div class="dropdown-menu">
              <button @click="change_updated_state" type="button" class="btn btn-link dropdown-item" title="수정"> 
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="black" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
              </button>
              <div class="dropdown-divider"></div>
              <button @click="delete_review" type="button" class="btn btn-link dropdown-item" title="삭제">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="black" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="review-contents-all">
        <div class="review-content">
          <p class="nanum-gothic-font" v-html="contentHaveIndentation"></p>
        </div>
        <div class="review-created-at">
          <i>작성일자: {{ created_at }}</i><br>
          <i>수정일자: {{ updated_at }}</i>
        </div>
        <hr>
      </div>
    </div>

    <div v-else class="movie-update">
      <div class="review-form">
      <div class="movietitle-input">
        <input title="영화명" placeholder="영화명을 입력해주세요" type="text" id="movietitle" class="form-control" v-model.trim="updated_movietitle" aria-describedby="passwordHelpBlock">
      </div>
      <br>
      <div class="title-input">
        <input title="리뷰 제목" placeholder="리뷰 제목을 입력해주세요" type="text" id="title" class="form-control" v-model.trim="updated_title" aria-describedby="passwordHelpBlock"> 
      </div>
      <br>
      <div class="content-input">
        <textarea title="리뷰 내용" placeholder="내용을 입력해주세요" name="content" class="form-control" cols="100" rows="10" id="content" v-model.trim="updated_content"></textarea>
      </div>
      <br>
      <div class="rank-input" title="평점">
        <select id="rank" class="custom-select custom-select-lg mb-3" placeholder="RANK" v-model="updated_rank">
          <option selected>Rank</option>
          <option value= 1>1</option>
          <option value= 2>2</option>
          <option value= 3>3</option>
          <option value= 4>4</option>
          <option value= 5>5</option>
        </select>
      </div>
        <br>
        <div class="d-flex justify-content-around">
          <button @click="backtodetail" class="btn btn-lg btn-link" title="뒤로가기">
            <svg width="1.7em" height="1.7em" viewBox="0 0 16 16" class="bi bi-arrow-left-square-fill" fill="lightgray" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm9.5 8.5a.5.5 0 0 0 0-1H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5z"/>
            </svg>
          </button>
          <button @click="updateReview" class="btn btn-lg btn-link" title="수정하기">
            <svg width="1.7em" height="1.7em" viewBox="0 0 16 16" class="bi bi-check-square-fill" fill="lightgray" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <CommentForm v-if="revied" @addComment="AddComment" :review_id="review_id" />
  <br>
    <div v-if="revied">
      <div class="comment-box">
        <CommentItem
          @send_updated_commentID="send_updated_commentID"
          @deleteComments="deleteComments"
          v-for="comment in comments"
          :comments="comments"
          :key="comment.id"
          :comment="comment"
          :review_id="review_id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
// import _ from 'lodash';
import CommentForm from "./comment/CommentForm.vue";
import CommentItem from "./comment/CommentItem.vue";

export default {
  components: {
    CommentForm,
    CommentItem,
  },
  data() {
    return {
      movietitle: "",
      title: "",
      content: "",
      rank: "",
      created_at: "",
      updated_at: "",
      review_id: "",
      reviews: [],
      review : {},
      addcomment: {},
      comments: [],
      canIseeAllComment : false,
      someComment : [],
      revied: true,
      updated_movietitle: "",
      updated_title: "",
      updated_content: "",
      updated_rank: "",
      updated: false,
      user: '',
      wishMovie: '',
      wishMovieId: '',
      canIwish: true,
      nowUser: '',
      reviewUser: '',
      reviewUsername: '',
    };
  },
  name: "ReviewDetail",
  methods: {
    goProfile () {
      this.$router.push({name: 'Profile', query:{ userId: this.reviewUser }})
    },
    getUsername () {
      axios({
        url: `http://127.0.0.1:8000/accounts/${this.reviewUser}/`,
        method: 'GET',
        headers: {
          Authorization: `JWT ${localStorage.getItem('jwt')}`
        },
      })
      .then((res) => {
        console.log(res.data)
        this.reviewUsername = res.data.username
      })
    },
    getNowUser () {
      this.nowUser = VueJwtDecode.decode(localStorage.getItem("jwt")).user_id
      console.log('넌 뭐니',this.reviewUser)
      console.log('넌 뭐니',this.nowUser)
    },
    searchThisMovie () {
      const keyword = this.movietitle
      axios.get(`http://127.0.0.1:8000/movies/search/${keyword}/`, )
      .then((res) => {
        console.log(res.data)
        this.$router.push({ name: "SearchList", query: { searchMovie: res.data, inputMovie : this.movietitle }, });
      })
      .catch((err) => {
        console.log(err)
      })
    },
    movieDetail (wish) {
      axios({
        url: `https://api.themoviedb.org/3/search/movie?query=${wish.title}&api_key=8891da6c530f993ba51066b80edfa91d&language=ko-kr`,
        method: 'GET',
      })
      .then((res) => {
        let found = false
        for (const result of res.data.results) {
          console.log('결과는?', result)
          if (wish.title === result.title) {
            this.wishMovieDetail = result
            found = true
            console.log('찾았다!', found)
            break
          }
          if (!found) {
            this.wishMovieDetail = res.data.results[0]
          }
        } 
        console.log(res.data.results)
        this.$router.push({name: "MovieDetail", query: {...this.wishMovieDetail, poster_path:`https://image.tmdb.org/t/p/w500${this.wishMovieDetail.poster_path}`}})
      })
    },
    addWishMovie(){
      axios({
        url: `https://api.themoviedb.org/3/search/movie?query=${this.movietitle}&api_key=8891da6c530f993ba51066b80edfa91d&language=ko-kr`,
        method: 'GET',
      })
      .then((res) => {
        console.log('뭐냠 ',res.data)
        if (res.data.results.length == 0) {
          alert('유효하지 않은 영화 제목입니다!')
        } else {
          let found = false
          for (const result of res.data.results) {
            if (this.movietitle === result.title) {
              this.wishMovie = result.title
              this.wishMovieId = result.id
              found = true
              break
          }
          if (!found) {
            this.wishMovie = res.data.results[0].title
            this.wishMovieId = res.data.results[0].id
          }
        }
        this.user = VueJwtDecode.decode(localStorage.getItem("jwt"))
        }
                  axios({
          url: `http://127.0.0.1:8000/accounts/${this.user.user_id}/wishmovie/`,
          method: "POST",
          data:{
            title: this.wishMovie,
            num: this.wishMovieId,
          },
          headers: {
            Authorization: `JWT ${localStorage.getItem("jwt")}`,
          },
          })
          .then(()=>{
          // console.log('됏니?', res.data)
          alert(`위시리스트에 ${this.wishMovie} 이(가 추가되었습니다`)
          this.canIwish = false
          })
          .catch((err) => {
            alert('이미 추가된 영화입니다!')
            this.canIwish = false
            console.log(err)
        })
      })
      .catch((err) => {
        console.log(err)
      })
    },
    backtodetail(){
      this.revied = true
    },
    change_updated_state() {
      this.revied = false;
      this.updated_movietitle = this.movietitle
      this.updated_title = this.title
      this.updated_content = this.content
      this.updated_rank = this.rank
    },
    updateReview(event) {
      event.preventDefault();
      axios({
        url: `http://127.0.0.1:8000/community/${this.review_id}/`,
        method: "PUT",
        data: {
          movie_title: this.movietitle,
          title: this.title,
          content: this.content,
          rank: this.rank,
        },
        headers: {
          Authorization: `JWT ${localStorage.getItem("jwt")}`,
        },
      })
        .then((res) => {
          console.log(res.data);
          this.movietitle = this.updated_movietitle 
          this.title = this.updated_title
          this.content = this.updated_content
          this.rank = this.updated_rank
          this.updated_at = res.data.updated_at
          this.revied = true;

          
          // this.$emit('addReview', res.data)
          // this.$router.push({name: 'ReviewList' })
        })
        .catch((err) => {
          console.error(err);
        });
    },
    send_updated_commentID(updatedCommnet) {
      this.comments = this.comments.map((cmt) => {
        if (cmt.id === updatedCommnet.id) {
          return updatedCommnet;
        } else {
          return cmt;
        }
      });
    },
    deleteComments(idx) {
      this.comments.splice(idx, 1);
    },
    AddComment(comment) {
      this.comments.unshift(comment);
      // console.log('푸쉬 ok', comment)
    },
    getComment() {
      axios({
        url: `http://127.0.0.1:8000/community/${this.review_id}/comment/`,
        method: "GET",
        headers: {
          Authorization: `JWT ${localStorage.getItem("jwt")}`,
        },
      })
        .then((res) => {
          // console.log(res.data)
          // this.comments = _.sortBy(res.data, res.data.id).reverse()
          this.comments = res.data
          console.log(this.comments)
        })
        .catch((err) => {
          console.error(err);
        });
    },
    review_pk() {
      this.review_id = this.$route.query.id;
      this.title = this.$route.query.title;
      this.content = this.$route.query.content;
      this.rank = this.$route.query.rank;
      this.created_at = this.$route.query.created_at;
      this.updated_at = this.$route.query.updated_at;
      this.movietitle = this.$route.query.movie_title;
      this.reviewUser = this.$route.query.user;
      
      // this.review = {id:this.$route.query.id, title: this.$route.query.title, content: this.$route.query.content,
      // rank: this.$route.query.rank, created_at:  this.$route.query.created_at }
      // console.log(this.review_id)
      // console.log('review다',this.review)
    }, 
    getReviews() {
      axios({
        url: "http://127.0.0.1:8000/community/",
        method: "GET",
        headers: {
          Authorization: `JWT ${localStorage.getItem("jwt")}`,
        },
      })
        .then((res) => {
          console.log('리뷰', res.data)
          this.reviews = res.data;
          console.log('이 유저는', this.user)
        })
        .catch((err) => {
          console.error(err);
        });
    },
    delete_review() {
      const confirm = window.confirm('정말로 삭제하시겠습니까?')
      if (confirm == true) {
      axios({
        url: `http://127.0.0.1:8000/community/${this.review_id}/`,
        method: "DELETE",
        headers: {
          Authorization: `JWT ${localStorage.getItem("jwt")}`,
        },
      })
        .then((res) => {
          console.log(res.data);
          this.$router.push({ name: "ReviewList" });
        })
        .catch((err) => {
          console.error(err);
        });
    }},
  },
  computed: {
    starRank () {
      if (this.rank == 1) {
        return '⭐' 
      } else if (this.rank == 2) {
        return '⭐⭐'
      } else if (this.rank == 3) {
        return '⭐⭐⭐'
      } else if (this.rank == 4) {
        return '⭐⭐⭐⭐'
      } else {
        return '⭐⭐⭐⭐⭐'
      }
    },
    contentHaveIndentation () {
      return this.content.split('\n').join('<br>')
    },
  },
  created() {
    this.review_pk();
    this.getComment();
    this.getReviews();
    this.getNowUser();
    this.getUsername();
  },
  mounted() {
    this.getComment();
  },
  }
</script>

<style>
.dropdown-size {
  width: 20px;
}
.comment_list {
  list-style: none;
  /* border-bottom: rgb(141, 136, 136) solid;
  font-size: 20px; */
}
.review-content {
  text-align: left;
  min-height: 5rem;
}
.review-movietitle {
  border-radius: 10px;
  padding: 3rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: white
}
.review-created-at {
  text-align: right;
  color : gray;
}
.review-U-D {
  text-align: right;
}
.color-lightgray {
  color: lightgray;
}
</style>