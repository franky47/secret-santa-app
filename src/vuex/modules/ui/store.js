import ui from './mutations'

const state = {
    navDrawerOpen: false
}

const mutations = {
    [ui.OPEN_NAV_DRAWER]: state => {
        state.navDrawerOpen = true
    },
    [ui.CLOSE_NAV_DRAWER]: state => {
        state.navDrawerOpen = false
    }
}

export default {
    state,
    mutations
}
