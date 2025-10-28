# Motans Starter (Firebase + Expo PWA)

Estructura lista para empezar. Este README incluye pasos rápidos para preparar el repo,
subirlo a GitHub, manejar secrets y (opcional) usar OIDC con GCP para CI/CD sin guardar claves
de servicio de larga duración en GitHub.

## Paso rápido — estado actual
- Repositorio inicializado localmente y primer commit realizado.
- `ci.yml` referencia secrets (no hay valores en texto plano).
- `src/config/env.ts` fue rellenado para centralizar variables de entorno.

## Pasos recomendados antes de push a GitHub

1. Revisa `.gitignore` y confirma que incluye `node_modules`, `.env*` y otros archivos sensibles.
2. Asegúrate de NO incluir archivos con credenciales (por ejemplo `service-account.json`).
3. Si quieres publicar el repo en GitHub ahora, usa `gh repo create owner/repo --private --source=. --remote=origin --push` o crea el repo manualmente y ejecuta:

```pwsh
git remote add origin https://github.com/owner/repo.git
git push -u origin main
```

Reemplaza `owner/repo` por tu usuario o la organización y el nombre del repo.

## Secrets necesarios (si usas el workflow actual `ci.yml`)

- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_SERVICE_ACCOUNT` (JSON completo) — opcional si no usas OIDC

Añade los secrets en: `Settings → Secrets and variables → Actions` (requiere permisos de administrador en el repo).

## Alternativa recomendada: OIDC (evita subir JSON de service account)

Para producción se recomienda configurar Workload Identity Federation en GCP y usar OIDC desde GitHub Actions.
Esto evita almacenar la clave de servicio en GitHub. Cuando termines con la configuración en GCP, tu workflow puede usar la acción oficial `google-github-actions/auth` para obtener credenciales temporales.

He incluido un ejemplo de workflow `ci-oidc.yml` en `.github/workflows/` que muestra ambas opciones y los pasos necesarios (comenta/descomenta según tu preferencia).

Si quieres, puedo:

- Subir el repo a GitHub por ti (necesito `owner/repo` y si lo quieres privado o público).
- Añadir los secrets usando `gh secret set` si tienes la CLI autenticada en esta máquina.
- Preparar paso a paso la configuración OIDC en GCP (Workload Identity Pool, Provider, permisos y binding) y completar el workflow.

---


chore(ci): trigger CI at 2025-10-28T22:21:55.3593573+01:00
