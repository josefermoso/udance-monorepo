# 🔄 VERCEL CLI AUTOMATION GUIDE

## 📋 STATUS: Hybrid Approach
- **✅ Vercel CLI**: Instalado y autenticado
- **⚡ NextAuth Secret**: Generado y configurado
- **🎯 Next Step**: Manual project creation + CLI automation

## 🤝 HYBRID APPROACH (Most Efficient)

### Phase 1: Manual Project Creation (5 minutes)
```bash
# En Vercel Dashboard:
1. Crear "udance-staging" (branch: dev)
2. Crear "udance-prod" (branch: main)  
3. Crear "udance-dev" (branch: all)
```

### Phase 2: CLI Automation (immediate)
```bash
# Configurar variables de entorno automáticamente:
vercel env add NEXTAUTH_SECRET "0ebaaa177aa1235e3f5027cf60855c4b6752c43cb305be0aac424d9cd4fbcb71" staging
vercel env add NEXTAUTH_SECRET "0ebaaa177aa1235e3f5027cf60855c4b6752c43cb305be0aac424d9cd4fbcb71" production
vercel env add NEXTAUTH_SECRET "0ebaaa177aa1235e3f5027cf60855c4b6752c43cb305be0aac424d9cd4fbcb71" development

# Configurar Supabase vars (después de crear proyectos Supabase):
vercel env add NEXT_PUBLIC_SUPABASE_URL "[STAGING-URL]" staging
vercel env add NEXT_PUBLIC_SUPABASE_URL "[PROD-URL]" production
vercel env add NEXT_PUBLIC_SUPABASE_URL "[DEV-URL]" development

# Deploy automático:
vercel --prod  # Deploy a production
vercel        # Deploy a preview
```

## 🎯 CLI COMMANDS READY TO USE

### Environment Variables Setup
```bash
#!/bin/bash
# Script para configurar todas las variables

# NextAuth (Mismo para todos)
vercel env add NEXTAUTH_SECRET "0ebaaa177aa1235e3f5027cf60855c4b6752c43cb305be0aac424d9cd4fbcb71" staging
vercel env add NEXTAUTH_SECRET "0ebaaa177aa1235e3f5027cf60855c4b6752c43cb305be0aac424d9cd4fbcb71" production  
vercel env add NEXTAUTH_SECRET "0ebaaa177aa1235e3f5027cf60855c4b6752c43cb305be0aac424d9cd4fbcb71" development

# URLs por entorno
vercel env add NEXTAUTH_URL "https://udance-staging.vercel.app" staging
vercel env add NEXTAUTH_URL "https://udance-prod.vercel.app" production
vercel env add NEXTAUTH_URL "https://udance-dev.vercel.app" development

# Node ENV
vercel env add NODE_ENV "staging" staging
vercel env add NODE_ENV "production" production
vercel env add NODE_ENV "development" development

# Google OAuth (pendiente de agregar desde secrets.md)
# vercel env add NEXT_PUBLIC_GOOGLE_CLIENT_ID "[FROM-SECRETS]" staging
# vercel env add GOOGLE_CLIENT_SECRET "[FROM-SECRETS]" staging
```

### Deployment Automation
```bash
# Deploy específico por branch:
git checkout dev && vercel --prod  # Deploy staging
git checkout main && vercel --prod # Deploy production
git checkout feature/xyz && vercel # Deploy preview to dev
```

## 🎯 CURRENT READY STATUS

✅ **Tenemos listo**:
- Vercel CLI instalado y autenticado
- NextAuth secret generado  
- Configuraciones JSON preparadas
- Scripts de automatización listos

🎯 **Solo necesitamos**:
- 5 minutos para crear proyectos en dashboard
- Ejecutar los comandos CLI para configurar variables

## 🚀 RECOMMENDATION

**Opción A**: Crear proyectos manualmente (5 min) + automatizar todo lo demás con CLI

**Opción B**: Proceder con Task 3 (Supabase projects) mientras tanto

**¿Cuál prefieres?** 