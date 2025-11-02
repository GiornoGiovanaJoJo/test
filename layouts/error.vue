<template lang="pug">
app-layout
  .error-page
    .container
      .error-page__wrapper
        p.h1.text-border(v-if="error.statusCode !== 404") {{ error.statusCode }}
        img.error-page__img(v-else src="~/assets/img/404.svg")
        p.error-page__subtitle {{ error.statusCode === 404 ? 'Данной страницы не существует' : error.message }}
        nuxt-link.error-page__btn.btn.btn--black(:to="{ name: 'index', hash: '#intro' }")
          .decor
            app-icon(name-icon="home")
          .text На главную
          .decor
            app-icon(name-icon="home")
</template>

<script>
import AppIcon from '~/components/app/AppIcon'
import AppLayout from '~/components/app/AppLayout'

export default {
  name: 'LayoutError',
  components: {
    AppIcon,
    AppLayout,
  },
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
}
</script>