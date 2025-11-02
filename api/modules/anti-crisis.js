export default ($axios) => ({
  list: (params) => $axios.$get('anti_crisis/', { params }),
})
