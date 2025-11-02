<template lang="pug">
client-only
  label.input(:class="{ 'input--icon': nameIcon}")
    input.input__input(
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      :required="required"
    )
    span.input__decor-wrapper
      svg.icon(v-if="nameIcon" :class="`icon-${nameIcon}`")
        use(v-bind="{ 'xlink:href': require(`~/assets/img/sprite.svg`) + `#${nameIcon}` }")
      span.input__placeholder {{ placeholder }}
        span(v-if="required") *
    span.input__clear(v-if="inputValue" @click="inputValue = null") ✕
</template>

<script>
import AppIcon from '~/components/app/AppIcon'

export default {
  name: 'AppInput',
  components: {
    AppIcon,
  },
  props: {
    nameIcon: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
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
        this.$emit('input', value)
      },
    },
  },
}
</script>