<template>
  <div
    :class="['bread-crumbs']"
  >
    <template v-for="(item,idx) in specs">
      <n-link
        v-if="item.isActive"
        :key="`link-${idx}`"
        class="bread-crumbs__item"
        :to="item.url"
        @click.native="$emit('select-breadcrumb', item)"
      >
        {{ item.name }}
      </n-link>

      <div
        v-if="!item.isActive"
        :key="`title-${idx}`"
        class="bread-crumbs__item"
        :class="{disabled:!item.isActive}"
      >
        {{ item.name }}
      </div>

      <div
        v-if="idx + 1 < specs.length"
        :key="`separator-${idx}`"
        class="bread-crumbs__separator"
        :class="{_point:separator === 'point'}"
      >
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'AppBreadcrumbs',

  props: {
    specs: {
      type: Array,
      default: () => [],
    },

    separator: {
      type: String,
      default: 'slash',
      validator: v => [
        'slash',
        'point',
      ].includes(v),
    },
  },
};
</script>

<style lang="scss">
.bread-crumbs {
  position: relative;
  z-index: unset;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  padding: 24px 0;

  @include max-w-md {
    width: 100%;
    padding: 0 0 6px;
  }

  &__item {
    text-decoration: none;
    font-weight: normal;
    line-height: 20px;
    color: #43495a;
    transition: all .2s ease;

    &:hover {
      color: #596177FF;
    }

    &.disabled {
      color: #aab0c1;
      pointer-events: none;
    }
  }

  &__separator {
    position: relative;
    display: block;
    margin: 0 8px;

    &:before {
      content: "/";
      position: absolute;
      top: 2px;
      left: -5px;
      width: 3px;
      height: 12px;
      color: #aab0c1;
    }

    &._point:before {
      content: "";
      top: 8px;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: #cbd0de;
    }
  }
}
</style>
