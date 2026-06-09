# Progreso — R2: Inicio de Sesión

**Status:** ✅ Completado
**Spec:** [`02-inicio-sesion.md`](./02-inicio-sesion.md)

| # | Tarea | Archivo | Estado |
|---|-------|---------|--------|
| 1 | Validaciones de login en User | `domain/models/User.ts` | ✅ |
| 2 | Puerto AuthRepository (login) | `domain/ports/AuthRepository.ts` | ✅ |
| 3 | Caso de uso LoginUseCase | `application/LoginUseCase.ts` | ✅ |
| 4 | Tests de login (4 casos) | `application/__tests__/LoginUseCase.test.ts` | ✅ |
| 5 | Adaptador (login en FetchAuthRepository) | `infrastructure/adapters/FetchAuthRepository.ts` | ✅ |
| 6 | Store (setSession, clearSession) | `infrastructure/state/auth.store.ts` | ✅ |
| 7 | Controlador (login, logout en hook) | `infrastructure/hooks/useAuthController.ts` | ✅ |
| 8 | Vista LoginView | `infrastructure/views/LoginView.tsx` | ✅ |
| 9 | Navegación login ↔ registro | `App.tsx` | ✅ |

**Total:** 9/9 — ✅
