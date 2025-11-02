<template lang="pug">
li.accordion(:class="{ open: visible }, className")
  .accordion__head(:class="{ 'accordion__head--active': visible }" @click="open")
    .accordion__title {{ title }}
    .accordion__arrow-wrapper
      img.accordion__arrow(src="~/assets/img/icons/dropdown-arrow.svg" alt="arrow")
  transition(
    name="accordion"
    @enter="start"
    @after-enter="end"
    @before-leave="start"
    @after-leave="end"
  )
    .accordion__content(v-show="visible")
      slot
</template>


<script>
export default {
  props: {
    className: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
  },
  inject: ['Accordion'],
  data() {
    return {
      index: null,
    }
  },
  computed: {
    visible() {
      return this.index === this.Accordion.active
    },
  },
  created() {
    this.index = this.Accordion.count++
  },
  methods: {
    open() {
      if (this.visible) {
        this.Accordion.active = null
      } else {
        this.Accordion.active = this.index
      }
    },
    start(el) {
      el.style.height = el.scrollHeight + 'px'
    },
    end(el) {
      el.style.height = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.accordion {
  padding-left: 0;
  &::before {
    display: none;
  }

  &__content {
    padding-top: 16px;
  }
}

.accordion-enter-active,
.accordion-leave-active {
  will-change: height, opacity;
  transition: height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.accordion-enter,
.accordion-leave-to {
  height: 0 !important;
  opacity: 0;
}
</style>
