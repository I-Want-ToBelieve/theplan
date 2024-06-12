/* eslint-disable @typescript-eslint/indent */
import {
  type ClientToServerEvents,
  type ServerToClientEvents,
  type SocketData
} from '@/types'
import { Server } from 'socket.io'

// import { $ } from 'execa'

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  SocketData
>(12178, {
  // options
  cors: {
    origin: ['*']
  }
})

io.on('connection', socket => {
  console.log(socket.id
    , socket.data, socket.handshake.auth)
})
