/* eslint-disable @typescript-eslint/indent */
import {
  type Computer,
  type Teather,
  type ClientToServerEvents,
  type ServerToClientEvents,
  type InterServerEvents,
  type SocketData
} from '@/types'
import { Server } from 'socket.io'
import { Store } from '@/store'

// import { $ } from 'execa'

const store = new Store()
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(12178, {
  // options
  cors: {
    origin: ['*']
  }
})

io.use((socket, next) => {
  const role = socket.handshake.auth.role

  socket.data.id = role === 'computer' ? socket.handshake.auth.info.mac : socket.handshake.auth.info.hash_id
  if (!role) {
    next(new Error('invalid role')); return
  }
  next()
})

io.on('connection', async socket => {
  socket.on('attachStudentToComputer', (student) => {
    console.log('attachStudentToComputer', student)
    store.attachStudentToComputer(socket.data.id, student)
  })

  socket.on('unAttachStudentToComputer', (student) => {
    console.log('unAttachStudentToComputer', student)
    store.unAttachStudentToComputer(socket.data.id, student)
  })

  socket.on('lock', (studentHashIds) => {
    for (const id of studentHashIds) {
      for (const mac of store.getMacsByStudentHashId(id)) {
        io.in(mac).emit('lock')
      }
    }
  })

  socket.on('unlock', (studentHashIds) => {
    for (const id of studentHashIds) {
      for (const mac of store.getMacsByStudentHashId(id)) {
        io.in(mac).emit('unlock')
      }
    }
  })

  console.log(socket.id
    , socket.data, socket.handshake.auth)
    const { role } = socket.handshake.auth as Teather | Computer

   switch (role) {
    case 'computer':
      await socket.join(socket.data.id)
      store.addComputer(socket.handshake.auth as Computer)
      break
    case 'teather':
      await socket.join(socket.data.id)
      store.addTeather(socket.handshake.auth as Teather)
      break

    default:
      break
   }
   console.log('store store store', store)
})
