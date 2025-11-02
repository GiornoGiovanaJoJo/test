<template>
  <div
    class="clients"
    :class="$style.clients"
  >
    <div class="clients__wrapper container">
      <div class="clients__header">
        <h2 class="clients__title text-border">
          Наши клиенты:
        </h2>

        <swiper
          class="swiper clients__slider-wrapper"
          :options="swiperOptions"
        >
          <swiper-slide
            v-for="customer in customers"
            :key="customer.id"
          >
            <div class="wrapper-clients-logo">
              <img
                class="clients__logo"
                :src="customer.logo"
                :alt="customer.company"
                loading="lazy"
                width="200"
                height="140"
              />
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <div class="clients__body">
        <h2 class="clients__h2 text-border">
          Направления работы:
        </h2>

        <div class="clients__list">
          <div
            v-for="direction in directions"
            :key="direction.id"
            class="clients__item"
          >
            {{ direction.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeClients',
  data() {
    return {
      swiperOptions: {
        allowTouchMove: false,
        autoplay: {
          delay: 500,
        },
        direction: 'horizontal',
        spaceBetween: 24,
        loop: true,
        slidesPerView: 3,
      },
    }
  },
  props: {
    customers: {
      type: Array,
      default: () => [],
    },
    directions: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper-clients-logo {
  width: 200px;
  height: 140px;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

  @include max-w-md {
    width: 100px;
    height: 70px;
  }
}
</style>

<style module lang="scss">
.clients {
  :global(.swiper-wrapper) {
    display: flex !important;
  }
}
</style>
