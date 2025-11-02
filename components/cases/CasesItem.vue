<template>
  <div class="cases__item">

    <div :class="$style.frameContainer">
      <iframe
        id="a-company-video"
        :src="item.url_by_customer"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        loading="lazy"
        title="Video from customer"
        :class="$style.video"
      >
      </iframe>
    </div>

<!--    <div-->
<!--      v-if="item.preview"-->
<!--      class="cases__item-img-wrapper"-->
<!--      :style="'background-image: url(' + (item.preview) + ');'"-->
<!--      @click="play">-->
<!--    </div>-->

    <div class="cases__item-title">
      {{ item.title }}
    </div>

    <div
      class="cases__item-description"
      v-html="item.describe"
    >
    </div>
  </div>
</template>

<script>
import AppIcon from '~/components/app/AppIcon';

export default {
  name: 'CasesItem',
  components: {
    AppIcon,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    play() {
      if (this.item.url_by_customer) {
        this.openWork(this.item.url_by_customer);
        return;
      }
      this.showVideo();
    },
    openWork(url) {
      if (url) {
        window.open(url, '_blank')
      } else {
      }
    },
    showVideo() {
      if (!this.item.video) return
      try {
        this.$modal.show('modal-video', {
          video: this.item.video,
        })
      } catch (e) {
        this.$noty.responseError(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.cases__item-control {
  &.disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}
.cases__item-img-wrapper {
  background-size: cover;
  background-repeat: no-repeat;
}
</style>

<style lang="scss" module>
.frameContainer {
  position: relative;
  width: 100%;
  padding-bottom: 56%; /* Высота равна 56% от ширины */
  height: 0;
  overflow: hidden;
}
.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
}
</style>
