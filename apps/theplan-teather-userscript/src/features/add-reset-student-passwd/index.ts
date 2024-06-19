/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { observe } from '@violentmonkey/dom'
import Toastify from 'toastify-js'

export const addResetStudentPassword = (data: any) => {
  const addButtonToBox = () => {
    if (window.location.hash.includes('classroom_management')) {
      const box = document.querySelector('div.teaching-management div.operation')
      const id = 'reset-student-password-button'

      document.getElementById(id)?.remove()

      if (box) {
        const resetStudentPasswordButton = document.createElement('div')

        resetStudentPasswordButton.id = id

        resetStudentPasswordButton.textContent = '重置学生密码'
        resetStudentPasswordButton.addEventListener('click', (it) => {
          console.log(it, '重置密码被点了', data)

          Promise.all(data.map(async (it: any) => {
            const { username, id } = it
            const token = localStorage.getItem('webviewToken')

            return await fetch(`https://api.bellcode.com/teacher/index/reset-stu-pwd?id=${id}&newpass=${username}&token=${token}`, {
              headers: {
                'sec-ch-ua': '"Chromium";v="125", "Not.A/Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Linux"'
              },
              referrer: 'https://www.makcoocode.com/',
              referrerPolicy: 'strict-origin-when-cross-origin',
              body: null,
              method: 'GET',
              mode: 'cors',
              credentials: 'omit'
            })
          })).then(() => {
            Toastify({
              text: '重置密码成功',
              className: 'info',
              style: {
                background: 'linear-gradient(to right, #00b09b, #96c93d)'
              }
            }).showToast()
          }).catch(() => {
            Toastify({
              text: '重置密码失败，请联系开发者调查',
              className: 'error',
              style: {
                background: 'linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))'
              }
            }).showToast()
          })
        })

        box?.appendChild(resetStudentPasswordButton)
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
