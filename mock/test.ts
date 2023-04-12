// test.ts

import type { MockMethod } from 'vite-plugin-mock'
import { itemsMock } from './items.mock'
import { meMock } from './me.mock'
import { sessionMock } from './session.mock'
import { tagsMock } from './tags.mock'
export default [
  meMock,
  itemsMock,
  sessionMock,
  tagsMock
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


//useParams的使用方法 
// import { useParams } from 'react-router-dom';

// function User() {
//   const { id } = useParams();

//   const getUser = async (id) => {
//     const userId = parseInt(id, 10);
//     const response = await fetch(`/api/users/${userId}`);
//     const user = await response.json();
//     return user;
//   };

//   return (
//     <div>
//       <p>User ID: {id}</p>
//       <button onClick={() => getUser(id)}>Get User</button>
//     </div>
//   );
// }
