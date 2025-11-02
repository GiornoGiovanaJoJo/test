<template lang="pug">
.footer
  .container
    .wrapper
      .wrapper-copyright
        .divider
      nuxt-link.footer__policy(to="privacy") Политика конфиденциальности
      app-social(
        :class="{ 'contacts-page-footer': $route.name === 'contacts' }"
      )
</template>

<script>
import AppSocial from '~/components/app/AppSocial'

export default {
  name: 'AppFooter',
  components: {
    AppSocial,
  },
  data() {
    return {
      doc: null,
      isMobile: false,
    }
  },
  computed: {
    privacyPolicy() {
      return this.doc ? this.doc[0].file_doc : '#'
    },
  },
  async asyncData({ app }) {
    try {
      const doc = await app.$api.docs.list({ is_active: true });

      return {
        doc,
      };
    } catch (e) {
      app.$noty.responseError(e);
    }
  },
  beforeMount() {
    this.isMobile = window.innerWidth < 1000
  },
}
</script>

<style scoped lang="scss">
.footer {
  margin-top: auto;

  @include max-w-md {
    padding-top: 16px;
  }
}
.contacts-page-footer {
  display: none;

  @include max-w-md {
    display: block;
  }
}
.wrapper {
  padding: 0 32px;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);

  @include max-w-md {
    padding: 0;
  }

  .wrapper-copyright {
    justify-self: flex-start;
  }

  .footer__policy {
    text-align: center;
  }

  .social {
    justify-self: flex-end;
  }

  @include max-w-md {
    grid-template-columns: 1fr 1fr;
    grid-gap: 12px 0;

    .wrapper-copyright {
      grid-row: 2;
      grid-column: 1 / 3;
      width: 100%;
      display: flex;
      flex-direction: column;

      .divider {
        width: 100%;
        height: 1px;
        background: #faf8f7;
      }

      .copyright {
        align-self: center;
      }
    }

    .footer__policy {
      grid-column: 2 / 3;
      justify-self: flex-end;
    }

    .social {
      grid-column: 1 / 2;
      grid-row: 1;
      justify-self: flex-start;
    }
  }
}
</style>
