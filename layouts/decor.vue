<template lang="pug">
app-layout
  app-decor-page
  app-camera-bg
  nuxt
</template>

<script>
import AppCameraBg from '~/components/app/AppCameraBg'
import AppDecorPage from '~/components/app/AppDecorPage'
import AppLayout from '~/components/app/AppLayout'

export default {
  name: 'LayoutDecor',
  components: {
    AppCameraBg,
    AppDecorPage,
    AppLayout,
  },
}
</script>