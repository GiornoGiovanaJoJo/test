import {
  Autoplay,
  Controller,
  Mousewheel,
  Navigation,
  Pagination,
  Swiper as SwiperClass,
  Thumbs,
} from 'swiper/js/swiper.esm'
import Vue from 'vue'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
SwiperClass.use([Pagination, Mousewheel, Autoplay, Navigation, Controller, Thumbs])
Vue.use(getAwesomeSwiper(SwiperClass))

// eslint-disable-next-line no-unused-vars
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)
