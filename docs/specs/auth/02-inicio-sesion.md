# R2 — Inicio de Sesión
**Status:** ✅ Completado

## Descripción
El usuario registrado debe poder autenticarse en LifeVault mediante su email y contraseña para acceder a su espacio personal.

## Contexto
Bounded Context: `auth`

## Flujo Principal
1. El usuario accede a la vista de inicio de sesión (`/login`).
2. Ingresa su email y contraseña.
3. El sistema valida que ambos campos no estén vacíos.
4. Se envía la petición al backend con credenciales.
5. El backend verifica que el email exista y la contraseña coincida.
6. Si es correcto, retorna un token de sesión.
7. El usuario es redirigido al dashboard.

## Flujos Alternativos
- **Credenciales inválidas:** Mensaje: "Email o contraseña incorrectos." (no revelar cuál falló).
- **Cuenta no verificada (futuro):** Mensaje: "Por favor verifica tu correo electrónico."
- **Error del servidor:** Mensaje genérico.

## Reglas de Negocio
- No revelar si el email existe o no en el sistema.
- Máximo 5 intentos fallidos antes de bloqueo temporal de 15 minutos (backend).
- El token de sesión se almacena en Zustand y en localStorage para persistencia.

## Criterios de Aceptación
- [ ] Login exitoso redirige al dashboard.
- [ ] Credenciales incorrectas muestran error genérico.
- [ ] Sesión persiste al recargar la página (token en localStorage).
- [ ] Cierre de sesión elimina el token y redirige al login.

## Progreso de Implementación

| Capa | Archivo | Estado |
|------|---------|--------|
| Dominio | `User.ts` (validaciones de login) | ✅ |
| Dominio | `AuthRepository.ts` (puerto) | ✅ |
| Aplicación | `LoginUseCase.ts` | ✅ |
| Tests | `LoginUseCase.test.ts` (4 tests) | ✅ |
| Infraestructura | `FetchAuthRepository.ts` (adaptador) | ✅ |
| Infraestructura | `auth.store.ts` (Zustand) | ✅ |
| Infraestructura | `useAuthController.ts` (hook) | ✅ |
| UI | `LoginView.tsx` | ✅ |
