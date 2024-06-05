/* eslint-disable no-void */
/* eslint-disable no-eval */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable n/handle-callback-err */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-undef */
/**  globals GM */

'use strict'
;(function () {
  const hosts = {
    default: 'localhost',
    remote: '192.168.0.121'
  }
  const url = `http://${hosts.remote}:%PORT%/bundle.user.js?${Date.now()}`
  new Promise(function loadBundleFromServer (resolve, reject) {
    const req = GM.xmlHttpRequest({
      method: 'GET',
      url,
      onload: function (r) {
        if (r.status !== 200) {
          reject(r)
          return
        }
        resolve(r.responseText)
      },
      onerror: (e) => { reject(e) }
    })
    if (req && 'catch' in req) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      req.catch((err) => {
        /* ignore */
      })
    }
  })
    .catch(function (err) {
      const log = function (obj, b) {
        let prefix = 'loadBundleFromServer: '
        try {
          prefix = GM.info.script.name + ': '
        // eslint-disable-next-line no-empty
        } catch {}
        if (b) {
          console.log(prefix + obj, b)
        } else {
          console.log(prefix, obj)
        }
      }
      if (err && 'status' in err) {
        if (err.status <= 0) {
          log('Server is not responding')
          void GM.getValue('scriptlastsource4948218', false).then(function (
            src
          ) {
            if (src) {
              log(
                '%cExecuting cached script version',
                'color: Crimson; font-size:x-large;'
              )

              eval(src)
            }
          })
        } else {
          log('HTTP status: ' + err.status)
        }
      } else {
        log(err)
      }
    })
    .then(function (s) {
      if (s) {
        eval(`${s} //# sourceURL=${url}`)
        GM.setValue('scriptlastsource4948218', s)
      }
    })
    .finally(() => void 0)
})()
