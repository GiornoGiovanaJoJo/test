<template lang="pug">
ul.wrapper-accordion
  slot
</template>

<script>
export default {
  props: {},
  data() {
    return {
      Accordion: {
        count: 0,
        active: null,
      },
    }
  },
  provide() {
    return { Accordion: this.Accordion }
  },
}
</script>

<style lang="scss" scoped>
.wrapper-accordion {
  list-style: none;
  margin: 0;
  padding: 0;

  .accordion:last-child {
    border-bottom: none;
  }
}
</style>
