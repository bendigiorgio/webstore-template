import { create } from "zustand";

type Filter = {
  name: string;
  value: string;
};

interface FilterStore {
  filters: Filter[];
  addFilter: (filter: Filter) => void;
  removeFilter: (filter: Filter) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filters: [],
  addFilter: (filter) => {
    set((state) => ({
      filters: [...state.filters, filter],
    }));
  },
  removeFilter: (filter) => {
    set((state) => ({
      filters: state.filters.filter((f) => f.name !== filter.name),
    }));
  },
}));
