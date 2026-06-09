---
name: git-workflow
description: Ayudante de flujo de trabajo Git. Ayuda con commits, ramas y pull requests siguiendo mejores prácticas.
---

# Git Workflow Skill

Guía de flujo de trabajo Git con conventional commits, gestión de ramas y buenas prácticas.

## Commit Message Guidelines

Usa el formato **Conventional Commits**:

```
<tipo>(<alcance>): <asunto>

<cuerpo>

<footer>
```

### Tipos permitidos

| Tipo       | Uso                                    |
| ---------- | -------------------------------------- |
| `feat`     | Nueva funcionalidad                    |
| `fix`      | Corrección de bug                      |
| `refactor` | Refactorización de código              |
| `chore`    | Tareas de mantenimiento                |
| `docs`     | Cambios en documentación               |
| `style`    | Formato, estilos (sin cambio lógico)   |
| `test`     | Añadir o corregir tests                |
| `perf`     | Mejora de rendimiento                  |
| `ci`       | Cambios en CI/CD                       |
| `build`    | Cambios en sistema de build            |
| `revert`   | Revertir un commit anterior            |

### Ejemplos

```
feat(auth): add login endpoint
fix(api): handle null response on timeout
refactor(parser): extract validation logic
chore(deps): update lodash to 4.17.21
docs(readme): update installation instructions
style(button): fix indentation
test(utils): add unit tests for formatter
```

## Branch Management

### Naming Conventions

- `main` — rama principal, producción
- `develop` — rama de integración
- `feature/*` — nuevas funcionalidades
- `fix/*` — correcciones de bugs
- `hotfix/*` — correcciones urgentes
- `release/*` — preparación de releases

### Buenas Prácticas

- Crear ramas desde `main` o `develop` actualizado
- Mantener ramas de corta duración
- Hacer rebase antes de merge para historial limpio
- Eliminar ramas después de mergear
- Usar `git pull --rebase` en lugar de `git pull`

## Workflow Básico

```bash
# Actualizar rama base
git checkout main
git pull --rebase origin main

# Crear rama de feature
git checkout -b feature/mi-feature

# Trabajar y commitear
git add -A
git commit -m "feat(scope): descripción del cambio"

# Sincronizar con main (rebase)
git fetch origin
git rebase origin/main

# Push y crear PR
git push -u origin feature/mi-feature
gh pr create --title "feat(scope): descripción" --body "## Resumen"
```

## Resolución de Conflictos

1. `git status` — identificar archivos en conflicto
2. Editar archivos, eliminar marcadores `<<<<<<<`, `=======`, `>>>>>>>`
3. `git add <archivo>` — marcar como resuelto
4. `git rebase --continue` — continuar rebase
5. Si es necesario abortar: `git rebase --abort`

## Operaciones Comunes

| Operación | Comando |
|-----------|---------|
| Deshacer cambios locales | `git restore <archivo>` |
| Deshacer staged | `git restore --staged <archivo>` |
| Revertir commit | `git revert <hash>` |
| Guardar cambios temporales | `git stash push -m "mensaje"` |
| Recuperar stash | `git stash pop` |
| Rebase interactivo | `git rebase -i HEAD~N` |
| Cherry-pick | `git cherry-pick <hash>` |
| Ver historial | `git log --oneline --graph --decorate` |
