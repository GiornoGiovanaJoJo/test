<template lang="pug">
.can
    .can__wrapper.container.mt-16.mt-sm-0
        .can__title
            .can__title.h2.text-border Что мы умеем
        .can__body
            .narrow(v-html="canInfo.tags || ''")
</template>

<script>
export default {
  name: 'HomeCan',

  props: {
    can: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    canInfo() {
      return Array.isArray(this.can)
        ? this.can[0]
        : {}
    },
  },
}
</script>

<style lang="scss" scoped>
.can {
  @include max-w-md {
    //min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
.can__wrapper {
  @include max-w-xs {
    padding-top: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
.can__body {
  margin-top: 20px;
  margin-inline: auto;
}
.narrow {
  max-width: 1000px;
  text-align: justify;
}
</style>
