/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { observe } from '@violentmonkey/dom'

export const removeBadLock = () => {
  const timer = setInterval(() => {
    const node = document.querySelector('.share > div:nth-child(1)')

    if (node && node.textContent === '认真听课，不要动鼠标哦') {
      node.remove()
    }
  }, 1e3)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const disconnect = observe(document.body, () => {
    // Find the target node
    const node = document.querySelector('.share > div:nth-child(1)')

    if (node && node.textContent === '认真听课，不要动鼠标哦') {
      window.clearInterval(timer)
      node.remove()
    }
  })
}
