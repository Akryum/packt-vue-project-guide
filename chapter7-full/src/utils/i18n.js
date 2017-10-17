import VueI18n from 'vue-i18n'
import langs from '../../i18n'

export async function createI18n (locale) {
  const { default: localeMessages } = await import(`../../i18n/locales/${locale}`)
  const messages = {
    [locale]: localeMessages,
  }

  // Fallback locale
  if (locale !== 'en') {
    const { default: fallbackMessages } = await import('../../i18n/locales/en')
    messages.en = fallbackMessages
  }

  const i18n = new VueI18n({
    locale,
    fallbackLocale: 'en',
    messages,
  })

  return i18n
}

export function getAutoLang () {
  let result = window.navigator.userLanguage || window.navigator.language
  if (result) {
    result = result.substr(0, 2)
  }
  if (langs.indexOf(result) === -1) {
    return 'en'
  } else {
    return result
  }
}
