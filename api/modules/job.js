export default ($axios) => ({
  list: (params) => $axios.$get('job/', { params }),
  showVideo: (id) => $axios.$get(`job/${id}/show_video/`, { responseType: 'blob' }),
})
