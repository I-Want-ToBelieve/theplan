import { Observable } from 'rxjs'

export const observableChallengeProgress = new Observable(subscriber => {
  ajaxHooker.hook((request: { url: string | string[], response: (response: any) => Promise<void> }) => {
    if (
      request.url.includes(
        'api.bellcode.com/teacher/class/lesson.get-challenge-progress'
      )
    ) {
      request.response = async (response) => {
        const json = response.json // 注意保存原数据
        console.log(
          'p api.bellcode.com/teacher/class/lesson.get-challenge-progress',
          response,
          json
        )

        subscriber.next(response)
      }
    }
  })
})
