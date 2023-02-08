// test.ts

import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/v1/me',
    method: 'get',
    response: () => {
      return {
        id: 1,
        email: 'frank@frank.com'
      }
    },
  },
  {
    url: '/api/v1/items',
    method: 'get',
    timeout: 2000,
    response: () => {
      return {
        resorces:[{
            id:1,
            user_id:1,
            amount:1000,
        }],
        pager:{
            page:1,
            per_page:25,
            count:100
        }
      }
    }
  },
//   {
//     url: '/api/text',
//     method: 'post',
//     rawResponse: async (req, res) => {
//       let reqbody = ''
//       await new Promise((resolve) => {
//         req.on('data', (chunk) => {
//           reqbody += chunk
//         })
//         req.on('end', () => resolve(undefined))
//       })
//       res.setHeader('Content-Type', 'text/plain')
//       res.statusCode = 200
//       res.end(`hello, ${reqbody}`)
//     },
//   },
] as MockMethod[]