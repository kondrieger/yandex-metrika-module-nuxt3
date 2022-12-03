import { defineNuxtPlugin } from "#app";
import { useRouter } from "#imports";
import options from "#build/yandex-metrika.options.mjs";
export default defineNuxtPlugin(async ({ _ }) => {
  const { id, isDev, consoleLog, metrikaUrl, ...metrikaOptions } = await options();
  let ready = false;
  useRouter().isReady().then(() => {
    ready = true;
  });
  function create() {
    if (!ready) {
      if (consoleLog) {
        console.log(`Yandex Metrika initialized in ${isDev ? "development" : "production"} mode. Metrika URL: ${metrikaUrl}`);
      }
      if (!isDev) {
        (function(m, e, t, r, i, k, a) {
          m[i] = m[i] || function() {
            (m[i].a = m[i].a || []).push(arguments);
          };
          m[i].l = 1 * new Date();
          k = e.createElement(t);
          a = e.getElementsByTagName(t)[0];
          k.async = 1;
          k.src = r;
          a.parentNode.insertBefore(k, a);
        })(window, document, "script", metrikaUrl, "ym");
        ym(id, "init", metrikaOptions);
      }
    }
    useRouter().afterEach((to, from) => {
      if (consoleLog) {
        console.log(`Yandex Metrika page hit: ${to.fullPath}`);
      }
      if (!isDev) {
        ym(id, "hit", to.fullPath, {
          referer: from.fullPath,
          title: to.meta.title
        });
      }
    });
  }
  if (window.ym === void 0) {
    create();
  }
});
