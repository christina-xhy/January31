/* eslint-disable @typescript-eslint/consistent-type-imports */
import { create } from 'zustand'
import { FormError } from '../lib/validate'

type Data = {
  email: string
  code: string
}

interface SignIn {
  data: Data
  error: FormError<Data>
  setData: (data: Partial<Data>) => void
  setError: (error: Partial<FormError<Data>>) => void
}
export const useSignInStore = create<SignIn>((set, get) => (
  {
    data: {
      email: '',
      code: ''
    },
    error: {
      emial: [],
      code: []
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

// function prop<T, K extends keyof T>(obj: T, key: K) {
//   return obj[key]
// }
// function prop2<T>(obj: T, key: keyof T) {
//   return obj[key]
// }

// const o = {
//   p1: 0,
//   p2: ''
// }

// const v = prop(o, 'p1')
// const v2 = prop2(o, 'p1') // is number | string, no extra info is captured

// console.log('v', v)

// console.log('v2', v2)

