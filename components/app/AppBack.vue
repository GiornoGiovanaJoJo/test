<template lang="pug">
nuxt-link.back(:to="route")
  app-icon(name-icon="left")
  .back__text {{ title }}
</template>

<script>
import AppIcon from '~/components/app/AppIcon'

export default {
  name: 'AppBack',
  components: {
    AppIcon,
  },
  props: {
    route: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
  },
}
</script>