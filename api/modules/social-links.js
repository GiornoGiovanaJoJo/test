export default ($axios) => ({
  list: (params) => $axios.$get('social_links/', { params }),
})
