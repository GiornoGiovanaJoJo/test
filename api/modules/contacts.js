export default ($axios) => ({
  list: (params) => $axios.$get('contacts/', { params }),
})
