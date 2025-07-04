#!/bin/bash

echo "🔍 Getting Vercel configuration for GitHub Secrets..."
echo "======================================================"

# Get team/org ID
echo ""
echo "📋 VERCEL_ORG_ID:"
TEAM_ID=$(vercel teams ls | grep "josefermosos-projects" | awk '{print $1}')
echo "josefermosos-projects"

echo ""
echo "🔑 For GitHub Secrets, you need:"
echo ""

echo "VERCEL_ORG_ID=\"josefermosos-projects\""

echo ""
echo "🌐 Project URLs and Aliases:"
echo "VERCEL_STAGING_ALIAS=\"udance-staging.vercel.app\""
echo "VERCEL_PROD_ALIAS=\"udance-prod.vercel.app\""

echo ""
echo "⚠️  Missing Information:"
echo "1. VERCEL_TOKEN - Get from: https://vercel.com/account/tokens"
echo "2. VERCEL_PROJECT_ID_STAGING - Get with: vercel link (in staging project)"
echo "3. VERCEL_PROJECT_ID_PRODUCTION - Get with: vercel link (in prod project)"

echo ""
echo "📝 Next steps:"
echo "1. Go to https://vercel.com/account/tokens"
echo "2. Create a new token (or use existing)"
echo "3. Run this script to get project IDs:"
echo ""
echo "   # For staging project ID:"
echo "   cd /tmp && mkdir udance-staging-temp && cd udance-staging-temp"
echo "   vercel link --yes"
echo "   # Select: josefermosos-projects -> udance-staging"
echo "   cat .vercel/project.json"
echo ""
echo "   # For production project ID:"  
echo "   cd /tmp && mkdir udance-prod-temp && cd udance-prod-temp"
echo "   vercel link --yes"
echo "   # Select: josefermosos-projects -> udance-prod"
echo "   cat .vercel/project.json" 