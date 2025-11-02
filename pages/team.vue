<template lang="pug">
section.team.team-page.top-padding-section
  .team__wrapper.container
    h1.team__title.h2.text-border Команда видеостудии
    app-breadcrumbs(:specs="breadcrumbs" :class="[$style.breadcrumb]" )
    home-team
</template>

<script>
import HomeTeam from '~/components/home/HomeTeam';
import Metatags from '~/mixins/metatags';
import AppBreadcrumbs from '~/components/app/AppBreadcrumbs.vue';

export default {
  name: 'PageTeam',
  layout: 'decor',
  components: {
    HomeTeam,
    AppBreadcrumbs,
  },
  mixins: [Metatags],

  data() {
    return {

      breadcrumbs: [
        {
          url: '/',
          name: 'Главная',
          isActive: true,
        },
        {
          url: '/team/',
          name: 'Команда',
        },
      ],
    };
  },
}
</script>

<style lang="scss" scoped>
.top-padding-section {
  padding-top: var(--top-padding-section);
}
</style>

<style lang="scss" module>
.breadcrumb {
  padding-top: 0;
  margin: 0;
}
</style>
