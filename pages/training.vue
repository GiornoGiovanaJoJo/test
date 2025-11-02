<template lang="pug">
app-loading(v-if="!education && !stages.length")
section.training.content-page(v-else)
  .content-page__wrapper.container.ps-lg-12.pe-lg-12
    h2.text-border {{ educationInfo.name }}
    .editor(v-html="educationInfo.description")
    app-accordion
      app-accordion-item(
        v-for="(stage, index) in stages"
        :key="index"
        :title="stage.name"
      )
        .btn.btn--black.popup-with-move-anim.mb-4.pointer(@click="$modal.show('modal-callback', { modalTitle: 'Заявка на оказание услуги', page: 'Обучение', service: stage.name })")
          .text Заказать услугу
          .decor
            app-icon(name-icon="chat")
        .editor(v-html="stage.describe")
        .btn.btn--black.popup-with-move-anim.mb-4.pointer(@click="$modal.show('modal-callback', { modalTitle: 'Заявка на оказание услуги', page: 'Обучение', service: stage.name })")
          .text Заказать услугу
          .decor
            app-icon(name-icon="chat")
    div(v-html="educationInfo.conclusion")
    a.btn.btn--black.popup-with-move-anim.mt-4.mb-10.md-mb-0(@click="$modal.show('modal-callback', { modalTitle: 'Заявка на оказание услуги', page: 'Обучение', service: stage.name })")
      .text Заказать услугу
      .decor
        app-icon(name-icon="message-2")
</template>

<script>
import AppAccordion from '~/components/app/AppAccordion'
import AppAccordionItem from '~/components/app/AppAccordionItem'
import AppIcon from '~/components/app/AppIcon'
import AppLoading from '~/components/app/AppLoading'

export default {
  name: 'PageTraining',
  components: {
    AppAccordion,
    AppAccordionItem,
    AppIcon,
    AppLoading,
  },
  middleware: ['access'],
  meta: {
    module: ['Обучение'],
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
        link: [{ rel: 'canonical', href: 'https://russianlion.ru/training/' }],
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
      return {link: [{ rel: 'canonical', href: 'https://russianlion.ru/training/' }]}
    }
  },
  data() {
    return {
      education: null,
      stages: [],
    }
  },
  computed: {
    educationInfo() {
      return this.education ? this.education[0] : {}
    },
  },
  async created() {
    await Promise.all([this.loadEducation(), this.loadStages()])
  },
  methods: {
    async loadEducation() {
      try {
        this.education = await this.$api.education.list({ is_active: true })
      } catch (e) {
        this.$noty.responseError(e)
      }
    },
    async loadStages() {
      try {
        this.stages = await this.$api.education.stage.list({ is_active: true })
      } catch (e) {
        this.$noty.responseError(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.training {
  @include max-w-md {
    height: auto;
    .content-page__wrapper {
      height: auto;
      overflow: visible;
    }
  }
}
</style>
