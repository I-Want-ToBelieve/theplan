/* eslint-disable @typescript-eslint/indent */
import {
  type ClientToServerEvents,
  type InterServerEvents,
  type ServerToClientEvents,
  type SocketData
} from '@/types'
import { Server } from 'socket.io'

// import { $ } from 'execa'

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(12178, {
  // options
  cors: {
    origin: ['www.makcoocode.com']
  }
})

io.on('connection', socket => {
  console.log(socket.id
    , socket.data, socket.handshake.auth)

  socket.emit('noArg')
  // ...
  socket.on('hello', () => {
    console.log('world')
  })

  socket.on('ping', cb => {
    console.log('ping')
    cb()
  })
})
