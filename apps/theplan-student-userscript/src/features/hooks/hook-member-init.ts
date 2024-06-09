import { Observable } from 'rxjs'

export const observableMemberInit = new Observable(subscriber => {
  ajaxHooker.hook(request => {
    if (
      request.url.includes(
        'api.bellcode.com/v3/common/member/init'
      )
    ) {
      request.response = async (response) => {
        const json = response.json // 注意保存原数据
        console.log(
          'p api.bellcode.com/v3/common/member/init',
          response,
          json
        )

        subscriber.next(response)
      }
    }
  })
})
