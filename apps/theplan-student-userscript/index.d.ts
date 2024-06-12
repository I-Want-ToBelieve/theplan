/* eslint-disable @typescript-eslint/no-invalid-void-type */
/*
Based on https://github.com/vannhi/userscript-typescript-webpack/blob/master/tampermonkey-module.d.ts
*/

declare namespace GMType {
  type RegisterMenuCommandListener = () => void
  type MenuCommandId = number
  type StorageValue = string | number | boolean
  interface NotificationDetails {
    text?: string
    title?: string
    image?: string
    highlight?: boolean
    silent?: boolean
    timeout?: number
    ondone?: NotificationOnDone
    onclick?: NotificationOnClick
  }
  interface NotificationThis extends NotificationDetails {
    id: string
  }
  type NotificationOnClick = (this: NotificationThis) => any
  type NotificationOnDone = (this: NotificationThis, clicked: boolean) => any
}

declare interface GM {
  getValue: (
    key: string,
    defaultValue: GMType.StorageValue
  ) => Promise<GMType.StorageValue>
  setValue: (key: string, value: GMType.StorageValue) => Promise<void>

  registerMenuCommand: (
    caption: string,
    commandFunc: GMType.RegisterMenuCommandListener,
    accessKey?: string
  ) => Promise<GMType.MenuCommandId>
  unregisterMenuCommand: (menuCmdId: GMType.MenuCommandId) => Promise<void>

  addStyle: (css: string) => Promise<HTMLStyleElement>

  notification: ((
    details: GMType.NotificationDetails,
    ondone?: GMType.NotificationOnDone
  ) => Promise<void>) & ((
    text: string,
    title: string,
    image?: string,
    onclick?: GMType.NotificationOnDone
  ) => Promise<void>)
}

declare let unsafeWindow: Window
declare let ajaxHooker: any

interface Window {
  ajaxHooker: any
  GM: GM
}

declare module '@violentmonkey/dom' {
  export { h, createElement, Fragment, mountDom, mountDom as m, hm } from '@gera2ld/jsx-dom'
  export declare const versions: Record<string, string> & {
    dom: string
  }
  /**
   * Return all elements that match the given `xpath` as an array.
   */
  export declare function getElementsByXPath (xpath: string, context?: Node): Node[]
  /**
   * Walk a node tree and return all text contents in an array.
   */
  export declare function getTextValues (node: HTMLElement): any
  /**
   * Observe an existing `node` until `callback` returns `true`.
   * The returned function can be called explicitly to disconnect the observer.
   *
   * ```js
   * VM.observe(document.body, () => {
   *   const node = document.querySelector('.profile');
   *   if (node) {
   *     console.log('It\'s there!');
   *     return true;
   *   }
   * });
   * ```
   */
  export declare function observe (node: Node, callback: (mutations: MutationRecord[], observer: MutationObserver) => boolean | void, options?: MutationObserverInit): () => void
}

declare module '*.json' {
  const value: any
  export default value
}
