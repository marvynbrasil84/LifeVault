import { describe, it, expect, vi } from 'vitest';
import { IncrementCounterUseCase } from '../../../application/use-cases/IncrementCounterUseCase';
import type { CounterRepository } from '../../../domain/ports/CounterRepository';

describe('IncrementCounterUseCase', () => {
  it('debe incrementar el valor del contador y guardarlo', async () => {
    const mockRepo: CounterRepository = {
      get: vi.fn().mockResolvedValue(5),
      save: vi.fn().mockResolvedValue(undefined),
    };

    const useCase = new IncrementCounterUseCase(mockRepo);
    const newValue = await useCase.execute();

    expect(newValue).toBe(6);
    expect(mockRepo.get).toHaveBeenCalledTimes(1);
    expect(mockRepo.save).toHaveBeenCalledWith(6);
  });

  it('debe lanzar error si se intenta incrementar más allá de 100', async () => {
    const mockRepo: CounterRepository = {
      get: vi.fn().mockResolvedValue(100),
      save: vi.fn().mockResolvedValue(undefined),
    };

    const useCase = new IncrementCounterUseCase(mockRepo);
    await expect(useCase.execute()).rejects.toThrow(
      'No se puede incrementar más allá de 100.'
    );
  });
});
