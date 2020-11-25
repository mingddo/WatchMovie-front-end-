<template>
  <div class="container">
    <div v-if="revied" class="review-show review-movietitle bg-yellow black-font">
      <div>
        <div class="btn-group dropright">
          <button type="button" class="btn btn-link dropdown-toggle d-flex" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <h1 class="gugi-font">{{ movietitle }}</h1>
          </button>
          <div class="dropdown-menu">
            <a @click="searchThisMovie" class="dropdown-item d-flex justify-content-center" href="#">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
              </svg>
            </a>
            <a @click="addWishMovie" class="dropdown-item d-flex justify-content-center" href="#">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg>
            </a>
          </div>
        </div>

        <h6>{{ starRank }}</h6>
      </div>
      <hr>
      <div>
        <div class="review-title">
          <h3 class="nanum-gothic-font"><b>{{ title }}</b></h3>
        </div>
        <div class="review-U-D">
          <div class="btn-group" title="수정 및 삭제">
            <button type="button" class="btn btn-link dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <svg width="1.7em" height="1.7em" viewBox="0 0 16 16" class="bi bi-justify" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
            <div class="dropdown-menu">
              <button @click="change_updated_state" type="button" class="btn btn-link dropdown-item" title="수정"> 
                <svg width="1.7em" height="1.7em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
              </button>
              <div class="dropdown-divider"></div>
              <button @click="delete_review" type="button" class="btn btn-link dropdown-item" title="삭제">
                <svg width="1.7em" height="1.7em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
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
        <label for="movietitle">영화제목</label>
        <input
          type="text"
          id="movietitle"
          class="form-control w-100"
          v-model.trim="updated_movietitle"
          aria-describedby="passwordHelpBlock"
        />
        <label for="title">제목</label>
        <input
          type="text"
          id="title"
          class="form-control w-100"
          v-model.trim="updated_title"
          aria-describedby="passwordHelpBlock"
        />
        <label for="content">내용 : </label>
        <textarea
          name="content"
          class="form-control"
          cols="100"
          rows="10"
          id="content"
          v-model.trim="updated_content"
        ></textarea>
        <br />
        <label for="rank">평점 : </label>
        <select
          id="rank"
          class="custom-select custom-select-lg mb-3"
          placeholder="RANK"
          v-model="updated_rank"
        >
          <option selected>Rank</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <br />

        <button @click="updateReview">제출하기</button>
      </div>
      <button @click="backtodetail">back</button>
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
    };
  },
  name: "ReviewDetail",
  methods: {
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
    addWishMovie(){
      axios({
        url: `https://api.themoviedb.org/3/search/movie?query=${this.movietitle}&api_key=8891da6c530f993ba51066b80edfa91d`,
        method: 'GET',
      })
      .then((res) => {
        console.log(res.data.results[0])
        this.wishMovie = res.data.results[0].title
        this.wishMovieId = res.data.results[0].id
        this.user = VueJwtDecode.decode(localStorage.getItem("jwt"));
        // console.log('유저는', this.user)
        // console.log(this.wishMovie)
        // console.log(this.wishMovieId)
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
      }).then(()=>{
        // console.log('됏니?', res.data)
        alert(`위시리스트에 ${this.wishMovie}가 추가되었습니다`)

      })
      })
      .catch((err) => {
        console.error(err)
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
          console.log('넌 뭐니',this.review)
          
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
          // console.log(res.data)
          this.reviews = res.data;
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
  min-height: 100px;
}
.review-movietitle {
  border-radius: 30px;
  padding:10px;
  margin: 10px;
}
.review-created-at {
  text-align: right;
  color : gray;
}
.review-U-D {
  text-align: right;
}
.border-light {
  border-color:lightgrey;
}
.bg-yellow {
  background-color: #F7D949;
}
.black-font {
  color:black;
}
</style>