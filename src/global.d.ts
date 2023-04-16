var isDev: boolean
type Resource<T> = {
    resource: T
}
type Resources<T> = {
    resources: T[]
    pager: {
        page: number
        per_page: number
        count: number
    }
}

type User = {
    id: number
    email: string
    name?: string
    created_at: string
    updated_at: string
}

type Item = {
    id: number
    user_id: number
    amount: number
    note?: string
    tag_ids: number[]
    tags?: Tag[]
    happen_at: string
    created_at: string
    updated_at: string
    kind: 'expenses' | 'income'
}

type Tag = {
    id: number
    kind: Item['kind']
    user_id: number
    name: string
    sign: string
    deleted_at: string | null
    created_at: string
    updated_at: string
}

type JSONValue = boolean | number | string | null | { [k: string]: JSONValue } | JSONValue[]
