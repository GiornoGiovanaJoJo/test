<template>
  <div class="team__item">
    <div class="team__item-img-wrapper">
      <img
        class="team__item-img"
        :src="item.avatar || require('~/assets/img/placeholder.png')"
        alt="team"
      />
    </div>

    <div class="team__item-title">
      {{ item.name }}
    </div>

    <div class="team__item-post">
      {{ item.position }}
    </div>

    <div class="team__item-works">
      {{ item.count_jobs }} работы
    </div>

    <nuxt-link
      class="team__item-btn btn btn--black"
      :to="{ name: 'team-member-id', params: { id: item.slug } }"
    >
      <span class="decor">
        <app-icon name-icon="play2" />
      </span>

      <span class="text">
        Подробнее
      </span>

      <span class="decor">
        <app-icon name-icon="play2" />
      </span>
    </nuxt-link>
  </div>
</template>

<script>
import AppIcon from '~/components/app/AppIcon';

export default {
  name: 'TeamItem',

  components: {
    AppIcon,
  },

  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.team__item-title {
  word-break: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 48px;

  @include max-w-md {
    height: auto;
  }
}

.team__item-post {
  height: 21px;
  @include max-w-md {
    height: auto;
  }
}
</style>
