<template>
  <tr>
    <td>{{ makeIdx }}</td>
    <td class="title-click" @click="OnClick">{{ review.title }}</td>
    <td>{{review.rank}}</td>
    <td class="title-click" @click="OnclickUser">{{review.user}}</td>
    <td>{{review.created_at}}</td>
  </tr>
</template>

<script>
export default {
props: {
  review: Object,
  idx: Number,
},
methods: {
  OnclickUser(){
    this.$router.push({name: 'Profile', query:{ userId: this.review.user }})
  },
  OnClick() {
    this.$router.push({name: 'ReviewDetail', query: {...this.review}})
  },
},
computed: {
  makeIdx(){
    // console.log(this.review)
    return this.idx + 1
  },
}
}
</script>

<style>
.title-click{
  cursor: pointer;
}
</style>