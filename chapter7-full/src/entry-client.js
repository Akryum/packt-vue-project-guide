import { createApp } from './app'
import { getAutoLang } from './utils/i18n'

const locale = getAutoLang()
createApp({
  locale,
})
