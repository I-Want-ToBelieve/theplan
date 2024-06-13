/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { observe } from '@violentmonkey/dom'

export const addLockAndUnlock = (data: any, socket: any) => {
  const boxSeletor = 'img.student-controller'
  const lister = (evt) => {
    console.log(evt, data)

    if (evt.target.src.include('click-to-unlock')) {
      socket.emit('lock', Object.keys(data?.data?.users ?? []))
    } else if (evt.target.src.include('click-to-lock')) {
      socket.emit('unlock', Object.keys(data?.data?.users ?? []))
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
