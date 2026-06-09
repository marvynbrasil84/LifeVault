import type { CounterRepository } from '../../domain/ports/CounterRepository';
import { Counter } from '../../domain/models/Counter';

export class IncrementCounterUseCase {
  private counterRepository: CounterRepository;

  constructor(counterRepository: CounterRepository) {
    this.counterRepository = counterRepository;
  }

  async execute(): Promise<number> {
    const currentValue = await this.counterRepository.get();
    const counter = new Counter(currentValue);
    counter.increment();
    await this.counterRepository.save(counter.value);
    return counter.value;
  }
}
