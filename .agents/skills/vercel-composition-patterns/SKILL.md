---
name: vercel-composition-patterns
description:
  React composition patterns that scale. Use when refactoring components with
  boolean prop proliferation, building flexible component libraries, or
  designing reusable APIs. Triggers on tasks involving compound components,
  render props, context providers, or component architecture. Includes React 19
  API changes.
license: MIT
metadata:
  author: vercel
  version: '1.0.0'
---

# React Composition Patterns

Composition patterns for building flexible, maintainable React components. Avoid
boolean prop proliferation by using compound components, lifting state, and
composing internals.

## When to Apply

- Refactoring components with many boolean props
- Building reusable component libraries
- Designing flexible component APIs
- Working with compound components or context providers

## Rule Categories by Priority

| Priority | Category                | Impact | Prefix          |
| -------- | ----------------------- | ------ | --------------- |
| 1        | Component Architecture  | HIGH   | `architecture-` |
| 2        | State Management        | MEDIUM | `state-`        |
| 3        | Implementation Patterns | MEDIUM | `patterns-`     |
| 4        | React 19 APIs           | MEDIUM | `react19-`      |

---

## 1. Component Architecture (HIGH)

### 1.1 Avoid Boolean Prop Proliferation

Don't add boolean props like `isThread`, `isEditing` to customize behavior.
Each boolean doubles possible states. Use composition instead.

**Incorrect:**
```tsx
function Composer({ isThread, isEditing, isForwarding }: Props) {
  return (
    <form>
      {isThread ? <ThreadField /> : null}
      {isEditing ? <EditActions /> : <DefaultActions />}
    </form>
  )
}
```

**Correct:**
```tsx
function ThreadComposer() {
  return (
    <Composer.Frame>
      <Composer.Input />
      <Composer.Footer>
        <Composer.Submit />
      </Composer.Footer>
    </Composer.Frame>
  )
}
```

### 1.2 Use Compound Components

Structure complex components as compound components with shared context.
Subcomponents access state via context, not props.

```tsx
const ComposerContext = createContext<ComposerValue | null>(null)

function ComposerProvider({ children, state, actions }: Props) {
  return <ComposerContext value={{ state, actions }}>{children}</ComposerContext>
}

function ComposerInput() {
  const { state, actions } = use(ComposerContext)
  return <TextInput value={state.input} onChangeText={actions.update} />
}

const Composer = { Provider: ComposerProvider, Frame: ComposerFrame, Input: ComposerInput }
```

---

## 2. State Management (MEDIUM)

### 2.1 Decouple State from UI

The provider is the only place that knows how state is managed. UI components
consume the context interface — they don't know if state comes from useState,
Zustand, or server sync.

```tsx
// Provider handles all state details
function ChannelProvider({ channelId, children }) {
  const { state, update, submit } = useGlobalChannel(channelId)
  return <Composer.Provider state={state} actions={{ update, submit }}>{children}</Composer.Provider>
}

// Same UI works with any provider
<ChannelProvider channelId="abc">
  <Composer.Frame>
    <Composer.Input />
    <Composer.Submit />
  </Composer.Frame>
</ChannelProvider>
```

### 2.2 Define Generic Context Interfaces

Define context with three parts: `state`, `actions`, `meta`. This enables
dependency injection — swap providers, keep the same UI.

```tsx
interface ComposerValue {
  state: { input: string; isSubmitting: boolean }
  actions: { update: (text: string) => void; submit: () => void }
  meta: { inputRef: RefObject<TextInput> }
}
```

### 2.3 Lift State into Provider Components

Move state into providers so sibling components outside the main UI can access
it without prop drilling.

```tsx
function ForwardButton() {
  const { actions } = use(ComposerContext)
  return <Button onPress={actions.submit}>Forward</Button>
}

// Works because ForwardButton is inside ForwardMessageProvider
<ForwardMessageProvider>
  <Dialog>
    <Composer.Frame>...</Composer.Frame>
    <ForwardButton /> {/* Outside Composer.Frame but inside provider */}
  </Dialog>
</ForwardMessageProvider>
```

---

## 3. Implementation Patterns (MEDIUM)

### 3.1 Create Explicit Component Variants

Instead of one component with modes, create explicit variants.

```tsx
// Instead of <Composer isThread isEditing={false} />
<ThreadComposer channelId="abc" />
<EditMessageComposer messageId="xyz" />
```

### 3.2 Prefer Children Over Render Props

Use `children` for composition instead of `renderX` props.

```tsx
// Better
<Composer.Frame>
  <Composer.Input />
  <Composer.Footer>
    <Composer.Submit />
  </Composer.Footer>
</Composer.Frame>

// Instead of
<Composer renderHeader={() => <Header />} renderFooter={() => <Footer />} />
```

---

## 4. React 19 APIs (MEDIUM)

> React 19+ only. Skip if using React 18 or earlier.

- **No `forwardRef`**: `ref` is a regular prop now
- **Use `use()` instead of `useContext()`**: `const value = use(MyContext)`
