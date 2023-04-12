import { create } from "zustand"
import { FormError } from "../lib/validate"
type Data = Item

type CreateItem = {
    data: Partial<Data>
    error: FormError<Data>
    setData: (Data: Partial<Data>) => void
    setError: (Data: Partial<FormError<Data>>) => void
}

export const useCreateItemStore = create<CreateItem>((set, get) => {
    return {
        data: {
            kind: 'expenses',
            tag_ids: [],
            happened_at: '',
            amount: 0
        },
        error: {
            kind: [],
            tag_ids: [],
            happened_at: [],
            amount: []
        },
        setData: (data: Partial<Data>) => {
            set(state => ({
                ...state,
                data: {
                    ...state.data,
                    ...data
                }
            }))
        },
        setError: (error: Partial<FormError<Data>>) => {
            set(state => ({
                ...state,
                error: {
                    ...error
                }
            }))
        },
    }
})



