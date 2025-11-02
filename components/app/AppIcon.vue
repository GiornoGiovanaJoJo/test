<template lang="pug">
svg.icon(:class="`icon-${nameIcon}`")
  use(:xlink:href="require(`~/assets/img/sprite.svg`) + `#${nameIcon}`")
</template>

<script>
export default {
  name: 'AppIcon',
  props: {
    nameIcon: {
      type: String,
      required: true,
    },
  },
}
</script>