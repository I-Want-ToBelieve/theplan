/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { io } from 'socket.io-client'

export const createBigBoyClient = (_user: Record<any, any>) => {
  const bigboy = '192.168.0.121'
  const socket = io(`ws://${bigboy}:12178`)

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
}
