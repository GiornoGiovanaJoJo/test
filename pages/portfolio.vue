<template lang="pug">
home-cases(class-name="portfolio" page-title="Портфолио:")
</template>

<script>
import HomeCases from '~/components/home/HomeCases';
import Metatags from '~/mixins/metatags';

export default {
  name: 'PagePortfolio',
  components: {
    HomeCases,
  },
  mixins: [Metatags],
}
</script>