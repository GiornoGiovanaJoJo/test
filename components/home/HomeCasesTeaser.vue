<template lang="pug">
.teaser
    .teaser__wrapper.container.mt-16.mt-sm-0
        .teaser__title
            .teaser__title.h2.text-border.flex-center Наши работы
              nuxt-link.cases__btn.btn.btn--black.ml-3(:to="{ name: 'portfolio' }")
                .text Посмотреть все
        .teaser__body
            .cases__right-list
                .cases__tab.tabs__item.active
                    cases-item(
                        v-for="item in jobs"
                        :key="item.id"
                        :item="item"
                      )
</template>
<script>
import CasesItem from '~/components/cases/CasesItem';

export default {
  name: 'HomeCasesTeaser',
  props: {
    jobs: {
      type: Array,
      default: () => [],
    },
  },
  components: { CasesItem },
}
</script>
<style lang="scss" scoped>
.teaser__body {
  max-width: 1000px;
  margin-top: 28px;
  align-self: center;
}
.cases__right-list {
  padding-bottom: 0;
}
.teaser__wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: calc(var(--top-padding-section) + var(--top-padding-wrapper));
  overflow: hidden;

  @include max-w-md {
    height: auto;
  }
}
</style>
