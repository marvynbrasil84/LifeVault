import { useEffect } from 'react';
import { useCounterDependencies } from '../di/CounterDependencyContext';
import { useCounterStore } from '../store/useCounterStore';
import { IncrementCounterUseCase } from '../../application/use-cases/IncrementCounterUseCase';
import { DecrementCounterUseCase } from '../../application/use-cases/DecrementCounterUseCase';

export function useCounterController() {
  const { counterRepository } = useCounterDependencies();
  const { value, isLoading, setValue, setLoading } = useCounterStore();

  const incrementUseCase = new IncrementCounterUseCase(counterRepository);
  const decrementUseCase = new DecrementCounterUseCase(counterRepository);

  useEffect(() => {
    let active = true;
    const loadValue = async () => {
      setLoading(true);
      try {
        const val = await counterRepository.get();
        if (active) setValue(val);
      } catch (err) {
        console.error(err);
      } finally {
        if (active) setLoading(false);
      }
    };
    loadValue();
    return () => { active = false; };
  }, [counterRepository, setValue, setLoading]);

  const handleIncrement = async () => {
    setLoading(true);
    try {
      const newValue = await incrementUseCase.execute();
      setValue(newValue);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDecrement = async () => {
    setLoading(true);
    try {
      const newValue = await decrementUseCase.execute();
      setValue(newValue);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { value, isLoading, increment: handleIncrement, decrement: handleDecrement };
}
