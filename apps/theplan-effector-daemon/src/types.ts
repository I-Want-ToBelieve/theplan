export interface Student {
  role: 'student'
  info: {
    hash_id: string
    userid: number
    username: string
    real_name: string
  }
}

export interface Teather {
  role: 'teather'
  info: {
    hash_id: string
    userid: number
    username: string
    real_name: string
  }
}

export interface Computer {
  role: 'computer'
  info: {
    ipv4: string
    mac: number
    interface: string
  }
}

export interface ActiveingComputer extends Computer {
  student?: Student
  isAwake?: boolean
}

export interface ServerToClientEvents {
  lock: () => void
  unlock: () => void
  openBrowserLoginTheStudent: (student: Student) => void
}

export interface ClientToServerEvents {
  attachStudentToComputer: (student: Student) => void
}

export interface SocketData {
  auth: Computer | Teather
}
