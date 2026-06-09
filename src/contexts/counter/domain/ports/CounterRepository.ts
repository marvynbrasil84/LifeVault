export interface CounterRepository {
  get(): Promise<number>;
  save(value: number): Promise<void>;
}
