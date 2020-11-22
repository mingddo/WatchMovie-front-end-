<template>
  <tr>
    <td>{{ makeIdx }}</td>
    <td @click="OnClick">{{ review.title }}</td>
    <td>{{review.rank}}</td>
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

</style>