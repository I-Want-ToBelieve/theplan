/* eslint-disable @typescript-eslint/explicit-function-return-type */
import os from 'node:os'

export const getIpv4AndMac = () => {
  for (const [k, v] of Object.entries(
    os.networkInterfaces()
  )) {
    const r = v?.find(it => {
      return (
        !it.internal &&
        it.family === 'IPv4' &&
        it.address !== '127.0.0.1'
      )
    })

    if (r) {
      return {
        mac: r.mac,
        ipv4: r.address,
        interface: k
      }
    }
  }

  return {
    mac: '',
    ipv4: '',
    interface: ''
  }
}
