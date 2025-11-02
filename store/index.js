export const state = () => ({
  activePages: [],
})

export const getters = {
  activePagesProcessed: (state) => {
    return state.activePages.map((item) => item.name)
  },
}

export const mutations = {
  SET_ACTIVE_PAGES(state, data) {
    state.activePages = data
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const data = await this.$axios.$get('list_actives/')
    commit('SET_ACTIVE_PAGES', data)
  },
}
