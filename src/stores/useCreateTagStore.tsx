/* eslint-disable @typescript-eslint/consistent-type-imports */
import { create } from 'zustand'
import { FormError } from '../lib/validate'

type Data = Tag

type CreateTag = {
    data: Partial<Data>
    error: FormError<Tag>
    setData: (data: Partial<Data>) => void
    setError: (error: Partial<FormError<Tag>>) => void
}

export const useCreateTagStore = create<CreateTag>((set, get) => (
    {
        data: {
            kind: 'expenses',
            sign: '',
            name: '',
        },
        error: {
            kind: [],
            sign: [],
            name: []
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
))