/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { getStudents } from '@/api/makcoo/makcoo.api'
export const batchAddStudent = () => {
  // 试图添加学生到班级中并且试图搜索学生
  ajaxHooker.hook((request) => {
    if (
      request.url.includes(
        'api.bellcode.com/teacher/organization/get.stu-list'
      )
    ) {
      const searchParams = new URLSearchParams(request.data)

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const search_nick_name = searchParams.get('search_nick_name')
      if (search_nick_name?.includes(',')) {
        const names = search_nick_name.split(',')

        request.response = async (response) => {
          const json = response.json // 注意保存原数据
          console.log(
            'p api.bellcode.com/teacher/organization/get.stu-list',
            response,
            json
          )

          const result = await Promise.all(
            names.map(async (name) => {
              return await (
                await getStudents({
                  webviewToken: store.makcoo.webviewToken,
                  school_id: store.makcoo.schoolId ?? 521,
                  search_nick_name: name
                })
              ).json()
            })
          )

          const list = result
            .reduce((acc, it) => acc.concat(it.data.list), [])
            .filter((it) => names.includes(it.nick_name))

          console.log('result', list)

          // eslint-disable-next-line require-atomic-updates
          response.response = new Promise((resolve) => {
            resolve(
                `{
                  "code": 200,
                  "message": "",
                  "data": {
                      "list": ${JSON.stringify(list)},
                      "page": 1,
                      "pagesize": 10,
                      "page_size": 10,
                      "total": ${list.length}
                  }
                }`
            )
          })
        }
      }
    }
  })
}
