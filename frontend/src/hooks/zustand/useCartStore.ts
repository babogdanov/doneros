import { StateCreator, create } from 'zustand'
import { PersistOptions, persist } from 'zustand/middleware'
import { MenuItem } from '../../types/menu-item'

type CartState = {
  cart: MenuItem[]
  add: (menuItem: MenuItem) => void
  remove: (menuItemId: number) => void
  reset: () => void
}

type CartPersist = (
  config: StateCreator<CartState>,
  options: PersistOptions<CartState>,
) => StateCreator<CartState>

const useCartStore = create<CartState>(
  (persist as CartPersist)(
    (set) => ({
      cart: [],
      add: (menuItem) => set((state) => ({ cart: [...state.cart, menuItem] })),
      remove: (menuItemId) =>
        set((state) => {
          const { cart } = state
          const cartCopy = [...cart]
          const itemToRemoveIndex = cartCopy.findIndex((item) => item.id === menuItemId)
          cartCopy.splice(itemToRemoveIndex, 1)
          return { cart: cartCopy }
        }),
      reset: () => set(() => ({ cart: [] })),
    }),
    {
      name: 'cart-storage',
    },
  ),
)

export default useCartStore
