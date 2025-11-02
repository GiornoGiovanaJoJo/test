export default ($axios) => ({
  list: (params) => $axios.$get('customers/', { params }),
})
