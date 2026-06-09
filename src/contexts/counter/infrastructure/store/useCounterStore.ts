import { create } from 'zustand';

interface CounterState {
  value: number;
  isLoading: boolean;
  setValue: (value: number) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  value: 0,
  isLoading: false,
  setValue: (value) => set({ value }),
  setLoading: (isLoading) => set({ isLoading }),
}));
