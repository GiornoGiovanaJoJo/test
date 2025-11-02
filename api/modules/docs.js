export default ($axios) => ({
  list: (params) => $axios.$get('docs/', { params }),
})
