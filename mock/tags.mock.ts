import { MockMethod } from "vite-plugin-mock"
import { ResponseParams } from "./mock"

export const tagsMock: MockMethod = {
    url: '/api/v1/tags',
    method: 'get',
    statusCode: 200,
    timeout: 1000,
    response: ({ query }: ResponseParams): Resources<Tag> => {
        const tags = Array.from({ length: 20 }).map<Tag>((tag, index) => ({
            id: index,
            kind: 'expenses',
            user_id: 1,
            name: `打车${index}`,
            sign: '😊',
            updated_at: '2000-01-01T00:00:00.000Z',
            created_at: '2000-01-01T00:00:00.000Z',
            deleted_at: null,
        }))
        return {
            resources: tags,
            pager: {
                page: 1,
                per_page: 20,
                count: 20
            }
        }
    }
    // query是Mock，response中的属性,设置path路径
}