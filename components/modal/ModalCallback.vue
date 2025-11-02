<template lang="pug">
modal(
  :name="modalName"
  height="auto"
  width="100%"
  :max-width="500"
  :adaptive="true"
  @before-open="beforeOpen"
  @closed="closed"
)
  .popup.popup--callback.mfp-hide
    form.popup__wrapper(@submit.prevent="send")
      .close-button(@click="$modal.hide(modalName)")
      .popup__title
        span Напишите нам
        app-messengers(inModal)
      .popup__subtitle или оставьте контактную информацию, и мы свяжемся с вами в ближайшее время!
      app-input(
        v-model="form.name"
        type="text"
        placeholder="Ваше имя"
        required
      )
      app-input(
        v-model="form.company"
        type="text"
        placeholder="Ваша компания"
        required
      )
      app-field-phone(v-model="form.phone")
      app-input(
        v-model="form.email"
        type="text"
        name-icon="email"
        placeholder="Ваш e-mail"
        required
      )
      .popup__privacy-policy
        label.checkbox
          input.checkbox__input(
            v-model="policy"
            type="checkbox"
            name="cb"
          )
          span.checkbox__checkbox
          .checkbox__label Согласен с
            nuxt-link.link.footer__policy(to="/privacy" v-on:click.native="$modal.hide('modal-callback')") Политикой конфиденциальности
      button.popup__btn.btn.btn.btn--black
        .text Отправить
        svg.icon.icon-send
          use(xlink:href="~/assets/img/sprite.svg#send")
</template>

<script>
import AppFieldPhone from '~/components/app/AppFieldPhone'
import AppInput from '~/components/app/AppInput'

export default {
  name: 'ModalCallback',
  components: {
    AppFieldPhone,
    AppInput,
  },
  data() {
    return {
      modalName: 'modal-callback',
      doc: null,
      form: {
        name: null,
        company: null,
        phone: null,
        email: null,
      },
      csrftoken: null,
      modalTitle: null,
      page: null,
      policy: false,
      service: null,
    }
  },
  computed: {
    dataToSend() {
      return {
        name: this.form.name,
        company: this.form.company,
        phone: this.form.phone.replaceAll(' ', ''),
        email: this.form.email,
        agree: this.policy,
      }
    },
  },
  async created() {
    await this.loadDoc()
  },
  methods: {
    beforeOpen() {
      this.csrftoken = this.$cookies.get('csrftoken')
    },
    closed() {
      for (const key in this.form) {
        this.form[key] = null
      }
      this.policy = false
      this.page = null
      this.modalTitle = null
      this.service = null
    },
    async loadDoc() {
      try {
        this.doc = await this.$api.docs.list({ is_active: true })
      } catch (e) {
        this.$noty.responseError(e)
      }
    },
    validate() {
      if (!this.policy) {
        this.$noty.error('Нужно согласиться с политикой конфиденциальности')
        return false
      }
      return true
    },
    async send() {
      if (this.validate()) {
        try {
          await this.$api.feedback(
            { ...this.dataToSend },
            {
              headers: { common: { 'X-CSRFToken': this.csrftoken } },
              params: { 'site-page': this.page, service: this.service },
            }
          )
          this.$noty.success('Заявка отправлена')
          this.$modal.hide(this.modalName)
        } catch (e) {
          this.$noty.responseError(e)
        }
      }
    },
  },
}
</script>
