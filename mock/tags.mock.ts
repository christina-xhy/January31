import { faker } from "@faker-js/faker"
import { MockMethod } from "vite-plugin-mock"
import { ResponseParams } from "./mock"

let id = 0
const createId = () => {
    id += 1
    return id
}
// id 自增
const create = (attr?: Partial<Tag>): Tag => {
    return {
        id: createId(),
        name: faker.lorem.word(),
        sign: faker.internet.emoji(),
        deleted_at: null,
        user_id: 1,
        created_at: faker.date.past().toISOString(),
        updated_at: faker.date.past().toISOString(),
        kind: 'expenses',
        ...attr
    }
}
// 创建一个item
const createList = (n: number, attr?: Partial<Tag>): Tag[] => {
    return Array.from({ length: n }).map(() => create())
}
// 创建多个item
const createResponse = ({ count = 10, perPage = 10, page = 1 }, attr?: Partial<Tag>): Resources<Tag> => {
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

export const tagsMock: MockMethod[] = [{
    url: '/api/v1/tags',
    method: 'get',
    statusCode: 200,
    timeout: 1000,
    // query是Mock，response中的属性,设置path路径
    response: ({ query }: ResponseParams): Resources<Tag> => {
        return createResponse({ count: 30, perPage: 50, page: parseInt(query.page) || 1 })
    }
}, {
    url: '/api/v1/tags',
    method: 'post',
    statusCode: 200,
    timeout: 100,
    response: ({ query }: ResponseParams): Resource<Tag> => {
        return {
            resource: create()
        }
    },
}, {
    url: '/api/v1/tags/:id',
    method: 'get',
    statusCode: 200,
    timeout: 100,
    response: ({ query }: ResponseParams): Resource<Tag> => {
        return {
            resource: create()
        }
    },
},
{
    url: '/api/v1/tags/:id',
    method: 'patch',
    statusCode: 200,
    timeout: 100,
    response: ({ query }: ResponseParams): Resource<Tag> => {
        return {
            resource: create()
        }
    },
},
{
    url: '/api/v1/tags/:id',
    method: 'delete',
    statusCode: 200,
},

    //{
    //     url: '/api/v1/tags',
    //     method: 'post',
    //     statusCode: 422,
    //     timeout: 1000,
    //     response: ({ query }: ResponseParams): any => {
    //         return {
    //             errors: { name: ['invalid'] }
    //         }
    //     },
    // }
]
