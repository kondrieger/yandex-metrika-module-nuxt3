import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { useLogger, defineNuxtModule, addTemplate, isNuxt2, addPlugin } from '@nuxt/kit';

function isObject(val) {
  return val !== null && typeof val === "object";
}
function _defu(baseObj, defaults, namespace = ".", merger) {
  if (!isObject(defaults)) {
    return _defu(baseObj, {}, namespace, merger);
  }
  const obj = Object.assign({}, defaults);
  for (const key in baseObj) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const val = baseObj[key];
    if (val === null || val === void 0) {
      continue;
    }
    if (merger && merger(obj, key, val, namespace)) {
      continue;
    }
    if (Array.isArray(val) && Array.isArray(obj[key])) {
      obj[key] = obj[key].concat(val);
    } else if (isObject(val) && isObject(obj[key])) {
      obj[key] = _defu(val, obj[key], (namespace ? `${namespace}.` : "") + key.toString(), merger);
    } else {
      obj[key] = val;
    }
  }
  return obj;
}
function extend(merger) {
  return (...args) => args.reduce((p, c) => _defu(p, c, "", merger), {});
}
const defu = extend();
defu.fn = extend((obj, key, currentValue, _namespace) => {
  if (typeof obj[key] !== "undefined" && typeof currentValue === "function") {
    obj[key] = currentValue(obj[key]);
    return true;
  }
});
defu.arrayFn = extend((obj, key, currentValue, _namespace) => {
  if (Array.isArray(obj[key]) && typeof currentValue === "function") {
    obj[key] = currentValue(obj[key]);
    return true;
  }
});
defu.extend = extend;

const name = "@nuxtjs/yandex-metrika";
const version = "1.4.0";

const logger = useLogger("nuxt:yandex-metrika");

const CONFIG_KEY = "yandexMetrika";
const module = defineNuxtModule({
  meta: {
    name,
    version,
    configKey: CONFIG_KEY,
    compatibility: {
      bridge: true
    }
  },
  defaults: {
    metrikaUrl: "https://mc.yandex.ru/metrika",
    accurateTrackBounce: true,
    childIframe: false,
    clickmap: true,
    defer: false,
    useRuntimeConfig: false,
    trackHash: false,
    trackLinks: true,
    type: 0,
    webvisor: false,
    triggerEvent: false
  },
  setup(options, nuxt) {
    if (nuxt.options.dev && process.env.NODE_ENV !== "production") {
      logger.info("Module not enabled because you are in dev mode.");
      return;
    }
    if (!options.id) {
      logger.error("No id provided.");
    }
    options.metrikaUrl = (options.useCDN ? "https://cdn.jsdelivr.net/npm/yandex-metrica-watch" : options.metrikaUrl) + "/tag.js";
    if (options.useRuntimeConfig) {
      nuxt.options.publicRuntimeConfig[CONFIG_KEY] = defu(nuxt.options.publicRuntimeConfig[CONFIG_KEY], options);
    }
    addTemplate({
      filename: "yandex-metrika.options.mjs",
      getContents: () => {
        return `export default () => Promise.resolve(${JSON.stringify(options.useRuntimeConfig ? nuxt.options.publicRuntimeConfig[CONFIG_KEY] : options || {})})`;
      }
    });
    const getMeta = () => {
      return isNuxt2() ? nuxt.options.head : nuxt.options.meta || [];
    };
    getMeta().link.push({
      href: options.metrikaUrl,
      rel: "preload",
      as: "script"
    });
    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
    addPlugin({
      src: resolve(runtimeDir, "plugin"),
      mode: "client"
    });
  }
});

export { module as default };
