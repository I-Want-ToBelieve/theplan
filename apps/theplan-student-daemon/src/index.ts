/* eslint-disable @typescript-eslint/indent */
import {
  type ClientToServerEvents,
  type InterServerEvents,
  type ServerToClientEvents,
  type SocketData
} from '@/types'
import { Server } from 'socket.io'

import { $ } from 'execa'

import { createBigBoyClient } from '@/client'

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(12177, {
  // options
  cors: {
    origin: ['https://gui.makcoocode.com']
  }
})

io.on('connection', socket => {
  console.log(socket.id
    , socket.data, socket.handshake.auth)

  socket.emit('noArg')
  // ...
  socket.on('hello', () => {
    $`loginctl lock-session 1`
  })

  socket.on('ping', cb => {
    console.log('ping')
    cb()
  })
})

createBigBoyClient({})
