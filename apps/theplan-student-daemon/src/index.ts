/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/indent */
import {
  type ClientToServerEvents,
  type ServerToClientEvents,
  type SocketData
} from '@/types'
import { Server } from 'socket.io'

// import { $ } from 'execa'
import { io } from 'socket.io-client'
import { getIpv4AndMac } from '@/utils'

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
  const studentIO = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    SocketData
  >(12177, {
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

    studentSocket.on('disconnect', async () => {
      // should emit unattch a user for this computer to bigboy
    })
  })
})

bigboySocket.on('disconnect', () => {
  console.log('disconnect')
})
