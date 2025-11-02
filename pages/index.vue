<template>
  <div>
    <home-nav
      :active-section="activeSection"
      @prev-section="prevSection"
      @next-section="nextSection"
    />

    <div v-if="isDesktop">
      <full-page
        ref="fullpage"
        :options="fullPageOptions"
        id="fullpage"
      >
        <home-intro
          :about="about"
          :services="services"
          class="section fp-noscroll"
        />

        <home-cases-teaser
          :jobs="jobs"
          class="section fp-noscroll"
        />

        <home-clients
          :customers="customers"
          :directions="directions"
          class="section fp-noscroll"
        />

        <home-reviews
          :reviews="reviews"
          class="section fp-noscroll"
        />

        <home-can
          :can="can"
          class="section fp-noscroll"
        />

        <home-feedback class="section" />
      </full-page>

      <app-footer class="mobile-footer" />
    </div>

    <div v-else>
      <home-intro
        :about="about"
        :services="services"
      />

      <home-cases-teaser :jobs="jobs"/>

      <home-clients
        :customers="customers"
        :directions="directions"
      />

      <home-reviews :reviews="reviews"/>

      <home-can :can="can"/>

      <home-feedback/>
    </div>
  </div>
</template>

<script>
import AppFooter from '~/components/app/AppFooter'
import HomeCan from '~/components/home/HomeCan'
import HomeCasesTeaser from '~/components/home/HomeCasesTeaser'
import HomeClients from '~/components/home/HomeClients'
import HomeFeedback from '~/components/home/HomeFeedback'
import HomeIntro from '~/components/home/HomeIntro'
import HomeNav from '~/components/home/HomeNav'
import HomeReviews from '~/components/home/HomeReviews'
import HomeTeam from '~/components/home/HomeTeam'

export default {
  name: 'PageIndex',
  layout: 'decor',
  components: {
    AppFooter,
    HomeCasesTeaser,
    HomeClients,
    HomeFeedback,
    HomeIntro,
    HomeNav,
    HomeTeam,
    HomeCan,
    HomeReviews,
  },

  async asyncData({ app }) {
    try {
      const [about, services, jobs, customers, directions, reviews, can, data] = await Promise.all([
        app.$api.about.list({
          is_active: true,
          region: 'ru',
        }),
        app.$api.services.list({ is_active: true }),
        app.$api.job.list({ is_active: true, is_showing_main_page: true }),
        app.$api.customers.list({ is_active: true }),
        app.$api.direction.list({ is_active: true }),
        app.$api.reviews.list({ is_active: true, is_showing_main_page: true }),
        app.$api.can(),
        app.$api.metatags(),
      ]);

      return {
        about,
        services,
        jobs,
        customers,
        directions,
        reviews,
        can,
        data,
      };
    } catch (e) {
      app.$noty.responseError(e);
    }
  },

  data() {
    return {
      activeSection: '',
      fullPageOptions: {
        licenseKey: '7C2262BC-E6044700-BA605146-B340179C',
        anchors: ['intro', 'cases', 'clients', 'reviews', 'can', 'feedback'],
        onLeave: this.onLeave,
        normalScrollElements: '.scrollable-content',
        verticalCentered: false,
        scrollOverflow: true,
      },

      isDesktop: true,

      about: null,
      services: null,
      jobs: null,
      customers: null,
      directions: null,
      reviews: null,
      can: null,
      data: null,
    }
  },

  head() {
    if (!this.data) {
      return {};
    }
    const path = this.$nuxt.$route.path
    const canonicalHref = 'https://russianlion.ru' + path;
    const metatags = this.data.find(item => item.page === path)

    const schemaData = metatags ? {
      "@context": "https://schema.org/",
      "@type": "WebPage",
      "name": metatags.og_title ?? "Русский Лев",
      "description": metatags.description ?? "",
      "url": canonicalHref
    } : {};

    if (metatags) {
      return {
        title: metatags.og_title ?? "Русский Лев",
        link: [{ rel: 'canonical', href: canonicalHref }],
        meta: [
          metatags.og_title ? { hid: 'title', name: 'title', content: metatags.og_title } : {},
          metatags.description ? { hid: 'description', name: 'description', content: metatags.description } : {},
          metatags.keywords ? { hid: 'keywords', name: 'keywords', content: metatags.keywords } : {},
          metatags.og_title ? { hid: 'og:title', property: 'og:title', content: metatags.og_title } : {},
          metatags.og_image ? { hid: 'og:image', property: 'og:image', content: metatags.og_image } : {},
          metatags.description ? { hid: 'og:description', property: 'og:description', content: metatags.description } : {},
          metatags.keywords ? { hid: 'og:keywords', property: 'og:keywords', content: metatags.keywords } : {},
          { hid: 'og:type', property: 'og:type', content: 'website' },
          { hid: 'og:url', property: 'og:url', content: canonicalHref }
        ],
        script: [
          {
            type: 'application/ld+json',
            json: schemaData
          }
        ]
      };
    }
    else {
      return { link: [{ rel: 'canonical', href: canonicalHref }] };
    }
  },

  async mounted() {
    this.checkIfDesktop();
    if (this.isDesktop) {
      await this.$nextTick()
      this.activeSection = this.$refs.fullpage.api.getActiveSection().anchor
    }

    window.addEventListener('resize', this.checkIfDesktop);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.checkIfDesktop);
  },

  methods: {
    checkIfDesktop() {
      this.isDesktop = window.innerWidth > 1000;
    },

    onLeave(origin, destination) {
      this.activeSection = destination.anchor
    },
    prevSection() {
      this.$refs.fullpage.api.moveSectionUp()
    },
    nextSection() {
      this.$refs.fullpage.api.moveSectionDown()
    },
  },
}
</script>

<style lang="scss" scoped>
.mobile-footer {
  display: none;

  @include max-w-md {
    display: block;
  }
}
</style>
