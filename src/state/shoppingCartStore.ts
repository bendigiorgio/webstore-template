import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ShoppingCartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
  slug: string;
}

interface ShoppingCartState {
  items: ShoppingCartItem[];

  addItem: (item: ShoppingCartItem) => void;
  removeItem: (itemId: string, itemSize: string) => void;
  updateItemQuantity: (
    itemId: string,
    quantity: number,
    itemSize: string
  ) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

export const useShoppingCartStore = create<ShoppingCartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item: ShoppingCartItem) =>
        set((state) => {
          const index = state.items.findIndex(
            (i) => i.id === item.id && i.size === item.size
          );

          if (index >= 0) {
            const updatedItems = state.items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            );
            return { items: updatedItems };
          } else {
            return { items: [...state.items, item] };
          }
        }),

      removeItem: (itemId: string, itemSize: string) =>
        set((state) => {
          const updatedItems = state.items.filter(
            (item) => item.id !== itemId || item.size !== itemSize
          );
          return { items: updatedItems };
        }),

      updateItemQuantity: (
        itemId: string,
        quantity: number,
        itemSize: string
      ) =>
        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.id === itemId && item.size === itemSize
              ? { ...item, quantity }
              : item
          );
          return { items: updatedItems };
        }),

      clearCart: () => set(() => ({ items: [] })),

      getTotalItems: () => {
        const totalItems = get().items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        return totalItems;
      },
    }),
    {
      name: "test-shopping-cart", // Key for local storage
    }
  )
);
interface ShoppingCartSidebarState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useCartSidebarStore = create<ShoppingCartSidebarState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
