<template lang="pug">
.intro
  .intro__video

    intro-radial-bg

    transition(name="fade" mode="out-in")
      video(
        autoplay
        muted
        preload
        loop
        playsinline="playsinline"
      )
        source(v-if="!isMobile" :src="'/hero-bg.mp4'" type="video/mp4")
        source(v-if="isMobile" :src="'/hero-bg.webm'" type="video/webm")

  .intro__wrapper.container
    .intro__title-wrapper
      h1.intro__title.h1.mb-md-4
        | Видеопродакшн
        br
        | Русский Лев
      a.intro__btn.btn.btn--black.popup-video(
        v-if="showreel?.video_showreal"
        :href="showreel?.video_showreal"
        @click.prevent="$modal.show('modal-video', { video: showreel?.video_showreal })"
      )
        span.decor +
        span.text смотреть showreel
        span.decor +
    .intro__subtitle КРЕАТИВНОЕ&nbsp;АГЕНТСТВО ПОЛНОГО&nbsp;ЦИКЛА
    .intro__services мы оказываем полный цикл&nbsp;
      .intro__services-wrapper
        span услуг&nbsp
        swiper.intro__services-list.intro__swiper(:options="swiperOptions")
          swiper-slide(v-for="(service, index) in servicesFiltered" :key="index")
            .intro__services-item {{ service }}
</template>

<script>
import IntroRadialBg from '~/components/home/intro/IntroRadialBg'

export default {
  name: 'HomeIntro',
  components: {
    IntroRadialBg,
  },
  props: {
    showreel: {
      type: Object,
      default: () => {},
    },
    about: {
      type: Array,
      default: () => [],
    },
    services: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      swiperOptions: {
        allowTouchMove: false,
        autoplay: {
          delay: 500,
        },
        direction: 'vertical',
        loop: true,
        slidesPerView: 1,
      },
      isMobile: null,
    }
  },
  beforeMount() {
    this.isMobile = window.innerWidth < 1000;
  },
  computed: {
    companyInfo() {
      return Array.isArray(this.about) ? this.about[0] : {}
    },
    companyTitle() {
      const title = this.companyInfo.title
      return title ? title.split(' ') : []
    },
    servicesFiltered() {
      if (this.services)
        return this.services
          .filter((service) => service.for_main_page)
          .map((item) => item.for_main_page)
      return []
    },
  },
}
</script>
