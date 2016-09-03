export const nativeLocale   = state => state.i18n.locale.native
export const locale         = state => state.i18n.locale.current
export const locales        = state => state.i18n.locale.loaded

export const hasLocale = (state, locale) => {
    return locales(state).indexOf(locale) !== -1
}
