/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import { ajaxHooker } from './ajaxHooker1.3.3'
import { observe } from '@violentmonkey/dom'

import { Manager } from 'socket.io-client'

const manager = new Manager('ws://127.0.0.1:3000')
const socket = manager.socket('/')

socket.on('connect', () => {
  console.log(`connect ${socket.id}`)
})

setInterval(() => {
  socket.emit('ping', () => {
    console.log('pong')
  })
}, 10000)

socket.on('disconnect', () => {
  console.log('disconnect')
})

setTimeout(() => {
  socket.emit('hello')
}, 15000)

export const isXiaoMai = window.location.origin === 'https://b.xiaomai5.com'
export const isMakcooCode = window.location.origin.includes('makcoocode.com')

export const main = async () => {
  console.log('hello', window.location.origin, isXiaoMai, isMakcooCode)

  if (isXiaoMai) {
    //
  } else if (isMakcooCode) {
    const timer = setInterval(() => {
      const node = document.querySelector('.share > div:nth-child(1)')

      if (node && node.textContent === '认真听课，不要动鼠标哦') {
        node.remove()
      }
    }, 1e3)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const disconnect = observe(document.body, () => {
      // Find the target node
      const node = document.querySelector('.share > div:nth-child(1)')

      if (node && node.textContent === '认真听课，不要动鼠标哦') {
        window.clearInterval(timer)
        node.remove()
      }
    })
  }

  console.log('hello end')
}

main().catch((e) => {
  console.error(e)
})
