<template lang="pug">
.reviews-teaser
  .reviews-teaser__wrapper.container
    .reviews-teaser__title.h2.text-border.flex-center Отзывы о нас
      nuxt-link.btn.btn--black.ml-3(:to="{ name: 'reviews' }")
        .text Посмотреть все
    .reviews-teaser__body
      app-review(v-for="review in reviews" :review="review" :key="review.id")
</template>

<script>
import AppReview from '../app/AppReview.vue';

export default {
  components: {
    AppReview,
  },
  props: {
    reviews: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      swiperOptions: {
        autoHeight: true,
        allowTouchMove: false,
        autoplay: {
          delay: 2500,
        },
        direction: 'vertical',
        loop: true,
        slidesPerView: 1,
      },
    }
  },
}
</script>
<style>
.wrapper-review {
  max-width: max(50%, 500px);
  padding-bottom: 30px;
  margin-inline: auto;
}
</style>
