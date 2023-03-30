import { create } from 'zustand'

interface Loading {
    visible?: boolean
}

export const useLoadingStore = create<Loading>((set, get) => (
    {
        visible: false,
        setVisible: (visible: boolean) => {
            set({ visible: visible })
        }
    }
))
