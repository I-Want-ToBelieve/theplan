/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import { ajaxHooker } from './ajaxHooker1.3.3'

import { Manager } from 'socket.io-client'

import { isXiaoMai, isMakcooCode } from '@/utils/constant'
import { batchAddStudent } from '@/features/batch-add-student'
import { observableMemberInit } from '@/features/hooks/hook-member-init'

const bigboy = '192.168.0.121'
const manager = new Manager(`ws://${bigboy}:12178`, {
  autoConnect: false,
  transports: ['websocket']
})
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

export const main = async () => {
  console.log('hello', window.location.origin, isXiaoMai, isMakcooCode)

  if (isXiaoMai) {
    //
  } else if (isMakcooCode) {
    batchAddStudent()
    observableMemberInit.subscribe((v: any) => {
      socket.disconnect()
      const json = JSON.parse(v.response)

      const data = json.data
      console.log(json)

      const { user_info: userInfo } = data

      socket.auth = { userInfo }

      socket.connect()
    })
  }

  console.log('hello end')
}

void main()
