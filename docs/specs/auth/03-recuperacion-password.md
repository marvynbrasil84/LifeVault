# R3 — Recuperación de Contraseña
**Status:** ✅ Completado

## Descripción
El usuario que olvidó su contraseña debe poder solicitar un restablecimiento mediante su email registrado. El sistema enviará un enlace mágico (o código) para crear una nueva contraseña.

## Contexto
Bounded Context: `auth`

## Flujo Principal
1. El usuario accede a la vista de recuperación (`/forgot-password`).
2. Ingresa su email registrado.
3. El sistema valida el formato del email.
4. Se envía la petición al backend.
5. El backend genera un token de reseteo con expiración de 1 hora y lo envía por email.
6. El usuario ve un mensaje de confirmación: "Si el email está registrado, recibirás un enlace de recuperación."
7. El usuario hace clic en el enlace y llega a `/reset-password?token=...`.
8. Ingresa su nueva contraseña (con confirmación).
9. El sistema valida la nueva contraseña (mismos requisitos que registro).
10. Se envía la petición al backend con el token y la nueva contraseña.
11. El backend actualiza la contraseña y el usuario es redirigido al login.

## Flujos Alternativos
- **Email no registrado:** Mismo mensaje de confirmación que en el caso exitoso.
- **Token inválido o expirado:** Mensaje: "El enlace de recuperación no es válido o ha expirado. Solicita uno nuevo."
- **Contraseña débil:** Errores específicos de validación.

## Reglas de Negocio
- El token de reseteo debe ser de un solo uso y expirar en 1 hora.
- No revelar si el email existe o no en el sistema.
- La nueva contraseña no puede ser igual a las últimas 3 usadas (backend futuro).

## Criterios de Aceptación
- [ ] Solicitud de reseteo muestra mensaje de confirmación genérico.
- [ ] Enlace con token válido permite cambiar la contraseña.
- [ ] Enlace con token expirado muestra error.
- [ ] Nueva contraseña cumple las validaciones de seguridad.

## Progreso de Implementación

| Capa | Archivo | Estado |
|------|---------|--------|
| Dominio | `User.ts` (validaciones email/password/reset) | ✅ |
| Dominio | `AuthRepository.ts` (puerto) | ✅ |
| Aplicación | `ForgotPasswordUseCase.ts` | ✅ |
| Aplicación | `ResetPasswordUseCase.ts` | ✅ |
| Tests | `ForgotPasswordUseCase.test.ts` (2 tests) | ✅ |
| Tests | `ResetPasswordUseCase.test.ts` (4 tests) | ✅ |
| Infraestructura | `FetchAuthRepository.ts` (adaptador) | ✅ |
| Infraestructura | `useAuthController.ts` (hook) | ✅ |
| UI | `ForgotPasswordView.tsx` | ✅ |
| UI | `ResetPasswordView.tsx` | ✅ |
