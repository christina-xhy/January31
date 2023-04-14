import type { MockMethod } from 'vite-plugin-mock'
import { ResponseParams } from './mock'

export const summaryMock: MockMethod[] = [{
    url: '/api/v1/items/summary',
    method: 'get',
    timeout: 1000,
    statusCode: 200,
    response: ({ query }: ResponseParams) => {
        if (query.group_by === 'happen_at') {
            return {
                groups: [
                    { happen_at: '2023-04-13', tag: null, amount: 300 },
                    { happen_at: '2023-04-14', tag: null, amount: 200 },
                    { happen_at: '2023-04-15', tag: null, amount: 700 },
                ],
                total: 1200
            }
        } else if (query.group_by === 'tag_id') {
            return {
                groups: [
                    {
                        tag_id: 672,
                        tag: {
                            id: 672,
                            user_id: 252,
                            name: 'Per.',
                            sign: '😊',
                            deleted_at: null,
                            created_at: '2023-03-08T00:30:18.609+08:00',
                            updated_at: '2023-03-08T00:30:18.609+08:00',
                            kind: 'expenses'
                        },
                        amount: 500
                    },
                    {
                        tag_id: 670,
                        tag: {
                            id: 670,
                            user_id: 252,
                            name: 'Nul.',
                            sign: '🐶',
                            deleted_at: null,
                            created_at: '2023-03-08T00:30:18.609+08:00',
                            updated_at: '2023-03-08T00:30:18.609+08:00',
                            kind: 'expenses'
                        },
                        amount: 300
                    },
                    {
                        tag_id: 671,
                        tag: {
                            id: 671,
                            user_id: 252,
                            name: 'lop.',
                            sign: '🐷',
                            deleted_at: null,
                            created_at: '2023-03-08T00:30:18.609+08:00',
                            updated_at: '2023-03-08T00:30:18.609+08:00',
                            kind: 'expenses'
                        },
                        amount: 600
                    }
                ],
                total: 1400
            }
        }
    },
}]
