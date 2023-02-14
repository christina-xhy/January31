// test.ts

import { MockMethod } from 'vite-plugin-mock'
import { itemsMock } from './items.mock'
import { meMock } from './me.mock'
export default [
  meMock,
  itemsMock
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