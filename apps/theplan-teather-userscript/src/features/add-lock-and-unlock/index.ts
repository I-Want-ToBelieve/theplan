/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { observe } from '@violentmonkey/dom'

export const addLockAndUnlock = (data: any, socket: any) => {
  const boxSeletor = 'img.student-controller'
  const lister = (evt: any) => {
    console.log('evt.target.src.includes(click-to-unlock)', evt, data, Object.keys(data?.users ?? []))

    if (evt.target.src.includes('click-to-unlock')) {
      console.log('emit unlock', Object.keys(data?.users ?? []))
      socket.emit('unlock', Object.keys(data?.users ?? []))
    } else if (evt.target.src.includes('click-to-lock')) {
      console.log('emit lock', Object.keys(data?.users ?? []))
      socket.emit('lock', Object.keys(data?.users ?? []))
    }
  }

  const addListerToBox = () => {
    if (window.location.hash.includes('tea_classrooms_lesson')) {
      const box = document.querySelector(boxSeletor)

      if (box) {
        box.removeEventListener('click', lister)

        box.addEventListener('click', lister)
      }
    }
  }

  window.addEventListener('hashchange', (_) => {
    addListerToBox()
  })

  const disconnect = observe(document.body, () => {
    // Find the target node
    const box = document.querySelector(boxSeletor)

    if (box) {
      addListerToBox()
      disconnect()
    }
  })
}
