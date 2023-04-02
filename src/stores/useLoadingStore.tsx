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
//用于loading是否加载，全局状态管理
