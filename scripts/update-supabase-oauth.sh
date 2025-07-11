#!/bin/bash

# Update Supabase OAuth URLs Script
echo "🔐 Actualizando configuración de OAuth en Supabase..."

# Project Reference ID
PROJECT_REF="gcjdwjsexwxxwbciqvkl"

# Nota: Necesitas crear un token de acceso personal en: https://supabase.com/dashboard/account/tokens
# Reemplaza YOUR_TOKEN_HERE con tu token real
SUPABASE_TOKEN="${SUPABASE_ACCESS_TOKEN:-YOUR_TOKEN_HERE}"

if [ "$SUPABASE_TOKEN" = "YOUR_TOKEN_HERE" ]; then
    echo "❌ Error: Necesitas configurar tu token de acceso de Supabase"
    echo "1. Ve a: https://supabase.com/dashboard/account/tokens"
    echo "2. Genera un nuevo token"
    echo "3. Ejecuta: export SUPABASE_ACCESS_TOKEN='tu_token_aqui'"
    echo "4. Vuelve a ejecutar este script"
    exit 1
fi

# Construir las URLs permitidas
NEW_SITE_URL="https://udance-ak6g1b37d-josefermosos-projects.vercel.app"

# URLs de redirección permitidas (como JSON array string)
URI_ALLOW_LIST="https://udance-prod.vercel.app/**,https://udance-staging.vercel.app/**,https://udance-dev-josefermosos-projects.vercel.app/**,https://udance-ak6g1b37d-josefermosos-projects.vercel.app/**,https://*.vercel.app/auth/callback,http://localhost:3000/**,https://localhost:3000/**"

echo "📋 Configuración a aplicar:"
echo "  Site URL: $NEW_SITE_URL"  
echo "  URI Allow List: $URI_ALLOW_LIST"

# Actualizar configuración usando la API de Management
curl -X PATCH "https://api.supabase.com/v1/projects/$PROJECT_REF/config/auth" \
  -H "Authorization: Bearer $SUPABASE_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"site_url\": \"$NEW_SITE_URL\",
    \"uri_allow_list\": \"$URI_ALLOW_LIST\"
  }"

echo -e "\n\n✅ Configuración de OAuth actualizada en Supabase"
echo "🔄 Las URLs de OAuth ahora incluyen el nuevo proyecto udance-web" 