# Agentic Harness & Spec-Driven Development (SDD) Guide

Este documento define el comportamiento, flujo de trabajo, arquitectura hexagonal y restricciones operativas del agente de IA en este repositorio. Cualquier agente que trabaje aquí debe seguir estas reglas rigurosamente.

## 1. Filosofía de Desarrollo: Arquitectura Hexagonal en React

El proyecto sigue una estricta Arquitectura Hexagonal (Ports & Adapters) por contexto acotado (Bounded Context) en `src/contexts/[contexto]`. Las capas son unidireccionales y su dependencia va hacia el centro (Dominio):

1. **Capa de Dominio (Domain):** Lógica y reglas de negocio puras (TS). No tiene dependencias de React, Vite, librerías CSS, ni fetch/axios. Define:
   - **Modelos:** Entidades (ej: `User.ts`) con validaciones de negocio internas.
   - **Puertos de Salida (Ports):** Interfaces (ej: `UserRepository.ts`) que modelan operaciones externas de persistencia o APIs.
2. **Capa de Aplicación (Application):** Casos de uso concretos (ej: `LoginUseCase.ts`). Reciben las dependencias de los puertos mediante inyección en el constructor y orquestan la ejecución.
3. **Capa de Infraestructura (Infrastructure):** Detalles tecnológicos específicos del framework y librerías externas.
   - **Adaptadores:** Implementaciones de puertos (ej: `FetchUserRepository.ts`).
   - **Manejo de Estado (Zustand):** Tiendas reactivas para almacenar datos visuales o de caché.
   - **Inyección de Dependencias (DI Container):** React Context (`[Context]DependencyContext.tsx`) que provee los adaptadores instanciados a los Custom Hooks de la UI.
   - **Vistas y Controladores UI (React + Hooks):** El controlador (Custom Hook) consume los adaptadores vía DI Context y orquesta los Casos de Uso, actualizando Zustand. La vista (`View.tsx`) es puramente presentacional.

---

## 2. Inyección de Dependencias en React

Queda estrictamente prohibido instanciar adaptadores de infraestructura directamente dentro de los componentes visuales de React. Todo adaptador debe proveerse mediante el contenedor de dependencias (`DependencyContext`) e inyectarse en los controladores de la siguiente manera:

```typescript
export function useMyController() {
  const { myRepository } = useMyDependencies(); // Vía React Context
  const { data, setData } = useMyStore();        // Vía Zustand
  
  const myUseCase = new ExecuteMyUseCase(myRepository);
  // ... ejecutar useCase y setear estado ...
}
```

---

## 3. Estrategia de Pruebas (Vitest + React Testing Library)

- **Lógica de Dominio y Casos de Uso:** Deben contar con cobertura de pruebas unitarias al 100% en Vitest sin simular componentes de React. Se mockean los puertos usando `vi.fn()` de Vitest.
- **Componentes React:** Se prueban usando React Testing Library. Se aíslan de la infraestructura real envolviéndolos con un mock del `DependencyProvider`.

---

## 4. Flujo de Trabajo SDD (Spec-Driven Development)

El agente debe ejecutar de forma interactiva y secuencial:
1. **Analizar la Spec:** Leer la especificación de negocio ubicada en `docs/specs/`.
2. **Crear Plan de Trabajo (`TODO.md`):** Desglosar las micro-tareas (Dominio -> Casos de uso -> Tests -> Adaptadores -> UI).
3. **Desarrollar Inside-Out (De dentro hacia afuera):** No tocar la UI ni React hasta que el modelo de dominio y los casos de uso estén completamente implementados y probados mediante Vitest.
4. **Acoplar UI e Infraestructura:** Conectar los adaptadores en la interfaz y asociar Zustand.
5. **Verificar Calidad:** Ejecutar `npm run type-check`, `npm run lint` y `npm run test` antes de reportar la tarea como completada.

---

## 5. Mapa de Comandos por Intención

Cuando el usuario exprese una necesidad, delega en el subagente especializado correspondiente:

| Intención del usuario | Comando a ejecutar | Subagente |
|---|---|---|
| Crear un **componente React** (no cualquier archivo) | `create-react-component` | `@create-react-component` |
| Revisar/auditar un componente React existente | `react-review` | `@react-review` |
| Revisar cambios de código (pull + locales) | `review` | `@code-review` |
| Sincronizar repo con remoto (pull/commit/push) | `git-sync` | `@git-sync` |

### Reglas de dispatch

1. **Si el usuario pide crear un componente React** → ejecuta `create-react-component`.
2. **Si el usuario pide crear cualquier otra cosa** (no un componente React) → hazlo directamente sin invocar subagentes.
3. **Si el usuario pide revisar un componente React** → ejecuta `react-review`.
4. **Si el usuario pide revisar código general** → ejecuta `review`.
5. **Si el usuario pide sincronizar git** → ejecuta `git-sync`.
6. **Después de cualquier cambio en el código** → ejecutar `type-check && lint && test`.
