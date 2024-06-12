/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { observe } from '@violentmonkey/dom'
import Toastify from 'toastify-js'
import './toastify.css'

export const addOneClickLogin = (_data: any) => {
  const addButtonToBox = () => {
    if (window.location.hash.includes('classroom_management')) {
      const box = document.querySelector('div.teaching-management div.operation')

      const id = 'one-click-login-button'
      document.getElementById(id)?.remove()

      if (box) {
        const oneClickLoginButton = document.createElement('div')
        oneClickLoginButton.id = id

        oneClickLoginButton.textContent = '一键上号'
        oneClickLoginButton.addEventListener('click', (it) => {
          console.log(it, '一键上号被点了')
          Toastify({
            text: 'This is a toast',
            className: 'info',
            style: {
              background: 'linear-gradient(to right, #00b09b, #96c93d)'
            }
          }).showToast()
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
