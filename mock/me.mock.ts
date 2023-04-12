import type { MockMethod } from 'vite-plugin-mock'

export const meMock: MockMethod[] = [{
  url: '/api/v1/me',
  method: 'get',
  timeout: 1000,
  statusCode: 200,
  response: () => {
    return {
      resource: {
        id: 1,
        //: Resource<User> ----这个是类型，再需要其他完整的信息的时候，则需要添加上类型判断
        // email: 'frank@frank.com',
        // name: 'frank',
        // updated_at: '2022-02-08T00:00:00.000Z',
        // created_at: '2022-02-08T00:00:00.000Z',
      }
    }
  },
}]
