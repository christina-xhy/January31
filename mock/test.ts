// test.ts

import type { MockMethod } from 'vite-plugin-mock'
import { itemsMock } from './items.mock'
import { meMock } from './me.mock'
import { sessionMock } from './session.mock'
export default [
  meMock,
  itemsMock,
  sessionMock
] as MockMethod[]

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
