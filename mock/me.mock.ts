import { MockMethod } from "vite-plugin-mock"

export const meMock : MockMethod = {
    url: '/api/v1/me',
    method: 'get',
    timeout:1000,
    statusCode : 200,
    response: ():Resource<User> => {
      return {
        resource:{
          id: 1,
          email: 'frank@frank.com',
          name:'frank',
          updated_at:'2022-02-08T00:00:00.000Z',
          created_at:'2022-02-08T00:00:00.000Z',
        }
      }
    },
}