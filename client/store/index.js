import { create } from 'zustand'
import { persist } from 'zustand/middleware'
export const useStore = create(
    persist(
        (set, get) => ({
            qty: 0,
            amount: 0,
            items: [],
            list: " ",
            category: (a) => set((state) => ({ list: state.list + a })),
            increaseQty: () => set((state) => ({ qty: state.qty + 1 })),
            decreaseQty: () => set((state) => ({ qty: state.qty - 1 })),
            decreaseAmount: (price) => set((state) => ({ amount: state.amount - price })),
            addToCart: (newItem) => set((state) => ({ items: [...state.items, newItem] })),
            addAmount: (price) => set((state) => ({ amount: state.amount + price })),
            removeItems: () => set((state) => ({ qty: 0, items: [], amount: 0 })),
            updateItems: (value) => set((state) => ({ items: value })),
            deleteItem: (index) => set((state) => {
                delete state.items[index];
                return { ...state }
            }),
            increaseItemQty: (index, qty) => set((state) => {
                { state.items[index].qty += qty }
                return { ...state }
            }),
            decreaseItemQty: (index, qty) => set((state) => {
                { state.items[index].qty -= qty }
                return { ...state }
            })
        }),
        { name: 'global', getStorage: () => localStorage }
    )
)