# LifeVault — Progreso General

> Índice de progreso por spec.
> El detalle de cada spec está en su propio `*.progress.md`.

---

## Auth Context — `src/contexts/auth/`

| Spec | Status | Tareas | Progreso |
|------|--------|--------|----------|
| [R1 — Registro](./specs/auth/01-registro.md) | ✅ Completado | [12/12](./specs/auth/01-registro.progress.md) | ████████████ 100% |
| [R2 — Inicio de Sesión](./specs/auth/02-inicio-sesion.md) | ✅ Completado | [9/9](./specs/auth/02-inicio-sesion.progress.md) | ████████████ 100% |
| [R3 — Recuperación de Contraseña](./specs/auth/03-recuperacion-password.md) | ✅ Completado | [11/11](./specs/auth/03-recuperacion-password.progress.md) | ████████████ 100% |
| **Totales** | | **32/32** | **100%** |

### Leyenda
| Símbolo | Significado |
|---------|-------------|
| ⏳ | Pendiente |
| 🔄 | En progreso |
| ✅ | Completado |
| ❌ | Bloqueado |

---

## Cómo agregar un nuevo spec

1. Crear `docs/specs/[contexto]/NN-nombre.md` con la spec.
2. Crear `docs/specs/[contexto]/NN-nombre.progress.md` con sus tareas.
3. Agregar una fila en la tabla de `docs/PROGRESS.md`.
4. Ejecutar `npm run type-check && npm run lint && npm run test` antes de marcar tareas como completadas.
