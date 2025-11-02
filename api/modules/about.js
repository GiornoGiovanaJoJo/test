export default ($axios) => ({
  list: (params) => $axios.$get('about/', { params }),
})
