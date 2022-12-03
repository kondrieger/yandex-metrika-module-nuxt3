# Yandex Metrika for Nuxt 3
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

## Disclaimer

This package is a fork for those who don't want to wait for the official release of a Yandex Metrika module.

The module was created by Nuxt Community and rewritten by dankerow to support Nuxt 3. All credit belongs to:

- [Official Nuxt Community module for Yandex Metrika](https://github.com/nuxt-community/yandex-metrika-module)
- [dankerow's fork of Yandex Metrika to support Nuxt 3](https://github.com/dankerow/yandex-metrika-module)

> This package includes precompiled scripts to let people integrate Yandex Metrika into their project. There's no need to compile anything, it is ready to be used out of the box.

## Route change events by default

This module automatically sends first page and route change events to Yandex Metrika.

**Note:** Yandex Metrika is not enabled in dev mode.
You can set environment variable `NODE_ENV` to `production` for testing in dev mode.

## Setup

- Add `yandex-metrika-module-nuxt3` dependency using yarn or npm to your project
- Add `yandex-metrika-module-nuxt3` to `modules` section of `nuxt.config.js`

```js
{
  modules: ['yandex-metrika-module-nuxt3']
}
```

## Configure

You can pass options directly in module declaration:

```ts
{
  modules: [
    [
      'yandex-metrika-module-nuxt3',
      {
        id: 'XXXXXX',
        webvisor: true,
        // consoleLog: true,
        // clickmap: true,
        // useCDN: false,
        // trackLinks: true,
        // accurateTrackBounce: true,
      }
    ]
  ]
}
```

Or you can specify `yandexMetrika` key:

```ts
{
  modules: ['yandex-metrika-module-nuxt3'],
  yandexMetrika: {
    id: 'XXXXXX',
    // ...
  }
}
```

In Nuxt 2.13+, you can also use public runtime config:

```js
{
  modules: ['yandex-metrika-module-nuxt3'],
  publicRuntimeConfig: {
    yandexMetrika: {
      id: process.env.YANDEX_METRIKA_ID,
      // ...
    }
  }
}
```

## Options

For more information:
- [Documentation for Ya.Metrika](https://yandex.com/support/metrica/code/counter-initialize.html)
- [hit method](https://yandex.com/support/metrica/objects/hit.html)

| Name                | Default value | Type    | Description                                                                                                                                      |
|---------------------|---------------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| accurateTrackBounce | true          | Boolean | Number                                                                                                                                           |Accurate bounce rate The parameter can accept these values:  true — Enable the accurate bounce rate, with a non-bounce event registered after 15000 ms (15 s). false — Don't enable the accurate bounce rate. <N> (integer) — Enable the accurate bounce rate. Non-bounce events are recorded after <N> ms.|
| childIframe         | false         | Boolean | Whether to record iframe contents without a tag in a child window                                                                                |
| clickmap            | true          | Boolean | Whether to collect data for a click map                                                                                                          |
| defer               | false         | Boolean | Whether to disable automatically sending data during tag initialization                                                                          |
| ecommerce           | false         | Boolean | String                                                                                                                                           | Array|Collect data for e-commerce — Ecommerce.  true — Enable e-commerce data collection. Data is transmitted via a JavaScript array named dataLayer in the global namespace (window.dataLayer) false — Disable Ecommerce data collection. <objectName> (String) — Enable Ecommerce data collection. Data is transmitted via a JavaScript array named <objectName> in the global namespace (window.<objectName>) <array> (Array) — Enable Ecommerce data collection. Data is transmitted via a JavaScript <array>|
| params              | —             | Object  | Array                                                                                                                                            |Session parameters transmitted during tag initialization To transmit session parameters at any other time, use the params method|
| userParams          | —             | Object  | Parameters of site users that are transmitted when initializing the tag To transmit user parameters at any other time, use the userParams method |
| trackHash           | false         | Boolean | Hash tracking in the browser's address bar                                                                                                       |
| trackLinks          | true          | Boolean | Track clicks on outbound links                                                                                                                   |
| trustedDomains      | —             | Array   | Indicates a trusted domain for recording the contents of a child iframe. Contains the domain address of the parent window                        |
| type                | 0             | Number  | Tag type. 1 for YAN                                                                                                                              |
| webvisor            | false         | Boolean | Whether to use Session Replay                                                                                                                    |
| triggerEvent        | false         | Boolean | Whether to check if the tag is ready                                                                                                             |

## Development

- Clone this repository
- Install dependencies using `yarn install`
- Run `yarn dev:prepare` to generate type stubs.
- Use `yarn dev` to start [playground](./playground) in development mode.

## License

[MIT License](./LICENSE)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/yandex-metrika-module-nuxt3/latest.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/yandex-metrika-module-nuxt3

[npm-downloads-src]: https://img.shields.io/npm/dt/yandex-metrika-module-nuxt3.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/yandex-metrika-module-nuxt3

[license-src]: https://img.shields.io/npm/l/yandex-metrika-module-nuxt3.svg?style=flat-square
[license-href]: https://npmjs.com/package/yandex-metrika-module-nuxt3
