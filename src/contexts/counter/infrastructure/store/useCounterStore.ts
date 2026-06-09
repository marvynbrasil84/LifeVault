import { create } from 'zustand';

interface CounterState {
  value: number;
  isLoading: boolean;
  error: string | null;
  setValue: (value: number) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  value: 0,
  isLoading: false,
  error: null,
  setValue: (value) => set({ value }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
