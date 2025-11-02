<template lang="pug">
.layout
  app-header
  main.main
    slot
  app-footer
  modal-callback
  modal-video
  client-only
    notifications(:duration="3000" position="bottom right")
</template>

<script>
import AppFooter from '~/components/app/AppFooter'
import AppHeader from '~/components/app/AppHeader'
import ModalCallback from '~/components/modal/ModalCallback'
import ModalVideo from '~/components/modal/ModalVideo'

export default {
  name: 'AppLayout',
  components: {
    AppHeader,
    AppFooter,
    ModalCallback,
    ModalVideo,
  },
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>