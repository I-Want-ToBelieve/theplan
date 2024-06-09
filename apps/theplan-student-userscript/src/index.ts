/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import { ajaxHooker } from './ajaxHooker1.3.3'

import { Manager } from 'socket.io-client'

import { isXiaoMai, isMakcooCode } from '@/utils/constant'
import { removeBadLock } from '@/features/remove-bad-lock'

const bigboy = '127.0.0.1'
const manager = new Manager(`ws://${bigboy}:3000`, {
  autoConnect: false,
  transports: ['websocket']
})
const socket = manager.socket('/')
socket.auth = { username: '' }
// socket.connect()

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



export const main = async () => {
  console.log('hello', window.location.origin, isXiaoMai, isMakcooCode)

  if (isXiaoMai) {
    //
  } else if (isMakcooCode) {
    removeBadLock()
  }

  console.log('hello end')
}

main().catch((e) => {
  console.error(e)
})
