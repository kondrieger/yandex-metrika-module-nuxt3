
import { ModuleOptions } from './module'

declare module '@nuxt/schema' {
  interface NuxtConfig { ['yandexMetrika']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['yandexMetrika']?: ModuleOptions }
}


export { default } from './module'
