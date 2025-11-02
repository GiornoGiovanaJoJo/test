<template lang="pug">
.contacts
  section.contacts__wrapper.container
    h1.contacts__title.h2.text-border Контакты видеопродакшн
    app-breadcrumbs(:specs="breadcrumbs" :class="[$style.breadcrumb]" )
    .row
      .col-12.col-md-6
        .contacts__contact-wrapper(v-if="contactsData.phone")
          img.contacts__contact-icon(src="~/assets/img/icons/phone.svg" alt="icon")
          .contacts__contact-content
            a.contacts__contact(href="tel:+79998887766") {{ $helpers.formatPhone(contactsData.phone) }}
            .contacts__contact-description Основной телефон
        .contacts__contact-wrapper(v-if="contactsData.adv_phone")
          img.contacts__contact-icon(src="~/assets/img/icons/phone.svg" alt="icon")
          .contacts__contact-content
            a.contacts__contact(href="tel:+79998887766") {{ $helpers.formatPhone(contactsData.adv_phone || '') }}
            .contacts__contact-description Дополнительный телефон
        .contacts__contact-wrapper(v-if="contactsData.email")
          img.contacts__contact-icon(src="~/assets/img/icons/email.svg" alt="icon")
          .contacts__contact-content
            a.contacts__contact(href="mailto:mail@mail") {{ contactsData.email }}
        .contacts__contact-wrapper(v-if="contactsData.address")
          img.contacts__contact-icon(src="~/assets/img/icons/map-point.svg" alt="icon")
          .contacts__contact-content
            a.contacts__contact {{ contactsData.address }}
        div
          hr.hr
          .contacts__messengers
            .contacts__messengers-title Соц. сети:
            app-social
          hr.hr

      .col-12.col-md-6
        form.contacts__form(@submit.prevent="send")
          .contacts__form-title
            span Напишите нам
            app-messengers
          p.contacts__form-subtitle или оставьте контактную информацию, и мы свяжемся с вами в ближайшее время!
          .row
            .col-12.col-lg-6
              app-input(
                v-model="form.name"
                placeholder="Ваше имя"
                type="text"
                required
              )
            .col-12.col-lg-6
              app-input(
                v-model="form.company"
                placeholder="Ваша компания"
                type="text"
                required
              )
          .row
            .col-12.col-lg-6
              app-field-phone(v-model="form.phone")
            .col-12.col-lg-6
              app-input(
                v-model="form.email"
                placeholder="Ваш e-mail"
                type="text"
                name-icon="email"
                required
              )
          .contacts__privacy-policy
            label.checkbox
              input.checkbox__input(
                v-model="policy"
                type="checkbox"
                name="cb"
              )
              span.checkbox__checkbox
              .checkbox__label Согласен с
                nuxt-link.link.footer__policy(to="privacy") Политикой конфиденциальности*
          button.contacts__btn.btn.btn--black.w-100
            .text Отправить
            app-icon(name-icon="send")
</template>

<script>
import AppContactsLinks from '~/components/app/AppContactsLinks'
import AppFieldPhone from '~/components/app/AppFieldPhone'
import AppIcon from '~/components/app/AppIcon'
import AppInput from '~/components/app/AppInput'
import AppLoading from '~/components/app/AppLoading'
import AppMessengers from '~/components/app/AppMessengers'
import AppSocial from '~/components/app/AppSocial'
import Metatags from '~/mixins/metatags'
import AppBreadcrumbs from '~/components/app/AppBreadcrumbs.vue'

export default {
  name: 'PageContacts',
  components: {
    AppContactsLinks,
    AppFieldPhone,
    AppIcon,
    AppInput,
    AppLoading,
    AppMessengers,
    AppSocial,
    AppBreadcrumbs,
  },
  mixins: [Metatags],
  data() {
    return {
      contacts: [],
      doc: null,
      social: {
        telegram: '',
        viber: '',
        whatsapp: '',
      },
      form: {
        name: null,
        company: null,
        phone: null,
        email: null,
      },
      csrftoken: null,
      policy: false,

      breadcrumbs: [
        {
          url: '/',
          name: 'Главная',
          isActive: true,
        },
        {
          url: '/contacts/',
          name: 'Контакты',
        },
      ],
    }
  },
  computed: {
    contactsData() {
      return this.contacts.length ? this.contacts[0] : {}
    },
    dataToSend() {
      return {
        name: this.form.name,
        company: this.form.company,
        phone: this.form.phone.replaceAll(' ', ''),
        email: this.form.email,
        agree: this.policy,
      }
    },
    socialData() {
      return this.social.length ? this.social[0] : {}
    },
  },
  async created() {
    await Promise.all([this.loadDoc(), this.loadContacts(), this.loadSocial()])
    this.csrftoken = this.$cookies.get('csrftoken')
  },
  methods: {
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
              params: { 'site-page': 'Форма обратной связи' },
            }
          )
          this.$noty.success('Заявка отправлена')
        } catch (e) {
          this.$noty.responseError(e)
        }
      }
    },
    async loadContacts() {
      try {
        this.contacts = await this.$api.contacts.list({
          region: this.$config.is_foreign ? 'uz' : 'ru',
        })
      } catch (e) {
        this.$noty.responseError(e)
      }
    },
    async loadSocial() {
      try {
        this.social = await this.$api.socialLinks.list({
          is_active: true,
          region: this.$config.is_foreign ? 'uz' : 'ru',
        })
      } catch (e) {
        this.$noty.responseError(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.contacts {
  @include max-w-md {
    .contacts__wrapper {
      height: auto;
      overflow: visible;
    }
  }
}
</style>

<style lang="scss" module>
.breadcrumb {
  margin: 0;
  padding-top: 0;
}
</style>
