<template>
  <div class="container">
    <div v-if="revied" class="review-show">
      <h1>Review Detail</h1>
      <hr />
      <div class="review-movietitle">
        <h3>{{ movietitle }}</h3>
      </div>
      <div class="review-title">
        <h3>{{ title }}</h3>
      </div>
      <div class="review-U-D">
        <input
          @click="delete_review"
          class="btn-btn"
          type="button"
          value="delete"
        />
        <input
          @click="change_updated_state"
          class="btn-btn"
          type="button"
          value="update"
        />
      </div>
      <div class="review-contents">
        <p>내용 : {{ content }}</p>
        <h5>평점: {{ rank }}</h5>
        <p>작성일: {{ created_at }}</p>
        <hr />
      </div>
    </div>
    <div v-else class="movie-update">
      <form class="review-form" @submit="updateReview">
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
        <!-- <input type="number" name="rank" id="rank" maxlength="10"> -->
        <button>제출하기</button>
      </form>
      <button @click="backtodetail">back</button>
    </div>
    <CommentForm @addComment="AddComment" :review_id="review_id" />

    <div>
      <h4>댓글</h4>
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
      review_id: "",
      reviews: [],
      // review : {},
      addcomment: {},
      comments: [],
      revied: true,
      updated_movietitle: "",
      updated_title: "",
      updated_content: "",
      updated_rank: "",
    };
  },
  name: "ReviewDetail",
  methods: {
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
      this.comments.push(comment);
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
          this.comments = res.data;
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
  computed: {},
  created() {
    this.review_pk();
    this.getComment();
    this.getReviews();
  },
  mounted() {
    this.getComment();
  },
};
</script>

<style>
.comment_list {
  list-style: none;
  /* border-bottom: rgb(141, 136, 136) solid;
  font-size: 20px; */
}
</style>