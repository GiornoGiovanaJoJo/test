<template lang="pug">
client-only
  label.input(:class="{ 'input--icon': nameIcon}")
    input.input__input(
      v-model="inputValue"
      type="text"
      :placeholder="placeholder"
      :required="required"
      @keypress="numOnly"
    )
    span.input__decor-wrapper
      svg.icon(v-if="nameIcon" :class="`icon-${nameIcon}`")
        use(v-bind="{ 'xlink:href': require(`~/assets/img/sprite.svg`) + `#${nameIcon}` }")
      span.input__placeholder {{ placeholder }}
        span(v-if="required") *
    span.input__clear(v-if="value && value.length > 1" @click="inputValue = null")
      app-icon(name-icon="close")
</template>

<script>
import AppIcon from '~/components/app/AppIcon'

export default {
  name: 'AppFieldPhone',
  components: {
    AppIcon,
  },
  props: {
    nameIcon: {
      type: String,
      default: 'phone',
    },
    placeholder: {
      type: String,
      default: 'Ваш телефон',
    },
    required: {
      type: Boolean,
      default: true,
    },
    value: {
      type: [String, Number],
      default: null,
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.value
      },
      set(value) {
        const newVal = value ? value.replaceAll('+', '') : ''
        this.$emit('input', '+' + newVal)
      },
    },
  },
  methods: {
    numOnly(evt) {
      evt = evt || window.event
      const charCode = evt.which ? evt.which : evt.keyCode
      if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    },
  },
}
</script>