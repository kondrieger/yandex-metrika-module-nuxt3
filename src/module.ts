import { fileURLToPath } from 'url'
import { resolve } from 'pathe'
import { defineNuxtModule, addPlugin, addTemplate, useLogger } from '@nuxt/kit'
import { ModuleOptions } from '@nuxt/schema'
import defu from 'defu'

export interface YandexMetrikaModuleOptions extends ModuleOptions {
  id?: string,
  metrikaUrl?: string,
  accurateTrackBounce?: boolean | number,
  childIframe?: boolean,
  clickmap?: boolean,
  defer?: boolean,
  ecommerce?: boolean | string | [],
  params?: object | [],
  useRuntimeConfig?: boolean,
  useCDN?: boolean,
  userParams?: object,
  trackHash?: boolean,
  trackLinks?: boolean,
  trustedDomains?: [],
  type?: number,
  webvisor?: boolean,
  triggerEvent?: boolean,
}

const logger = useLogger('nuxt:yandex-metrika')
const CONFIG_KEY = 'yandexMetrika'

export default defineNuxtModule<YandexMetrikaModuleOptions>({
  meta: {
    name: 'yandex-metrika-module-nuxt3',
    configKey: CONFIG_KEY,
    compatibility: {
      nuxt: '>=3.0.0'
    }
  },
  defaults: {
    id: process.env.YANDEX_METRIKA_ID,
    metrikaUrl: 'https://mc.yandex.ru/metrika',
    accurateTrackBounce: true,
    childIframe: false,
    clickmap: true,
    defer: false,
    useRuntimeConfig: true,
    trackHash: false,
    trackLinks: true,
    type: 0,
    webvisor: false,
    triggerEvent: false
  },
  setup (options: ModuleOptions, nuxt) {
    // Don't include on dev mode
    if (nuxt.options.dev && process.env.NODE_ENV !== 'production') {
      logger.info('Module not enabled because you are in dev mode.')
      return
    }

    if (!options.id) {
      logger.error('No id provided.')
    }

    // Adds https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js
    options.metrikaUrl = (options.useCDN ? 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch' : options.metrikaUrl) + '/tag.js'

    if (options.useRuntimeConfig) {
      nuxt.options.runtimeConfig.public[CONFIG_KEY] = defu(nuxt.options.runtimeConfig.public[CONFIG_KEY], options)
    }

    addTemplate({
      filename: 'yandex-metrika.options.mjs',
      getContents: () => {
        return `export default () => Promise.resolve(${JSON.stringify(
          options.useRuntimeConfig ? nuxt.options.runtimeConfig.public[CONFIG_KEY] : options || {}
        )})`
      }
    })

    const getMeta = () => {
      nuxt.options.app.head.link = nuxt.options.app.head.link || []
      return nuxt.options.app.head
    }

    // Script preload
    const head = nuxt.options.app.head
    if (!head.link) {
      head.link = []
    }

    head.link.push({
      href: options.metrikaUrl,
      rel: 'preload',
      as: 'script'
    })

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

    // Register plugin
    addPlugin({
      src: resolve(runtimeDir, 'plugin'),
      mode: 'client'
    })
  }
})
