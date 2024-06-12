/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import { ajaxHooker } from './ajaxHooker1.3.3'

import { Manager } from 'socket.io-client'

import { isXiaoMai, isMakcooCode } from '@/utils/constant'
import { removeBadLock } from '@/features/remove-bad-lock'
import { observableMemberInit } from '@/features/hooks/hook-member-init'

const local = '127.0.0.1'
const manager = new Manager(`ws://${local}:12177`, {
  autoConnect: false,
  transports: ['websocket']
})
const socket = manager.socket('/')

socket.on('connect', () => {
  console.log(`connect ${socket.id}`)
})

socket.on('disconnect', () => {
  console.log('disconnect')
})

export const main = async () => {
  console.log('hello', window.location.origin, isXiaoMai, isMakcooCode)

  if (isXiaoMai) {
    //
  } else if (isMakcooCode) {
    removeBadLock()
    // 学生登录通知给中转机
    observableMemberInit.subscribe((v) => {
      socket.disconnect()
      const json = JSON.parse(v.response)

      const data = json.data
      console.log(json)

      const { user_info: userInfo } = data

      socket.auth = { role: 'student', info: userInfo }

      socket.connect()
    })
  }

  console.log('hello end')
}

main().catch((e) => {
  console.error(e)
})
