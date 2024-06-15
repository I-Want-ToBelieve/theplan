/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/indent */
import { Server } from 'socket.io'

// import { $ } from 'execa'
import { io } from 'socket.io-client'
import { getIpv4AndMac } from '@/utils'
import { $ } from 'execa'

// create a bigboy client
const bigboy = '192.168.0.121'
// auth the client
const bigboySocket = io(`ws://${bigboy}:12178`, {
  auth: {
    role: 'computer',
    info: {
      ...getIpv4AndMac()
    }
  }
})

bigboySocket.on('connect', () => {
  console.log(`connect ${bigboySocket.id}`, getIpv4AndMac())

  // when connected the bigboy serve, start server for student userscript
  const studentIO = new Server(12177, {
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

  studentIO.on('connection', studentSocket => {
    // should emit attch a user for this computer to bigboy
    console.log(
      studentSocket.id,
      studentSocket.data,
      studentSocket.handshake.auth
    )

    if (studentSocket.handshake.auth?.role === 'student') {
      bigboySocket.emit('attachStudentToComputer', studentSocket.handshake.auth)
    }

    studentSocket.on('disconnect', async () => {
      // should emit unattch a user for this computer to bigboy
      // bigboySocket.emit('unAttachStudentToComputer', studentSocket.handshake.auth)
    })
  })
})

bigboySocket.on('lock', async () => {
  console.log('bigboySocket lock')
  await $`loginctl lock-session`
})

bigboySocket.on('unlock', async () => {
  console.log('bigboySocket unlock')
  await $`loginctl unlock-session`
})

bigboySocket.on('disconnect', () => {
  console.log('bigboySocket disconnect')
})
