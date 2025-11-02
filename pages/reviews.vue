<template lang="pug">
.reviews
  .reviews__wrapper.shadow-mask-top-bottom.container
    h1.reviews__title.h2.text-border(:class="[$style.title]") Отзывы наших клиентов
    app-breadcrumbs(:specs="breadcrumbs" :class="[$style.breadcrumb]" )
    div.reviews__chapter(v-for="chapter in chapters")
      template(v-if="chapter.reviews.length")
        .d-flex.mt-6
          h3 {{ chapter.name }}
          a.cases__btn.btn.btn--black.ml-a(:href="chapter.url", target="_blank")
            .text Посмотреть все
        .reviews__grid
          app-review(v-for="review in chapter.reviews" :review="review" :key="review.id")
</template>

<script>
import Metatags from '~/mixins/metatags';
import AppReview from '../components/app/AppReview.vue';
import AppBreadcrumbs from '~/components/app/AppBreadcrumbs.vue';

export default {
  components: {
    AppReview,
    AppBreadcrumbs,
  },
  mixins: [Metatags],
  async asyncData({ $api }) {
      const [data, chapters] = await Promise.all([
        $api.metatags(),
        $api.reviewSources.list({ is_active: true }),
      ]);
      return { data, chapters };
  },

  data() {
    return {
      breadcrumbs: [
        {
          url: '/',
          name: 'Главная',
          isActive: true,
        },
        {
          url: '/reviews/',
          name: 'Отзывы',
        },
      ],
    };
  },
}
</script>

<style lang="scss" module>
.breadcrumb {
  padding-top: 0;
  margin: 0;
}

.title {
  margin-bottom: 16px;
}
</style>
