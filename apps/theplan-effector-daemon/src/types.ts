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
    mac: string
    interface: string
  }
}

export interface ActiveingComputer extends Computer {
  student?: Student
  isAwake?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InterServerEvents {

}

export interface ServerToClientEvents {
  lock: () => void
  unlock: () => void
  openBrowserLoginTheStudent: (student: Student) => void
}

export interface ClientToServerEvents {
  lock: (student_hash_ids: string[]) => void
  unlock: (student_hash_ids: string[]) => void
  attachStudentToComputer: (student: Student) => void
  unAttachStudentToComputer: (student: Student) => void
}

export interface SocketData {
  auth: Computer | Teather
  id: string
}
