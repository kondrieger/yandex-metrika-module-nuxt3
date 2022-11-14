import * as _nuxt_schema from '@nuxt/schema';

interface ModuleOptions {
    id?: string;
    metrikaUrl?: string;
    accurateTrackBounce?: boolean | number;
    childIframe?: boolean;
    clickmap?: boolean;
    defer?: boolean;
    ecommerce?: boolean | string | [];
    params?: object | [];
    useRuntimeConfig?: boolean;
    useCDN?: boolean;
    userParams?: object;
    trackHash?: boolean;
    trackLinks?: boolean;
    trustedDomains?: [];
    type?: number;
    webvisor?: boolean;
    triggerEvent?: boolean;
}
declare const CONFIG_KEY = "yandexMetrika";
declare module '@nuxt/schema' {
    interface PublicRuntimeConfig {
        [CONFIG_KEY]?: ModuleOptions;
    }
}
declare const _default: _nuxt_schema.NuxtModule<ModuleOptions>;

export { ModuleOptions, _default as default };
