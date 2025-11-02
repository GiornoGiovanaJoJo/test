export default ($axios) => ({
  list: (params) => $axios.$get('performer/', { params }),
  view: (id, params) => $axios.$get(`performer/${id}/`, { params }),
})
