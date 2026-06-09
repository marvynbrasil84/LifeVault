# React Composition Patterns

**Version 1.0.0** - Engineering - January 2026

Composition patterns for building flexible, maintainable React components. Avoid boolean prop proliferation by using compound components, lifting state, and composing internals.

## 1. Component Architecture (HIGH)

### 1.1 Avoid Boolean Prop Proliferation
Don't add boolean props to customize behavior. Use composition instead. Each boolean doubles possible states.

### 1.2 Use Compound Components
Structure complex components with shared context. Subcomponents access state via context, not props.

## 2. State Management (MEDIUM)

### 2.1 Decouple State from UI
Provider is the only place that knows how state is managed. UI consumes the interface.

### 2.2 Generic Context Interfaces
Define state/actions/meta interface for dependency injection.

### 2.3 Lift State into Providers
Enable sibling components outside main UI to access state.

## 3. Implementation Patterns (MEDIUM)

### 3.1 Explicit Variants
Create explicit variant components instead of boolean modes.

### 3.2 Children Over Render Props
Use children for composition.

## 4. React 19 APIs (MEDIUM)
- No forwardRef needed
- Use `use()` instead of `useContext()`
