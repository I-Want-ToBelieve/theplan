import { Observable } from 'rxjs'

export const observableAllStudent = new Observable(subscriber => {
  ajaxHooker.hook((request: { url: string | string[], response: (response: any) => Promise<void> }) => {
    if (
      request.url.includes(
        'api.bellcode.com/teacher/index/all-student'
      )
    ) {
      request.response = async (response) => {
        const json = response.json // 注意保存原数据
        console.log(
          'p api.bellcode.com/teacher/index/all-student',
          response,
          json
        )

        subscriber.next(response)
      }
    }
  })
})
