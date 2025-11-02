<template lang="pug">
section.member
  .member__wrapper
    .container
      .row.member__scroll-wrapper.shadow-mask-top-bottom
        .col-12.col-md-4.mt-md-n4
          .pb-md-4.pt-md-4
            app-back(title="Назад к команде" :route="{ name: 'team' }" :class="[$style.back]")
            app-breadcrumbs(:specs="breadcrumbs" :class="[$style.breadcrumb]" )
            .member__avatar-wrapper
              img.member__avatar(:src="performer.avatar || require('~/assets/img/placeholder.png')" alt="avatar")
            h1.member__name.h4  {{ performer.name }}
            .member__post {{ performer.position }}
            .member__block-title Опыт
            .member__text(v-html="performer.describe")
        .col-12.col-md-8.mt-md-n4(:class="[$style.second]")
          .pb-md-4.pt-md-4
            h2.text-border Работы ({{ performer.count_jobs }}):
            .row
              .col-12.col-md-6(v-for="item in performer.perform_jobs" :key="item.id")
                cases-item(:item="item" :class="$style.casesItem")
</template>

<script>
import AppBack from '~/components/app/AppBack';
import CasesItem from '~/components/cases/CasesItem';
import Metatags from '~/mixins/metatags';
import AppBreadcrumbs from '~/components/app/AppBreadcrumbs.vue'

export default {
  name: 'PageTeamMemberId',
  layout: 'decor',
  components: {
    AppBack,
    CasesItem,
    AppBreadcrumbs,
  },
  mixins: [Metatags],
  async asyncData({ $api, error, route }) {
    try {
      const [data, performer] = await Promise.all([
        $api.metatags(),
        $api.performer.view(route.params.id, { is_active: true })
      ]);
      return { data, performer };
    } catch (e) {
      if (e.response?.status === 404) {
        return error({ statusCode: 404, message: 'Страница не найдена' });
      }
      throw e;
    }
  },

  data() {
    return {
      performer: [],
    }
  },

  computed: {
    breadcrumbs() {
      return [
        {
          url: '/',
          name: 'Главная',
          isActive: true,
        },
        {
          url: '/team/',
          name: 'Команда',
          isActive: true,
        },
        {
          url: '/about/',
          name: `${this.performer?.name}`,
        },
      ];
    },
  },
}
</script>

<style lang="scss" module>
.breadcrumb {
  padding-top: 0;
  margin: 0;
}

.back {
  margin-bottom: 12px;
}

.second {
  padding-top: 15px;
}

.casesItem {
  &:global(.cases__item) {
    width: unset;
  }
}
</style>
