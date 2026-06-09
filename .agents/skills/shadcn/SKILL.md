---
name: shadcn
description: Manages shadcn components and projects — adding, searching, fixing, debugging, styling, and composing UI. Provides project context, component docs, and usage examples. Applies when working with shadcn/ui, component registries, presets, --preset codes, or any project with a components.json file. Also triggers for "shadcn init", "create an app with --preset", or "switch to --preset".
user-invocable: false
allowed-tools: Bash(npx shadcn@latest *), Bash(pnpm dlx shadcn@latest *), Bash(bunx --bun shadcn@latest *)
---

# shadcn/ui

A framework for building ui, components and design systems. Components are added as source code to the user's project via the CLI.

> **IMPORTANT:** Run all CLI commands using the project's package runner: `npx shadcn@latest`, `pnpm dlx shadcn@latest`, or `bunx --bun shadcn@latest` — based on the project's `packageManager`. Examples below use `npx shadcn@latest` but substitute the correct runner for the project.

## Principles

1. **Use existing components first.** Use `npx shadcn@latest search` to check registries before writing custom UI. Check community registries too.
2. **Compose, don't reinvent.** Settings page = Tabs + Card + form controls. Dashboard = Sidebar + Card + Chart + Table.
3. **Use built-in variants before custom styles.** `variant="outline"`, `size="sm"`, etc.
4. **Use semantic colors.** `bg-primary`, `text-muted-foreground` — never raw values like `bg-blue-500`.

## Critical Rules

### Styling & Tailwind
- **`className` for layout, not styling.** Never override component colors or typography.
- **No `space-x-*` or `space-y-*`.** Use `flex` with `gap-*`.
- **Use `size-*` when width and height are equal.** `size-10` not `w-10 h-10`.
- **Use `truncate` shorthand.** Not `overflow-hidden text-ellipsis whitespace-nowrap`.
- **No manual `dark:` color overrides.** Use semantic tokens (`bg-background`, `text-muted-foreground`).
- **Use `cn()` for conditional classes.** Don't write manual template literal ternaries.

### Forms & Inputs
- **Forms use `FieldGroup` + `Field`.** Never use raw `div` with `space-y-*`.
- **`InputGroup` uses `InputGroupInput`/`InputGroupTextarea`.**
- **Option sets (2-7 choices) use `ToggleGroup`.**
- **Field validation uses `data-invalid` + `aria-invalid`.**
- **`Button` has no `isPending`/`isLoading`.** Compose with `Spinner` + `data-icon` + `disabled`.

### Component Structure
- **Items always inside their Group.** `SelectItem` → `SelectGroup`. `DropdownMenuItem` → `DropdownMenuGroup`.
- **Dialog, Sheet, and Drawer always need a Title.** For accessibility. Use `className="sr-only"` if visually hidden.
- **Use full Card composition.** `CardHeader`/`CardTitle`/`CardDescription`/`CardContent`/`CardFooter`.
- **`TabsTrigger` must be inside `TabsList`.**
- **`Avatar` always needs `AvatarFallback`.**
- **Use `Separator`** instead of `<hr>` or `<div className="border-t">`.
- **Use `Skeleton`** for loading placeholders.
- **Use `Badge`** instead of custom styled spans.
- **Empty states use `Empty`.** Don't build custom empty state markup.
- **Toast via `sonner`.** Use `toast()` from `sonner`.

### Icons
- **Icons in `Button` use `data-icon`.** `data-icon="inline-start"` or `data-icon="inline-end"`.
- **No sizing classes on icons inside components.**
- **Pass icons as objects, not string keys.**

## Key Patterns

```tsx
// Form layout: FieldGroup + Field
<FieldGroup>
  <Field>
    <FieldLabel htmlFor="email">Email</FieldLabel>
    <Input id="email" />
  </Field>
</FieldGroup>

// Validation: data-invalid on Field, aria-invalid on the control
<Field data-invalid>
  <FieldLabel>Email</FieldLabel>
  <Input aria-invalid />
  <FieldDescription>Invalid email.</FieldDescription>
</Field>

// Icons in buttons: data-icon, no sizing classes
<Button>
  <SearchIcon data-icon="inline-start" />
  Search
</Button>

// Spacing: gap-*, not space-y-*
<div className="flex flex-col gap-4">

// Equal dimensions: size-*, not w-* h-*
<Avatar className="size-10">
```

## Component Selection

| Need                       | Use                                                                   |
| -------------------------- | --------------------------------------------------------------------- |
| Button/action              | `Button` with appropriate variant                                     |
| Form inputs                | `Input`, `Select`, `Combobox`, `Switch`, `Checkbox`, `RadioGroup`     |
| Toggle between 2-5 options | `ToggleGroup` + `ToggleGroupItem`                                     |
| Data display               | `Table`, `Card`, `Badge`, `Avatar`                                    |
| Navigation                 | `Sidebar`, `NavigationMenu`, `Breadcrumb`, `Tabs`                     |
| Overlays                   | `Dialog`, `Sheet`, `Drawer`, `AlertDialog`                            |
| Feedback                   | `sonner` (toast), `Alert`, `Progress`, `Skeleton`, `Spinner`          |
| Command palette            | `Command` inside `Dialog`                                             |
| Charts                     | `Chart` (wraps Recharts)                                              |
| Layout                     | `Card`, `Separator`, `Resizable`, `ScrollArea`, `Accordion`           |
| Empty states               | `Empty`                                                               |
| Menus                      | `DropdownMenu`, `ContextMenu`, `Menubar`                              |
| Tooltips/info              | `Tooltip`, `HoverCard`, `Popover`                                     |

## Quick Reference

```bash
# Initialize existing project
npx shadcn@latest init --defaults

# Add components
npx shadcn@latest add button card dialog
npx shadcn@latest add @magicui/shimmer-button

# Search registries
npx shadcn@latest search @shadcn -q "sidebar"
npx shadcn@latest search

# Get component docs
npx shadcn@latest docs button dialog select

# Preview changes before adding
npx shadcn@latest add button --dry-run

# Update components (smart merge)
npx shadcn@latest add button --dry-run
npx shadcn@latest add button --diff button.tsx
```
