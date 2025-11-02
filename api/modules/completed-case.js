export default ($axios) => ({
  list: (params) => $axios.$get('completed_case/', { params }),
})
