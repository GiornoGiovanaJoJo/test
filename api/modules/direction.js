export default ($axios) => ({
  list: (params) => $axios.$get('direction/', { params }),
})
