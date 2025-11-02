<template lang="pug">
header.header
  app-navigation(:show-nav="showNav" @hide-nav="showNav = false")
  .container
    .header__wrapper
      component.header__logo-link(:is="logoLinkComponent" v-bind="logoLinkAttrs")
        picture
          source(media="(min-width: 1000px)" srcset="~/assets/img/logo-desktop.svg")
          img.header__logo(src="~/assets/img/logo-mobile.svg"  alt="img")
      div.app-about-us
      a.header__phone-link(:href="`tel:${phone}`") {{ $helpers.formatPhone(phone) }}
      a.header__callback.popup-with-move-anim.pointer(@click="$modal.show('modal-callback')") Связаться с нами
      .header__burger.nav-toggle(@click="showNav = !showNav")
        span
</template>

<script>
import SvgLogo from '~/assets/img/logo.svg?inline'
import AppNavigation from '~/components/app/AppNavigation'

export default {
  name: 'AppHeader',
  components: {
    AppNavigation,
    SvgLogo,
  },
  data() {
    return {
      contacts: null,
      showNav: false,
    }
  },
  computed: {
    logoLinkAttrs() {
      return this.isHomePage ? { href: '#intro' } : { to: { name: 'index', hash: '#intro' } }
    },
    logoLinkComponent() {
      return this.isHomePage ? 'a' : 'nuxt-link'
    },
    isHomePage() {
      return this.$route.name === 'index'
    },
    phone() {
      return this.contacts ? this.contacts[0].phone : ''
    },
  },
  watch: {
    $route: {
      handler() {
        this.showNav = false
      },
      deep: true,
    },
  },
  async asyncData({ app }) {
    try {
      const contacts = await app.$api.contacts.list({
        region: this.$config.is_foreign ? 'uz' : 'ru',
      })

      return {
        contacts,
      };
    } catch (e) {
      app.$noty.responseError(e);
    }
  },
}
</script>

<style lang="scss" scoped>
.header {
  z-index: 99;

  @include max-w-md {
    .app-about-us {
      display: none;
    }

    .header__logo-link {
      margin-right: auto;
    }
  }
}
</style>
