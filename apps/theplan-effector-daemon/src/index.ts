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
import { schools } from '@/data/rooms'

const store = new Store()
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(12178, {
  connectionStateRecovery: {
    // the backup duration of the sessions and the packets
    maxDisconnectionDuration: 2 * 60 * 1000,
    // whether to skip middlewares upon successful recovery
    skipMiddlewares: true
  },
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

  socket.on('lock', (studentHashIds) => {
    console.log('lock lock lock studentHashIds:', studentHashIds)
    for (const id of studentHashIds) {
      for (const mac of store.getMacsByStudentHashId(id)) {
        io.to(mac).emit('lock')
      }
    }
  })

  socket.on('unlock', (studentHashIds) => {
    console.log('unlock unlock unlock studentHashIds:', studentHashIds)
    for (const id of studentHashIds) {
      for (const mac of store.getMacsByStudentHashId(id)) {
        io.to(mac).emit('unlock')
      }
    }
  })

  socket.on('openBrowserLoginTheStudent', (students) => {
    console.log('openBrowserLoginTheStudent students:', students)
    const schoolsOne = schools.one
    const room = schoolsOne.rooms['10']

    const hosts = room.hosts
    const hostsMaxIndex = hosts.length - 1

    for (const [index, it] of students.entries()) {
        const host = hosts[Math.min(index, hostsMaxIndex)]
        console.log('host.mac host.mac', host.mac)
        // should wake up first
        io.to(host.mac.toLowerCase()).emit('openBrowserLoginTheStudent', it)
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
