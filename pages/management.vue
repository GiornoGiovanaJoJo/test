<template lang="pug">
app-loading(v-if="$fetchState.pending")
section.management.content-page(v-else)
  .content-page__wrapper.container.ps-lg-12.pe-lg-12
    h2.text-border Антикризисный менеджмент:
    .mt-10
      div(v-for="(item, index) in management" :key="item.id")
        h4.mb-4.mb-md-8 {{ item.title }}
        p(v-html="item.describe")
    a.btn.btn--black.popup-with-move-anim.mt-4(@click="$modal.show('modal-callback', { modalTitle: 'Заявка на оказание услуги', page: 'Антикризисный менеджмент' })")
      .text Заказать услугу
      .decor
        app-icon(name-icon="message-2")
    h2.text-border.mt-lg-32.mt-16 Кейсы:
    .mt-16
      .row.mb-4.mb-md-8(v-for="(item, index) in completedCases" :key="item.id")
        .col-12.col-lg-4.mb-4.mb-lg-0.d-flex.align-items-start.justify-content-center
          img(:src="item.logo")
        .col-12.col-lg-8
          h4.mb-4.mb-md-8 {{ item.title }}
          .editor.light(v-html="item.describe")
    a.btn.btn--black.popup-with-move-anim.mb-10.mb-md-0(@click="$modal.show('modal-callback', { modalTitle: 'Заявка на оказание услуги', page: 'Антикризисный менеджмент' })")
      .text Заказать услугу
      .decor
        app-icon(name-icon="message-2")
</template>

<script>
import AppLoading from '~/components/app/AppLoading'
import AppIcon from '~/components/app/AppIcon'

export default {
  name: 'PageManagement',
  components: {
    AppLoading,
    AppIcon,
  },
  async fetch() {
    await Promise.all([this.loadCompletedCases(), this.loadManagement()])
  },
  middleware: ['access'],
  meta: {
    module: ['Описание Антикризисный менеджмент'],
  },
  async asyncData({ $api }) {
    try {
      const data = await $api.metatags()

      return {
        data,
      }
    } catch (e) {
      console.log(e)
    }
  },
  head() {
    const path = this.$nuxt.$route.path
    const metatags = this.data.find(item => item.page === path)

    if (metatags) {
      return {
        link: [{ rel: 'canonical', href: 'https://russianlion.ru/management/' }],
        meta: [
            metatags.description ? { hid: 'description', name: 'description', content: metatags.description } : {},
            metatags.keywords ? { hid: 'keywords', name: 'keywords', content: metatags.keywords } : {},
            metatags.robots ? { hid: 'robots', name: 'robots', content: metatags.robots } : {},
            metatags.og_title ? { hid: 'og:title', name: 'og:title', content: metatags.title } : {},
            metatags.og_url ? { hid: 'og:url', name: 'og:url', content: metatags.url } : {},
            metatags.og_site_name ? { hid: 'og:site_name', name: 'og:site_name', content: metatags.site_name } : {},
            metatags.og_description ? { hid: 'og:description', name: 'og:description', content: metatags.og_description } : {},
        ],
      }
    }
    else {
      return {link: [{ rel: 'canonical', href: 'https://russianlion.ru/management/' }]}
    }
  },
  data() {
    return {
      completedCases: null,
      management: null,
    }
  },
  methods: {
    async loadCompletedCases() {
      try {
        this.completedCases = await this.$api.completedCase.list({ is_active: true })
      } catch (e) {
        this.$noty.responseError(e)
      }
    },
    async loadManagement() {
      try {
        this.management = await this.$api.antiCrisis.list({ is_active: true })
      } catch (e) {
        this.$noty.responseError(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.management {
  @include max-w-md {
    height: auto;
    .content-page__wrapper {
      height: auto;
      overflow: visible;
    }
  }
}
</style>
