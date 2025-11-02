export default ($axios) => ({
  list: (params) => $axios.$get('reviews/', { params }),
})