export default ($axios) => ({
  list: (params) => $axios.$get('education/', { params }),

  stage: {
    list: (params) => $axios.$get('education_stage/', { params }),
  },
})
