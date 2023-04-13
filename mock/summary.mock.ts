import type { MockMethod } from 'vite-plugin-mock'

export const summaryMock: MockMethod[] = [{
    url: '/api/v1/items/summary',
    method: 'get',
    timeout: 1000,
    statusCode: 200,
    response: () => {
        return {
            groups: [
                { happen_at: '2023-04-13', tag: null, amount: 300 },
                { happen_at: '2023-04-14', tag: null, amount: 200 },
                { happen_at: '2023-04-15', tag: null, amount: 700 },
            ],
            total: 900
        }
    },
}]
