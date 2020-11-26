<template>
  <div class="recommend-box-frame">
    <div class="recommed-username">
      <p class="recommend">{{ user.username }}님, 이런 영화는 어떠신가요?</p>
    </div>

    <div class="recommend-video embed-responsive embed-responsive-16by9">
      <iframe
        class="embed-responsive-item"
        allow="autoplay;"
        width="560"
        height="315"
        :src="`${recommendMovieData.video}?autoplay=1&loop=1&autopause=0`"
        frameborder="0"
      ></iframe>
    </div>
    <div class="recommend-box-content">
      <div class="recommend-text">
        <div class="rexommend-title gugi-font">
          <h2>{{ recommendMovieData.title }}</h2>
          <div class="video-sign">
            <div v-if="recommendMovieData.adult" title="미성년관람불가">🔞</div>
            <div v-else title="미성년관람가능">⭕</div>
          </div>
        </div>
        <h6 class="noto-sans-font">{{ recommendMovieData.release_date }}</h6>
      </div>
      <p class="rexommend-text nanum-gothic-font">
        {{ recommendMovieData.overview }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommendMovieData: Object,
    user: Object,
  },
};
</script>

<style>
.rexommend-text {
  width: 100%;
  margin: auto;
  word-break: keep-all;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; 
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.8em;
  height: 5.4em;
}
.recommend-video {
  width: 70%;
  height: auto;
  margin-bottom: 2rem;
}
.video-sign {
  font-size: 2rem;
  margin: 0, 1rem;
}
.recommed-username {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.1rem;
  margin: 1rem 1rem;
}
.recommend-box-frame {
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.rexommend-title {
  text-align: left;
  width: 80%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
}
.recommend {
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0.5rem;
  text-align: left;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 700;
}
.recommend-box-content {
  color: white;
  width: 80%;
  height: 80%;
  margin: 0 auto;
}

.recommend-text {
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1.5rem;
  margin:1.5 auto;
}
.recommend-text p {
  border: none;
  font-size: 30px;
}
</style>