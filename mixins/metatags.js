export default {
  async asyncData({ $api }) {
    try {
      const data = await $api.metatags();
      return { data };
    } catch (e) {
      console.error(e);
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
};
