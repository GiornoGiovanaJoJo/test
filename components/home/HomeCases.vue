<template>
  <AppLoading
    v-if="!segments
    && className"
  />

  <div
    v-else
    :class="className"
    class="cases"
  >
    <portal
      v-if="!pageTitle"
      to="cases-bg"
    >
      <transition
        name="slide-fast"
        mode="out-in"
      >
        <div
          v-if="sectionActive"
          class="cases__slid-list"
        >
          <div
            v-for="(segment, index) in segments"
            :key="segment.id"
            :class="{ active: activeSegment === segment.id, old: oldSegment === segment.id }"
            class="cases__slide-wrapper"
          >
            <img
              :src="require(`~/assets/img/cases/slide${index % 2 + 1}.png`)"
              alt="slide"
              class="cases-slide-one"
            />

            <img
              :src="require(`~/assets/img/cases/slide${index % 2 + 1}.png`)"
              alt="slide"
              class="cases__slide-two"
            />
          </div>
        </div>
      </transition>
    </portal>

    <div
      v-else
      class="cases__slid-list"
    >
      <div
        v-for="(segment, index) in segments"
        :key="segment.id"
        :class="{ active: activeSegment === segment.id, old: oldSegment === segment.id }"
        class="cases__slide-wrapper"
      >
        <img
          :src="require(`~/assets/img/cases/slide${index % 2 + 1}.png`)"
          alt="slide"
          class="cases-slide-one"
        />

        <img
          :src="require(`~/assets/img/cases/slide${index % 2 + 1}.png`)"
          alt="slide"
          class="cases__slide-two"
        />
      </div>
    </div>
    <div
      v-if="segments"
      class="container shadow-mask-top-bottom hide-scroll"
    >
      <h1 class="h2 text-border">
        Портфолио видеопродакшна
      </h1>

      <AppBreadcrumbs
        :specs="breadcrumbs"
        :class="[$style.breadcrumb]"
      />

      <div class="cases__wrapper tabs">
        <div class="cases__left col-12 col-md-4 mt-md-n4">
          <div class="pt-md-4">
            <div class="cases__list-title">
              Сегмент:
            </div>

            <div class="cases__tabs-wrapper">
              <div class="cases__list tabs__caption">
                <v-select
                  v-if="isMobile"
                  v-model="activeSegment"
                  append-to-body
                  :clearable="false"
                  :options="selectOptions"
                  :searchable="false"
                  :selectable="option => option.label !== activeSegmentTitle"
                  class="cases__select mb-3"
                  @input="switchSegment($event.value)"
                >
                  <template #open-indicator="{ attributes }">
                    <dropdown-arrow-svg />
                  </template>

                  <template #selected-option-container="{ option }">
                    <div class="vs__selected cases__tabs-btn tabs__btn">
                      <h2 class="mb-0">
                        <span class="decor accent">
                          #
                        </span>

                        <span class="title">
                          {{ activeSegmentTitle }}
                        </span>

                        <span class="works">
                          {{ activeSegmentCases.length }} {{ $helpers.declOfNum(activeSegmentCases.length, ['работа', 'работы', 'работ']) }}
                        </span>
                      </h2>
                    </div>
                  </template>

                  <template #option="{ label, value }">
                    <h2
                      class="mb-0 py-2"
                      :class="{ 'text-border': value !== activeSegment }"
                    >
                      {{ label }}
                    </h2>
                  </template>
                </v-select>

                <div v-else>
                  <div
                    v-for="segment in selectOptions"
                    :key="segment.value"
                    :class="{ active: activeSegment === segment.value }"
                    class="cases__tabs-btn tabs__btn"
                    @click="switchSegment(segment.value)"
                  >
                    <h2 class="mb-0">
                      <span class="decor accent">
                        #
                      </span>

                      <span class="title text-border">
                        {{ segment.label }}
                      </span>

                      <span class="works">
                        {{ activeSegmentCases.length }} {{ $helpers.declOfNum(activeSegmentCases.length, ['работа', 'работы', 'работ']) }}
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="cases__right col-12 col-md-8">
          <div ref="casesScrollable" class="cases__right-list scroll-block scrollable-content">
            <div v-if="activeSegmentCases.length">
              <div class="cases__tab tabs__item active">
                <CasesItem
                  v-for="item in activeSegmentCases"
                  :key="item.id"
                  :item="item"
                />

                <nuxt-link
                  v-if="!className"
                  :to="{ name: 'portfolio', params: { activeSegment } }"
                  class="cases__btn btn btn--black">

                  <div class="text">
                    Посмотреть все
                  </div>
                </nuxt-link>
              </div>
            </div>

            <p v-else>
              Пока что работ нет
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DropdownArrowSvg from '~/assets/img/icons/dropdown-arrow.svg?inline'
import AppLoading from '~/components/app/AppLoading'
import CasesItem from '~/components/cases/CasesItem'
import AppBreadcrumbs from '~/components/app/AppBreadcrumbs.vue'

