import { useEffect, useMemo, useCallback } from 'react';
import { useCounterDependencies } from '../di/CounterDependencyContext';
import { useCounterStore } from '../store/useCounterStore';
import { IncrementCounterUseCase } from '../../application/use-cases/IncrementCounterUseCase';
import { DecrementCounterUseCase } from '../../application/use-cases/DecrementCounterUseCase';

export function useCounterController() {
  const { counterRepository } = useCounterDependencies();
  const { value, isLoading, error, setValue, setLoading, setError } = useCounterStore();

  const incrementUseCase = useMemo(
    () => new IncrementCounterUseCase(counterRepository),
    [counterRepository]
  );
  const decrementUseCase = useMemo(
    () => new DecrementCounterUseCase(counterRepository),
    [counterRepository]
  );

  useEffect(() => {
    let active = true;
    const loadValue = async () => {
      setLoading(true);
      setError(null);
      try {
        const val = await counterRepository.get();
        if (active) setValue(val);
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : 'Error al cargar');
      } finally {
        if (active) setLoading(false);
      }
    };
    loadValue();
    return () => { active = false; };
  }, [counterRepository, setValue, setLoading, setError]);

  const handleIncrement = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const newValue = await incrementUseCase.execute();
      setValue(newValue);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al incrementar');
    } finally {
      setLoading(false);
    }
  }, [incrementUseCase, setValue, setLoading, setError]);

  const handleDecrement = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const newValue = await decrementUseCase.execute();
      setValue(newValue);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al decrementar');
    } finally {
      setLoading(false);
    }
  }, [decrementUseCase, setValue, setLoading, setError]);

  return { value, isLoading, error, increment: handleIncrement, decrement: handleDecrement };
}
