import { type ClientToServerEvents, type InterServerEvents, type ServerToClientEvents, type SocketData } from '@/types'
import { Server } from 'socket.io'

import { $ } from 'execa'

const io = new Server<
ClientToServerEvents,
ServerToClientEvents,
InterServerEvents,
SocketData
>(3000, {
  // options
  cors: {
    origin: ['https://gui.makcoocode.com']
  }
})

io.on('connection', (socket) => {
  socket.emit('noArg')
  // ...
  socket.on('hello', () => {
    $`Rundll32.exe user32.dll,LockWorkStation`
  })

  socket.on('ping', (cb) => {
    console.log('ping')
    cb()
  })
})
