<template lang="pug">
app-loading(v-if="$fetchState.pending")
.about(v-else)
  .about__bg-wrappper
      img.about__bg-img(src="~/assets/img/about-logo.svg" alt="bg")
  .about__wrapper.container.shadow-mask-top-bottom
    div.about__page-title(v-if="companyInfo.title") {{ companyInfo.title }}
    app-breadcrumbs(:specs="breadcrumbs" :class="[$style.breadcrumb]" )
    h1.cases__title.h2.text-border О видеопродакшне
    div(v-if="companyInfo.describe" v-html="companyInfo.describe")

    .about__stats-list
      .about__stats-item.d-flex.d-md-block.flex-column
        .about__stats-text-wtapper
          .about__stats-nimber {{ companyInfo.count_performers }}
          .about__stats-description Специалистов<br> высокого класса
        nuxt-link.about__stats-link.btn.btn--black.mt-auto(:to="{ name: 'team' }")
          .text К команде
          .decor
            app-icon(name-icon="nav-team")

      .about__stats-item.d-flex.d-md-block.flex-column
        .about__stats-text-wtapper
          .about__stats-nimber {{ companyInfo.age }}+
          .about__stats-description Лет опыта на телевидении<br> и частных заказах

      .about__stats-item.d-flex.d-md-block.flex-column(v-if="companyInfo.count_jobs")
        .about__stats-text-wtapper
          .about__stats-nimber {{ companyInfo.count_jobs }}+
          .about__stats-description Выполненных проектов<br> и созданных передач
        nuxt-link.about__stats-link.btn.btn--black.mt-auto(:to="{ name: 'portfolio' }")
          .text К проектам
          .decor
            app-icon(name-icon="nav-video")
    h2.h2.text-border Наши клиенты:
    .about__clients-img-list
      img.about__clients-img(v-for="customer in customers" :key="customer.id" :src="customer.logo" alt="logo")

    h2.h2.text-border Направления работы:
    .clients__list
      .clients__item(v-for="direction in directions" :key="direction.id") {{ direction.name }}
</template>

<script>
import AppIcon from '~/components/app/AppIcon'
import AppLoading from '~/components/app/AppLoading'
import Metatags from '~/mixins/metatags'
import AppBreadcrumbs from '~/components/app/AppBreadcrumbs.vue';

export default {
  name: 'PageAbout',
  components: {
    AppLoading,
    AppIcon,
    AppBreadcrumbs,
  },
  mixins: [Metatags],
  async fetch() {
    await Promise.all([this.loadAbout(), this.loadCustomers(), this.loadDirections()])
  },
  data() {
    return {
      about: null,
      customers: [],
      directions: [],
      breadcrumbs: [
        {
          url: '/',
          name: 'Главная',
          isActive: true,
        },
        {
          url: '/about/',
          name: 'О нас',
        },
      ],
    }
  },
  computed: {
    companyInfo() {
      return Array.isArray(this.about) ? this.about[0] : {}
    },
  },
  methods: {
    async loadAbout() {
      try {
        this.about = await this.$api.about.list({
          is_active: true,
          region: this.$config.is_foreign ? 'uz' : 'ru',
        })
      } catch (e) {
        this.$noty.responseError(e)
      }
    },
    async loadCustomers() {
      try {
        const customers = await this.$api.customers.list({ is_active: true })
        console.log(customers)
        this.customers = this.fixProtocol(customers);
      } catch (e) {
        this.$noty.responseError(e)
      }
    },
    async loadDirections() {
      try {
        this.directions = await this.$api.direction.list({ is_active: true })
      } catch (e) {
        this.$noty.responseError(e)
      }
    },

    fixProtocol(list) {
      return list.length
        ? list.map(el => ({ ...el, logo: el.logo.replace(/http:\/\//g, 'https://') }))
        : [];
    }
  },
}
</script>

<style lang="scss" module>
.breadcrumb {
  padding-top: 0;
  margin: 0;
}
</style>
