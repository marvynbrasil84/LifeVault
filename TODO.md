# Plan de Trabajo — LifeVault Auth Context

> Estado centralizado en [`docs/PROGRESS.md`](./docs/PROGRESS.md)
> Specs en `docs/specs/auth/`

## Fase 1 — Dominio (Domain)
- [x] `src/contexts/auth/domain/models/User.ts` — Entidad con validaciones
- [x] `src/contexts/auth/domain/ports/AuthRepository.ts` — Puerto (interfaz)

## Fase 2 — Casos de Uso (Application)
- [x] `src/contexts/auth/application/RegisterUseCase.ts` + tests
- [x] `src/contexts/auth/application/LoginUseCase.ts` + tests
- [x] `src/contexts/auth/application/ForgotPasswordUseCase.ts` + tests
- [x] `src/contexts/auth/application/ResetPasswordUseCase.ts` + tests

## Fase 3 — Infraestructura
- [x] `src/contexts/auth/infrastructure/adapters/FetchAuthRepository.ts`
- [x] `src/contexts/auth/infrastructure/state/auth.store.ts`
- [x] `src/contexts/auth/infrastructure/di/AuthDependencyContext.tsx`
- [x] `src/contexts/auth/infrastructure/di/AuthDependencyProvider.tsx`
- [x] `src/contexts/auth/infrastructure/di/useAuthDependencies.ts`
- [x] `src/contexts/auth/infrastructure/hooks/useAuthController.ts`

## Fase 4 — UI (Componentes React)
- [x] Componente Register
- [x] Componente Login
- [x] Componente ForgotPassword
- [x] Componente ResetPassword

## Fase 5 — Verificación
- [x] `npm run type-check`
- [x] `npm run lint`
- [x] `npm run test`
