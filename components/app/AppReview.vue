<template lang="pug">
.review
  .review__bubble
    .review__rating
      app-icon(v-for="_ in review.rating" :key="_" name-icon="nav-star")
    p {{ review.text }}
  .review__bubble-tail(style="border-color: #e8e8e8 transparent transparent #e8e8e8;")
  .review__author {{ review.author }}
</template>
<script>
export default {
  props: {
    review: {
      text: String,
      author: String,
      rating: Number,
    },
  },
}
</script>