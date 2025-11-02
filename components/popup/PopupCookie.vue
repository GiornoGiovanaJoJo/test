<template lang="pug">
transition(name="slide" mode="out-in")
  .popup-cookie(v-if="showCookieMessage")
    .wrapper
      .content
        .svg-info
          svg-info
        p
          span Мы обрабатываем файлы cookie и другие пользовательские данные для бесперебойной работы сайта, повышения удобства его использования, персонализации и улучшения качества рекомендаций. 
          a(href="") Подробнее
      span.btn-close-popup(@click="acceptCookie") Закрыть
</template>

<script>
import SvgInfo from '~/assets/img/info.svg?inline'

export default {
  name: 'PopupCookie',
  components: {
    SvgInfo,
  },
  data() {
    return {
      showCookieMessage: false,
    }
  },
  mounted() {
    this.checkCookieMessage()
  },
  methods: {
    acceptCookie() {
      this.$cookies.set('hideCookieMessage', true, {
        maxAge: 60 * 60 * 24 * 7,
      })
      this.showCookieMessage = false
    },
    checkCookieMessage() {
      const temp = this.$cookies.get('hideCookieMessage')

      if (!temp) {
        this.showCookieMessage = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.popup-cookie {
  z-index: 999;
  box-shadow: 0px 24px 24px rgba(0, 0, 0, 0.06);
  background: #fff;
  max-width: 1020px;
  padding: 16px 32px;
  width: calc(100% - 40px);
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 16px;

  .wrapper {
    display: flex;
    align-items: center;
    flex-direction: row;

    .content {
      margin-right: 32px;
      display: flex;
      align-items: center;

      .svg-info {
        margin-right: 16px;
      }

      p {
        margin-bottom: 0;
        font-size: 16px;
        line-height: 20px;
        letter-spacing: 0.02em;
        font-weight: 300;

        a {
          color: #ddad66;
        }
      }
    }

    .btn-close-popup {
      cursor: pointer;
      padding: 12px 16px;
      font-size: 12px;
      line-height: 12px;
      letter-spacing: 0.08em;
      font-weight: 600;
      text-transform: uppercase;
      color: #211514;
      font-family: 'Montserrat', sans-serif;
    }
  }

  @include max-w-md {
    width: calc(100% - 20px);
    bottom: 10px;
    max-width: 288px;
    padding: 8px;

    .wrapper {
      flex-direction: column;

      .content {
        margin-right: 0;
        align-items: flex-start;

        .svg-info {
          margin-right: 8px;
          svg {
            width: 16px;
            height: 16px;
          }
        }

        p {
          font-size: 12px;
          line-height: 16px;
        }
      }

      .btn-close-popup {
        margin-right: 0;
        margin-top: 8px;
        font-size: 8px;
        line-height: 8px;
        padding: 8px 12px;
      }
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s, opacity 0.5s;
}
.slide-enter,
.slide-leave-to {
  transform: translate(-50%, 50%);
  opacity: 0;
}
</style>