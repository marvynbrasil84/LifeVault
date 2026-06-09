# R1 — Registro de Usuario
**Status:** ✅ Completado

## Descripción
El usuario debe poder crear una cuenta en LifeVault proporcionando su correo electrónico, nombre completo y contraseña. El sistema validará los datos, verificará que el email no esté registrado y persistirá el nuevo usuario.

## Contexto
Bounded Context: `auth`

## Flujo Principal
1. El usuario accede a la vista de registro (`/register`).
2. Completa el formulario con: nombre completo, email y contraseña (con confirmación).
3. El sistema valida los campos:
   - Nombre: obligatorio, mínimo 2 caracteres.
   - Email: formato válido, único en el sistema.
   - Contraseña: mínimo 8 caracteres, al menos 1 mayúscula, 1 minúscula y 1 número.
   - Confirmación de contraseña: debe coincidir con la contraseña.
4. Si las validaciones pasan, se envía la petición al backend.
5. El backend crea el usuario (hash de contraseña) y retorna un token de sesión.
6. El usuario queda autenticado y es redirigido al dashboard.

## Flujos Alternativos
- **Email ya registrado:** El sistema muestra un mensaje de error: "Este correo ya está registrado. ¿Deseas iniciar sesión?" con un enlace a `/login`.
- **Datos inválidos:** Se muestran errores específicos por campo sin recargar la página.
- **Error del servidor:** Mensaje genérico: "Error al registrar. Intenta de nuevo más tarde."

## Reglas de Negocio
- El email debe ser único en el sistema.
- La contraseña nunca se almacena en texto plano (hash).
- El token de sesión tiene expiración de 7 días.

## Criterios de Aceptación
- [ ] Registro exitoso crea un usuario y retorna token.
- [ ] Email duplicado muestra error específico.
- [ ] Validaciones de formato se muestran en tiempo real.
- [ ] Contraseña no visible en ningún log o respuesta.

## Progreso de Implementación

| Capa | Archivo | Estado |
|------|---------|--------|
| Dominio | `User.ts` (validaciones de registro) | ✅ |
| Dominio | `AuthRepository.ts` (puerto) | ✅ |
| Aplicación | `RegisterUseCase.ts` | ✅ |
| Tests | `RegisterUseCase.test.ts` (5 tests) | ✅ |
| Infraestructura | `FetchAuthRepository.ts` (adaptador) | ✅ |
| Infraestructura | `auth.store.ts` (Zustand) | ✅ |
| Infraestructura | `AuthDependencyProvider.tsx` (DI) | ✅ |
| Infraestructura | `useAuthController.ts` (hook) | ✅ |
| UI | `RegisterView.tsx` | ✅ |
