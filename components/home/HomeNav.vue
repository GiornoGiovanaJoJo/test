<template lang="pug">
div
  .nav-page(:class="{ 'nav-page--rotate': activeSection && activeSection !== 'intro' }")
    .container
      .nav-page__wrapper
        .nav-page__nav-list
          .nav-page__item-wrapper(
            v-for="(item, index) in navItems"
            :key="index"
            :class="{ active : activeSection === item.name }"
          )
            a.nav-page__link(:href="`#${item.name}`")
              app-icon(:name-icon="item.nameIcon")
              span.nav-page__name {{ item.title }}
  .page-nav
    .page-nav__up(v-if="activeSection !== 'intro'" @click="$emit('prev-section')")
      app-icon(name-icon="arrow-up")
    .page-nav__down(v-if="activeSection !== 'feedback'" @click="$emit('next-section')")
      app-icon(name-icon="arrow-down")
</template>

<script>
import AppIcon from '~/components/app/AppIcon';

export default {
  name: 'HomeNav',
  components: {
    AppIcon,
  },
  props: {
    activeSection: {
      type: String,
      default: 'intro',
    },
  },
  data() {
    return {
      navItems: [
        {
          name: 'intro',
          title: 'Интро',
          nameIcon: 'nav-play',
        },
        {
          name: 'cases',
          title: 'Работы',
          nameIcon: 'nav-video',
        },
        {
          name: 'clients',
          title: 'Клиенты',
          nameIcon: 'nav-star',
        },
        {
          name: 'reviews',
          title: 'Отзывы',
          nameIcon: 'nav-team',
        },
        {
          name: 'can',
          title: 'Что мы умеем',
          nameIcon: 'nav-movie',
        },
        {
          name: 'feedback',
          title: 'Контакты',
          nameIcon: 'nav-mobile',
        },
      ],
    }
  },
}
</script>
