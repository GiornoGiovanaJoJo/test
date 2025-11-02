<template lang="pug">
.feedback
  .feedback__bg-one
    picture
      source(media="(min-width: 1000px)" srcset="~/assets/img/feedback/left-decor.png")
      img.feedback__img(src="~/assets/img/feedback/top-mobile.png" alt="img")
  .feedback__bg-two
    picture
      source(media="(min-width: 1000px)" srcset="~/assets/img/feedback/right-decor.png")
      img.feedback__img(src="~/assets/img/feedback/bottom-mobile.png" alt="img")
  .feedback__wrapper.container.mt-13.mt-sm-0
    .feedback__title-wrapper
      .feedback__title.h2.mb-0 Мы и наши&nbsp;
        br
        | клиенты —
        br
        | одна команда.
      h2.text-border.feedback-title.mb-0 Вместе мы добиваемся желаемых результатов!
    .feedback__soc-wrapper
      h4.mb-2.mb-md-0.contacts-us Свяжитесь с нами:
      app-messengers
</template>

<script>
import AppMessengers from '~/components/app/AppMessengers';

export default {
  name: 'HomeFeedback',
  components: {
    AppMessengers,
  },
}
</script>

<style lang="scss" scoped>
.feedback {
  @include max-w-md {
    padding: 0 0 52px;
    display: flex;
    align-items: center;
  }
}
.feedback__wrapper {
  @include max-w-xs {
    padding-top: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

br {
  display: none;
  @include max-w-xs {
    display: block;
  }
}
.feedback-title {
  font-family: 'Montserrat', sans-serif;
}
.contacts-us {
  text-wrap: nowrap;
  max-width: 286px;
  margin-right: 115px;
}
</style>
