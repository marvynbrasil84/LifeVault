export class Counter {
  private _value: number;

  constructor(value: number) {
    if (value < 0 || value > 100) {
      throw new Error('El valor del contador debe estar entre 0 y 100.');
    }
    this._value = value;
  }

  get value(): number {
    return this._value;
  }

  increment(): void {
    if (this._value >= 100) {
      throw new Error('No se puede incrementar más allá de 100.');
    }
    this._value += 1;
  }

  decrement(): void {
    if (this._value <= 0) {
      throw new Error('No se puede decrementar por debajo de 0.');
    }
    this._value -= 1;
  }
}
