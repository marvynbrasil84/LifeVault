# Progreso — R3: Recuperación de Contraseña

**Status:** ✅ Completado
**Spec:** [`03-recuperacion-password.md`](./03-recuperacion-password.md)

| # | Tarea | Archivo | Estado |
|---|-------|---------|--------|
| 1 | Validaciones email/password/reset en User | `domain/models/User.ts` | ✅ |
| 2 | Puerto (forgotPassword, resetPassword) | `domain/ports/AuthRepository.ts` | ✅ |
| 3 | Caso de uso ForgotPasswordUseCase | `application/ForgotPasswordUseCase.ts` | ✅ |
| 4 | Caso de uso ResetPasswordUseCase | `application/ResetPasswordUseCase.ts` | ✅ |
| 5 | Tests forgot (2 casos) | `application/__tests__/ForgotPasswordUseCase.test.ts` | ✅ |
| 6 | Tests reset (4 casos) | `application/__tests__/ResetPasswordUseCase.test.ts` | ✅ |
| 7 | Adaptador (forgot/reset en FetchAuthRepository) | `infrastructure/adapters/FetchAuthRepository.ts` | ✅ |
| 8 | Controlador (forgotPassword, resetPassword) | `infrastructure/hooks/useAuthController.ts` | ✅ |
| 9 | Vista ForgotPasswordView | `infrastructure/views/ForgotPasswordView.tsx` | ✅ |
| 10 | Vista ResetPasswordView | `infrastructure/views/ResetPasswordView.tsx` | ✅ |
| 11 | Navegación (ruta reset con token) | `App.tsx` | ✅ |

**Total:** 11/11 — ✅
