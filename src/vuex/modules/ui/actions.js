import mutations from './mutations'

export const openNavDrawer = ({commit}) => {
    commit(mutations.OPEN_NAV_DRAWER)
}
export const closeNavDrawer = ({commit}) => {
    commit(mutations.CLOSE_NAV_DRAWER)
}
