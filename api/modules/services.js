export default ($axios) => ({
  list: (params) => $axios.$get('services/', { params }),
})
