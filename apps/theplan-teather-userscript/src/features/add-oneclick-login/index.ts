/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { observe } from '@violentmonkey/dom'

export const addOneClickLogin = () => {
  const addButtonToBox = () => {
    if (window.location.hash.includes('classroom_management')) {
      const box = document.querySelector('div.teaching-management div.operation')

      if (box && box.childElementCount < 4) {
        const oneClickLoginButton = document.createElement('div')
        oneClickLoginButton.textContent = '一键上号'
        oneClickLoginButton.addEventListener('click', (it) => {
          console.log(it, '一键上号被点了')
        })

        box?.appendChild(oneClickLoginButton)
      }
    }
  }

  window.addEventListener('hashchange', (_) => {
    addButtonToBox()
  })

  const disconnect = observe(document.body, () => {
    // Find the target node
    const box = document.querySelector('div.teaching-management div.operation')

    if (box) {
      addButtonToBox()
      disconnect()
    }
  })
}
