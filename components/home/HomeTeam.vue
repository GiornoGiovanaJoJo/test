<template>
  <div class="team__list-wrapper">
    <div class="row justify-content-md-center">
      <div
        class="col-12 col-md-6 col-lg-4 col-xl-3"
        :class="$style.teamItem"
        v-for="item in team"
        :key="item.id"
      >
        <TeamItem :item="item"/>
      </div>
    </div>

    <div :class="['row', $style.textWrapper]">
      <div :class="$style.textBlock">
        <p :class="$style.textPart">
          В&nbsp;нашей компании работает сильная команда профессионалов, с&nbsp;большим опытом. Мы&nbsp;сформировали дружный коллектив сотрудников из&nbsp;разных сфер медиа-индустрии. Это позволяет нам гарантировать выполнение любых задач видеопрозводства на&nbsp;высокопрофессиональном уровне.
        </p>

        <p :class="$style.textPart">
          Наша команда знает, что видео является эффективным инструментом продвижения любого бизнеса. Создавая видеоконтент, мы акцентируем внимание на том, что выполненная работа будет продуктом высокого уровня, понятным своей целевой аудитории и отвечающим поставленным целям и задачам.
        </p>

        <p :class="$style.textPart">
          Состав съемочной группы от&nbsp;проекта к&nbsp;проекту может различаться, но&nbsp;в&nbsp;нашей компании есть сотрудники отвечающие за&nbsp;основные этапы проектов с&nbsp;самого начала и&nbsp;до&nbsp;финального кадра.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import TeamItem from '~/components/team/TeamItem';

export default {
  name: 'HomeTeam',

  components: {
    TeamItem,
  },

  data() {
    return {
      team: [],
    }
  },

  computed: {
    teamFiltered() {
      return this.team.filter((item) => item.is_active);
    },
  },

  async created() {
    await this.loadTeam();
  },

  methods: {
    async loadTeam() {
      try {
        this.team = await this.$api.performer.list({ is_active: true });
      } catch (e) {
        this.$noty.responseError(e);
      }
    },
  },
}
</script>

<style lang="scss" module>
  .teamItem {
    @include max-w-md {
      margin-bottom: 24px;
    }
  }

  .textWrapper {
    display: flex;
    justify-content: center;

    @include max-w-md {
      padding: 0 16px;
    }
  }

  .textBlock {
    width: 75%;
    padding: 30px 0;
    background: #e8e8e8;
    border-radius: 15px;
    margin-top: 50px;
    display: flex;
    justify-content: center;

    @include max-w-md {
      width: 100%;
      flex-direction: column;
    }

    @media (max-width: 1200px) {
      width: 100%;
    }
  }

  .textPart {
    width: calc(100% / 3);
    padding: 0 16px;
    font-size: 14px;
    font-weight: 300;
    margin-bottom: 0;

    @include max-w-md {
      width: 100%;
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
