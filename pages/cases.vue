<template lang="html">
  <div>
    <AppLoading v-if="$fetchState.pending"/>

    <div
      v-else
      class="services content-page"
    >
      <div class="services__wrapper container content-page__wrapper ps-lg-12 pe-lg-12">
        <h1
          :class="[$style.title]"
          class="h2 text-border"
        >
          Наши кейсы
        </h1>

        <AppBreadcrumbs
          :specs="breadcrumbs"
          :class="[$style.breadcrumb]"
        />

        <AppAccordion :class="[$style.accordion]">
          <AppAccordionItem
            v-for="(service, index) in services"
            :key="index"
            :title="service.title"
          >
            <div
              class="btn btn--black popup-with-move-anim mb-4 pointer"
              @click="openModal"
            >
              <span class="text">
                Заказать услугу
              </span>

              <span class="decor">
                <AppIcon name-icon="chat"/>
              </span>
            </div>

            <div :class="$style.describe" v-html="quoteRefactor(service.describe)"></div>

            <div
              class="btn btn--black popup-with-move-anim mb-4 pointer"
              @click="openModal"
            >
              <span class="text">
                Заказать услугу
              </span>

              <span class="decor">
                <AppIcon name-icon="chat"/>
              </span>
            </div>
          </AppAccordionItem>
        </AppAccordion>
      </div>
    </div>
  </div>
</template>

<script>
import AppAccordion from '~/components/app/AppAccordion'
import AppAccordionItem from '~/components/app/AppAccordionItem'
import AppIcon from '~/components/app/AppIcon'
import AppLoading from '~/components/app/AppLoading'
import Metatags from '~/mixins/metatags'
import AppBreadcrumbs from '~/components/app/AppBreadcrumbs.vue'

export default {
  name: 'PageServices',

  components: {
    AppLoading,
    AppAccordion,
    AppAccordionItem,
    AppIcon,
    AppBreadcrumbs,
  },

  mixins: [Metatags],

  async fetch() {
    await this.loadServices()
  },

  data() {
    return {
      services: [],
      breadcrumbs: [
        {
          url: '/',
          name: 'Главная',
          isActive: true,
        },
        {
          url: '/cases/',
          name: 'Кейсы',
        },
      ],
    }
  },
  methods: {
    async loadServices() {
      try {
        this.services = await this.$api.completedCase.list({ is_active: true })
      } catch (e) {
        this.$noty.responseError(e)
      }
    },

    openModal() {
      this.$modal.show('modalCallback', { modalTitle: 'Заявка на оказание услуги', page: 'Услуги', service: service.name });
    },

    quoteRefactor(inputString) {
      let startIndex = 0;

      while ((startIndex = inputString.indexOf('<blockquote>', startIndex)) !== -1) {
        const blockquoteEndIndex = inputString.indexOf('</blockquote>', startIndex);
        if (blockquoteEndIndex !== -1) {
          let blockquoteContent = inputString.slice(startIndex, blockquoteEndIndex);

          // Находим индекс первого и второго вхождения "<p>" внутри текущего "<blockquote>"
          const firstPIndex = blockquoteContent.indexOf('<p>');
          const secondPIndex = blockquoteContent.indexOf('<p>', firstPIndex + 1);

          if (firstPIndex !== -1 && secondPIndex !== -1) {
            // Вставляем "<div class="quoteSeparator"></div>" после первого "<p>"
            const separator = '<div class="quoteSeparator"></div>';
            blockquoteContent = blockquoteContent.slice(0, secondPIndex) + separator + blockquoteContent.slice(secondPIndex);

            // Заменяем содержимое текущего блока цитаты в исходной строке на обновленное
            inputString = inputString.slice(0, startIndex) + blockquoteContent + inputString.slice(blockquoteEndIndex);
          }
        }

        // Передвигаем стартовый индекс для поиска следующего <blockquote>
        startIndex = blockquoteEndIndex;
      }

      return inputString;
    },
  },
}
</script>

<style lang="scss" module>
.breadcrumb {
  padding-top: 0;
  padding-bottom: 32px;
  margin: 0;
}

.title {
  margin-bottom: 16px;
}

.accordion {
  max-width: 1200px;
  width: 100%;
}

:global(.quoteSeparator) {
  width: 6rem;
  height: 1px;
  margin: 1.6rem 0;
  background-color: #d8dade;
}

blockquote {
  position: relative;
  margin: 28px 0;
  padding: 35px;
  border-radius: .8rem;
  background-color: #e8e8e8;
  width: 100%;
  mix-blend-mode: multiply;

  &:after {
    content: "";
    position: absolute;
    right: 35px;
    top: 25px;
    width: 2.5rem;
    height: 1.9rem;
    background-image: url("../assets/img/icons/quote.svg");
    background-position: center;
    background-repeat: no-repeat;
  }

  @include max-w-md {
    padding: 24px;
  }

  p {
    width: calc(100% - 40px);
    margin: 0;

    u {
      font-size: 14px;
      line-height: 2;
      text-decoration: unset;
    }

    strong {
      line-height: 2;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: .2rem;
    }
  }
}

.describe {
  display: flex;
  flex-direction: column;

  iframe {
    margin: 0 auto;
  }
}
</style>
