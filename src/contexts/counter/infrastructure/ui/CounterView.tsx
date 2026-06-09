import { type FC } from 'react';
import { useCounterController } from './useCounterController';

export const CounterView: FC = () => {
  const { value, isLoading, error, increment, decrement } = useCounterController();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Contador Hexagonal</h2>
      {error && (
        <div role="alert" style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}
      <div role="status" aria-live="polite" style={{ fontSize: '3rem', margin: '20px 0' }}>
        {isLoading ? (
          <span aria-label="Cargando">Cargando...</span>
        ) : (
          value
        )}
      </div>
      <div>
        <button
          onClick={decrement}
          disabled={isLoading}
          aria-label="Restar"
          style={{ marginRight: '10px' }}
        >
          Restar
        </button>
        <button
          onClick={increment}
          disabled={isLoading}
          aria-label="Sumar"
        >
          Sumar
        </button>
      </div>
    </div>
  );
};
