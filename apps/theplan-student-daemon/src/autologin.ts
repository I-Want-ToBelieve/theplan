/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import axios from 'axios'
import puppeteer from 'puppeteer-core'
import { $ } from 'execa'

const sleep = async (ms: number) =>
  await new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })

export const autologin = async ({
  username,
  password
}: {
  username: string
  password: string
}) => {
  console.log('autologin start')
  // kill browser
  try {
    await $`pkill chromium`
  } catch (error) {}
  // open browser (don't await)
  $`chromium --remote-debugging-port=9222`

  await sleep(3e3)

  // get webSocketDebuggerUrl

  const rep = await axios.get(
    'http://127.0.0.1:9222/json/version'
  )

  // console.log(rep)

  const browser = await puppeteer.connect({
    browserWSEndpoint: rep.data.webSocketDebuggerUrl,
    defaultViewport: null,
    protocolTimeout: 0
  })

  const run = async () => {
    // Launch the browser and open a new blank page

    const page = await browser.newPage()
    page.setDefaultNavigationTimeout(0)

    // Navigate the page to a URL
    await page.goto(
      'https://www.makcoocode.com/login.html#/'
    )

    // Set screen size
    // await page.setViewport({ width: 1080, height: 1024 })

    // Type into search box
    // await page.type('.devsite-search-field', 'automate beyond recorder')

    // Wait and click on first result
    const r = await page.evaluate(() => {
      localStorage.removeItem('webviewToken')
      return window.location.href
    })
    console.log(r)

    await sleep(3e3)

    const r2 = await page.evaluate(() => {
      return window.location.href
    })
    console.log(r2)

    const loginTabSelector =
      '.dialog-log-in .con .tab-item:nth-child(2)'
    await page.waitForSelector(loginTabSelector)
    await page.click(loginTabSelector)

    const inputUserNameSelector = '.input-username'
    const inputPassWordSelector = '.input-pwd'
    const loginButtonSelector = '.btn-enter'

    await page.waitForSelector(loginButtonSelector)
    await page.type(inputUserNameSelector, username)
    await page.type(inputPassWordSelector, password)
    await page.click(loginButtonSelector)
  }

  await run()

  // await browser.close()
  console.log('autologin end')
}