export default {
  name: 'HomeCases',
  components: {
    AppLoading,
    CasesItem,
    DropdownArrowSvg,
    AppBreadcrumbs,
  },
  props: {
    className: {
      type: String,
      default: null,
    },
    pageTitle: {
      type: String,
      default: null,
    },
    sectionActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeSegment: 'all',
      isMobile: false,
      oldSegment: null,
      segments: [],
      breadcrumbs: [
        {
          url: '/',
          name: 'Главная',
          isActive: true,
        },
        {
          url: '/portfolio/',
          name: 'Портфолио',
        },
      ],
    }
  },
  computed: {
    activeSegmentCases() {
      if (this.segments.length) {
        return this.activeSegment && this.activeSegment !== 'all'
          ? this.segments.find((item) => item.id === this.activeSegment).segment_jobs
          : this.segments.reduce((acc, item) => acc.concat(item.segment_jobs), [])
      }
      return []
    },
    activeSegmentTitle() {
      return this.activeSegment === 'all'
        ? 'Все видео'
        : this.segments.find((item) => item.id === this.activeSegment).title
    },
    selectOptions() {
      const arr = this.segments.map((item) => ({
        label: item.title,
        value: item.id,
      }))

      if (this.className) {
        arr.unshift({
          label: 'Все видео',
          value: 'all',
        })
      }

      return arr
    },
  },
  watch: {
    activeSegment() {
      this.$refs.casesScrollable.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
  },
  async created() {
    await this.loadSegments()
  },
  beforeMount() {
    this.isMobile = window.innerWidth < 1000
  },
  methods: {
    selectActiveSegment() {
      const { params } = this.$route

      params.activeSegment
        ? (this.activeSegment = params.activeSegment)
        : (this.activeSegment = this.segments[0].id)

      if (this.pageTitle)
        this.$nextTick(() => {
          const el = document.querySelector('.cases__tabs-btn.tabs__btn.active')
          el.scrollIntoView({ behavior: 'smooth', block: 'end' })
        })
    },
    async loadSegments() {
      try {
        this.segments = await this.$api.segment.list(
          !this.pageTitle ? { is_active: true, 'show-main': true } : { is_active: true }
        )
      } catch (e) {
        this.$noty.responseError(e)
      }
    },
    switchSegment(segmentId) {
      this.oldSegment = this.activeSegment
      this.activeSegment = segmentId
    },
  },
}
</script>

<style scoped lang="scss">
.vs__dropdown-menu {
  .vs__dropdown-option.vs__dropdown-option--disabled {
    display: none;
  }
}
.cases__select {
  &.vs--open {
    .vs__dropdown-toggle {
      .vs__selected-options {
        .vs__selected {
          position: relative;
          opacity: 1;
        }
      }
    }
  }
  .vs__dropdown-toggle {
    border: none;
    background: transparent;
    .vs__selected {
      flex-direction: column;
      align-items: flex-start;
    }
  }
}

.slide-fast-enter-active,
.slide-fast-leave-active {
  transition: transform 0.65s;
}
.slide-fast-enter,
.slide-fast-leave-to {
  transform: translateY(100%);
}
</style>

<style lang="scss" module>
.breadcrumb {
  padding-top: 0;
  margin: 0;
}
</style>
