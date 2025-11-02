export default ($axios) => ({
  list: (params) => $axios.$get('review_sources/', { params }),
})