import type { CounterRepository } from '../../domain/ports/CounterRepository';

export class LocalStorageCounterRepository implements CounterRepository {
  private readonly KEY = 'hexagonal_counter_value';

  async get(): Promise<number> {
    const value = localStorage.getItem(this.KEY);
    return value ? parseInt(value, 10) : 0;
  }

  async save(value: number): Promise<void> {
    localStorage.setItem(this.KEY, value.toString());
  }
}
