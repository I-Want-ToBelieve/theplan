/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Student, type Teather, type ActiveingComputer } from '@/types'

export class Store {
  // public students: Student[] = []
  public teather: Teather[] = []
  public computer: ActiveingComputer[] = []

  public attachStudentToComputer (mac: string, student: Student) {
    this.computer = this.computer.map((it) => {
      if (it.info.mac === mac) {
        return {
          ...it,
          student
        }
      }

      return it
    })
  }

  public unAttachStudentToComputer (mac: string, _student: Student) {
    this.computer = this.computer.map((it) => {
      if (it.info.mac === mac) {
        return {
          ...it,
          student: undefined
        }
      }

      return it
    })
  }

  /**
   * changeComputerAwakeState
  */
  public changeComputerAwakeState (mac: string, isAwake: boolean) {
    this.computer = this.computer.map((it) => {
      if (it.info.mac === mac) {
        return {
          ...it,
          isAwake
        }
      }

      return it
    })
  }

  /* B
   * getMacByStudentHashID
   */
  public getMacsByStudentHashId (studentHashId: string) {
    return this.computer.filter((it) => {
      return it.student?.info.hash_id === studentHashId
    }).map((it) => {
      return it.info.mac
    })
  }

  public addComputer (computer: ActiveingComputer) {
    this.computer.push(computer)
  }

  public addTeather (teather: Teather) {
    this.teather.push(teather)
  }
}
