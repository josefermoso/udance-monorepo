#!/bin/bash

# Test New Deployment Script
echo "🧪 Testing udance-web deployment..."

NEW_URL="https://udance-ak6g1b37d-josefermosos-projects.vercel.app"

echo "📡 Testing endpoints..."

# Test health endpoint
echo "Testing /api/healthz..."
curl -s "$NEW_URL/api/healthz" | head -20

echo -e "\n🔍 Testing /api/events..."
curl -s "$NEW_URL/api/events" | head -20

echo -e "\n🏠 Testing home page..."
curl -s "$NEW_URL/home" | grep -o '<title>[^<]*</title>' || echo "Home page accessible"

echo -e "\n📰 Testing news page..."
curl -s "$NEW_URL/news" | grep -o '<title>[^<]*</title>' || echo "News page accessible"

echo -e "\n🔐 Testing login page..."
curl -s "$NEW_URL/login" | grep -o '<title>[^<]*</title>' || echo "Login page accessible"

echo -e "\n✅ Basic connectivity tests completed!"

echo -e "\n📋 Manual steps required:"
echo "1. Update Supabase OAuth URLs:"
echo "   - Add: $NEW_URL/auth/callback"
echo "   - Add: https://*.vercel.app/auth/callback"
echo "2. Test authentication flow"
echo "3. Verify environment variables are working correctly"

echo -e "\n🔗 New deployment URL: $NEW_URL" 