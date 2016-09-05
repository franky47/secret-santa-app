import mutations from './mutations'

export const openNavDrawer = ({dispatch}) => {
    dispatch(mutations.OPEN_NAV_DRAWER)
}
export const closeNavDrawer = ({dispatch}) => {
    dispatch(mutations.CLOSE_NAV_DRAWER)
}
