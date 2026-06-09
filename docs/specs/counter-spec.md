# Especificación: Contador Hexagonal

## Resumen
Aplicación de contador con valores entre 0 y 100, construida con Arquitectura Hexagonal en React.

## Reglas de Negocio
- El valor inicial del contador es 0.
- El valor mínimo es 0.
- El valor máximo es 100.
- No se puede incrementar si el valor actual es 100.
- No se puede decrementar si el valor actual es 0.
- El valor persiste en localStorage.

## API / Puertos
- `CounterRepository.get()`: Obtiene el valor actual.
- `CounterRepository.save(value)`: Persiste un nuevo valor.

## Casos de Uso
- `IncrementCounterUseCase`: Obtiene el valor, crea un `Counter`, lo incrementa, persiste y retorna el nuevo valor.
- `DecrementCounterUseCase`: Obtiene el valor, crea un `Counter`, lo decrementa, persiste y retorna el nuevo valor.

## Interfaz de Usuario
- Muestra el valor actual.
- Botón "Sumar" para incrementar.
- Botón "Restar" para decrementar.
- Indicador de carga mientras se procesa una operación.
- Mensaje de error si ocurre un problema.
