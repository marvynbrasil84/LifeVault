import { describe, it, expect, vi } from 'vitest';
import { DecrementCounterUseCase } from '../../../application/use-cases/DecrementCounterUseCase';
import type { CounterRepository } from '../../../domain/ports/CounterRepository';

describe('DecrementCounterUseCase', () => {
  it('debe decrementar el valor del contador y guardarlo', async () => {
    const mockRepo: CounterRepository = {
      get: vi.fn().mockResolvedValue(5),
      save: vi.fn().mockResolvedValue(undefined),
    };

    const useCase = new DecrementCounterUseCase(mockRepo);
    const newValue = await useCase.execute();

    expect(newValue).toBe(4);
    expect(mockRepo.get).toHaveBeenCalledTimes(1);
    expect(mockRepo.save).toHaveBeenCalledWith(4);
  });

  it('debe lanzar error si se intenta decrementar por debajo de 0', async () => {
    const mockRepo: CounterRepository = {
      get: vi.fn().mockResolvedValue(0),
      save: vi.fn().mockResolvedValue(undefined),
    };

    const useCase = new DecrementCounterUseCase(mockRepo);
    await expect(useCase.execute()).rejects.toThrow(
      'No se puede decrementar por debajo de 0.'
    );
  });
});
