<template lang="pug">
.social
  .social__list
    .btn.btn--black.popup-with-move-anim.mr-2.pointer(v-if="!inModal" @click="$modal.show('modal-callback', { modalTitle: 'Заявка на оказание услуги', page: 'Услуги' })")
      .text Написать
    a.social__item(v-if="socialData.telegram" :href="`https://t.me/+${socialData.telegram}`" target="_blank")
      img(src='~/assets/img/icons/telegram.svg' alt='icon' width='16')
    a.social__item.popup-with-move-anim(v-if="socialData.whatsapp" :href="`https://wa.me/${socialData.whatsapp}`" target="_blank")
      img(src='~assets/img/icons/whatsapp.svg' alt='icon' width='16')
</template>

<script>
export default {
  name: 'AppMessengers',
  props: {
    inModal: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      social: [],
    }
  },
  computed: {
    socialData() {
      return this.social.length ? this.social[0] : {}
    },
  },
  async created() {
    await this.loadSocial()
  },
  methods: {
    async loadSocial() {
      try {
        this.social = await this.$api.socialLinks.list({
          is_active: true,
          region: 'ru',
        })
      } catch (e) {
        this.$noty.responseError(e)
      }
    },
  },
}
</script>
