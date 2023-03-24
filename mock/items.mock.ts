import type { MockMethod } from 'vite-plugin-mock'
import { faker } from '@faker-js/faker'
import type { ResponseParams } from './mock'

let id = 0
const createId = () => {
  id += 1
  return id
}
// id 自增
const create = (attr?: Partial<Item>): Item => {
  return {
    id: createId(),
    user_id: 1,
    amount: faker.datatype.number({ min: 10, max: 1000_00 }),
    tag_ids: [1, 2],
    happen_at: faker.date.past().toISOString(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.past().toISOString(),
    kind: 'expenses',
    ...attr
  }
}
// 创建一个item
const createList = (n: number, attr?: Partial<Item>): Item[] => {
  return Array.from({ length: 10 }).map(() => create())
}
// 创建多个item
const createResponse = ({ count = 100, perPage = 10, page = 1 }, attr?: Partial<Item>): Resources<Item> => {
  const sendCount = (page - 1) * perPage
  const leftcount = count - sendCount
  // 如果超出了count的总数，不再加载新的数据，返回空的[]item
  return {
    resources: leftcount > 0 ? createList(Math.min(leftcount, perPage), attr) : [],
    pager: {
      page,
      per_page: perPage,
      count,
    }
  }
}
// 创建多个item 同时创建pager：{}

export const itemsMock: MockMethod = {
  url: '/api/v1/items',
  method: 'get',
  statusCode: 200,
  timeout: 100,
  response: ({ query }: ResponseParams): Resources<Item> => {
    return createResponse({ count: 30, perPage: 10, page: parseInt(query.page) })
  }
  // query是Mock，response中的属性
}

