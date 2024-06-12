/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Student, type Teather, type ActiveingComputer } from '@/types'

export class Store {
  // public students: Student[] = []
  public teather: Teather[] = []
  public computer: ActiveingComputer[] = []

  public attachStudentToComputer (mac: number, student: Student) {
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

  /**
   * changeComputerAwakeState
  */
  public changeComputerAwakeState (mac: number, isAwake: boolean) {
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

  public addComputer (computer: ActiveingComputer) {
    this.computer.push(computer)
  }

  public addTeather (teather: Teather) {
    this.teather.push(teather)
  }
}
