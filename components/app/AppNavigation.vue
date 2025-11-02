<template lang="pug">
.main-nav(:class="{ 'main-nav--open': showNav }")
  .main-nav__wrapper.scrollable-content
    .main-nav__close.nav-toggle(@click="$emit('hide-nav')")
      app-icon(name-icon="close")
    .list-wrapper
      nav.main-nav__list
        div.app-about-us
        nuxt-link.main-nav__link(
          v-for="(link, index) in links"
          :key="index"
          :class="{ 'main-nav__link--active': $route.name === link.name,  'first-nav-link': index === 0  }"
          :to="{ name: link.name }"
        ) {{ link.title }}
</template>

<script>
import { mapGetters } from 'vuex'
import AppIcon from '~/components/app/AppIcon'

export default {
  name: 'AppNavigation',
  components: {
    AppIcon,
  },
  props: {
    showNav: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['activePagesProcessed']),

    links() {
      const arr = [
        {
          name: 'index',
          hash: '#intro',
          title: 'На главную',
        },
        {
          name: 'portfolio',
          title: 'Портфолио',
        },
        {
          name: 'about',
          title: 'О нас',
        },
        {
          name: 'team',
          title: 'Команда',
        },
        {
          name: 'services',
          title: 'Услуги',
        },
        {
          name: 'cases',
          title: 'Кейсы',
        },
        {
          name: 'management',
          title: 'Антикризисный менеджмент',
          module: 'Описание Антикризисный менеджмент',
        },
        {
          name: 'training',
          title: 'Обучение',
          module: 'Обучение',
        },
        {
          name: 'reviews',
          title: 'Отзывы',
        },
        {
          name: 'contacts',
          title: 'Контакты',
        },
      ]

      return arr.filter((item) => !item.module || this.activePagesProcessed.includes(item.module))
    },
  },
}
</script>

<style lang="scss" scoped>
.list-wrapper {
  overflow: auto;
  height: 100vh;
  min-width: calc(100% - 64px);

  .app-about-us {
    display: none;
    margin-bottom: 24px;
    margin-right: 0;
  }

  @include max-w-md {
    .app-about-us {
      display: flex;
    }
  }

  @include max-w-sm {
    min-width: calc(100% - 32px);
  }
}
</style>
