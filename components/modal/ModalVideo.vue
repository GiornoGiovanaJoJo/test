<template lang="pug">
modal(
  :name="modalName"
  height="auto"
  :width="modalWidth"
  :adaptive="true"
  @before-open="beforeOpen"
  @closed="closed"
)
  .wrapper-content
    .close-button(@click="$modal.hide(modalName)")
    video(:src="video" autoplay controls)
</template>

<script>
export default {
  name: 'ModalVideo',
  data() {
    return {
      modalName: 'modal-video',
      modalWidth: '60%',
      video: null,
    }
  },
  beforeMount() {
    this.getModalWidth()
  },
  methods: {
    beforeOpen(e) {
      const { video } = e.params

      this.video = video
    },
    closed() {
      this.video = null
    },
    getModalWidth() {
      if (window.innerWidth < 768) {
        this.modalWidth = '90%'
      }
    },
    async loadVideo(id) {
      try {
        this.video = await this.$api.job.showVideo(id)
      } catch (e) {
        this.$noty.responseError(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper-content {
  width: 100%;
  padding-top: 56.25%;
  video,
  iframe,
  .video {
    width: calc(100% - 80px);
    height: calc(100% - 80px);
    position: absolute;
    top: 40px;
    left: 40px;

    @include max-w-md {
      width: calc(100% - 40px);
      height: calc(100% - 40px);
      top: 20px;
      left: 20px;
    }
  }
}
.close-button {
  top: 12px;
  right: 12px;

  @include max-w-md {
    top: 6px;
    right: 6px;
  }
}
</style>