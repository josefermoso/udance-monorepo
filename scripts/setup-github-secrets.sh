#!/bin/bash

set -e  # Exit on any error

echo "🔐 Setting up GitHub Secrets for UDance CI/CD"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if secrets.md exists
if [ ! -f "secrets.md" ]; then
    echo -e "${RED}❌ secrets.md not found!${NC}"
    exit 1
fi

echo -e "${BLUE}📖 Reading existing secrets from secrets.md...${NC}"

# Get VERCEL_TOKEN (user needs to provide this)
echo ""
echo -e "${YELLOW}🔑 VERCEL_TOKEN needed:${NC}"
echo "1. Go to: https://vercel.com/account/tokens"
echo "2. Create a new token or copy existing one"
echo -n "Enter your VERCEL_TOKEN: "
read -s VERCEL_TOKEN
echo ""

if [ -z "$VERCEL_TOKEN" ]; then
    echo -e "${RED}❌ VERCEL_TOKEN is required${NC}"
    exit 1
fi

# Get Vercel organization ID (we know this from the CLI output)
VERCEL_ORG_ID="josefermosos-projects"
echo -e "${GREEN}✅ VERCEL_ORG_ID: $VERCEL_ORG_ID${NC}"

# Get project aliases from secrets.md
VERCEL_STAGING_ALIAS=$(grep "udance-staging" secrets.md | grep "https://" | sed 's/.*https:\/\///' | sed 's/.*`https:\/\///' | sed 's/`.*//')
VERCEL_PROD_ALIAS=$(grep "udance-prod" secrets.md | grep "https://" | sed 's/.*https:\/\///' | sed 's/.*`https:\/\///' | sed 's/`.*//')

echo -e "${GREEN}✅ VERCEL_STAGING_ALIAS: $VERCEL_STAGING_ALIAS${NC}"
echo -e "${GREEN}✅ VERCEL_PROD_ALIAS: $VERCEL_PROD_ALIAS${NC}"

# Function to get project ID
get_project_id() {
    local project_name=$1
    local temp_dir="/tmp/udance-${project_name}-temp"
    
    echo -e "${BLUE}🔍 Getting project ID for $project_name...${NC}"
    
    # Clean up any existing temp directory
    rm -rf "$temp_dir"
    mkdir -p "$temp_dir"
    cd "$temp_dir"
    
    # Set the token for this operation
    export VERCEL_TOKEN="$VERCEL_TOKEN"
    
    # Link to the project
    echo "$VERCEL_ORG_ID" | vercel link --yes 2>/dev/null || true
    
    # Try to select the project (this might be interactive)
    if [ ! -f ".vercel/project.json" ]; then
        echo -e "${YELLOW}⚠️  Please select project '$project_name' when prompted:${NC}"
        vercel link
    fi
    
    if [ -f ".vercel/project.json" ]; then
        PROJECT_ID=$(cat .vercel/project.json | grep '"projectId"' | sed 's/.*"projectId": *"//' | sed 's/".*//')
        echo -e "${GREEN}✅ Found project ID: $PROJECT_ID${NC}"
        cd - > /dev/null
        rm -rf "$temp_dir"
        echo "$PROJECT_ID"
    else
        echo -e "${RED}❌ Could not get project ID for $project_name${NC}"
        cd - > /dev/null
        rm -rf "$temp_dir"
        return 1
    fi
}

# Get project IDs
echo ""
echo -e "${BLUE}📋 Getting Vercel project IDs...${NC}"

VERCEL_PROJECT_ID_STAGING=$(get_project_id "staging")
VERCEL_PROJECT_ID_PRODUCTION=$(get_project_id "production")

if [ -z "$VERCEL_PROJECT_ID_STAGING" ] || [ -z "$VERCEL_PROJECT_ID_PRODUCTION" ]; then
    echo -e "${RED}❌ Failed to get project IDs${NC}"
    exit 1
fi

# Update secrets.md with Vercel information
echo ""
echo -e "${BLUE}📝 Updating secrets.md with Vercel information...${NC}"

# Add Vercel section to secrets.md if it doesn't exist
if ! grep -q "## 🚀 Vercel Configuration" secrets.md; then
    cat >> secrets.md << EOF

## 🚀 Vercel Configuration - ✅ CONFIGURADO
- **Organization ID**: \`$VERCEL_ORG_ID\`
- **Token**: \`$VERCEL_TOKEN\`

### 📦 Projects
- **Staging Project ID**: \`$VERCEL_PROJECT_ID_STAGING\`
- **Production Project ID**: \`$VERCEL_PROJECT_ID_PRODUCTION\`

### 🌐 Deployment URLs  
- **Staging Alias**: \`$VERCEL_STAGING_ALIAS\`
- **Production Alias**: \`$VERCEL_PROD_ALIAS\`
EOF
    echo -e "${GREEN}✅ Updated secrets.md with Vercel configuration${NC}"
fi

# Set up GitHub secrets
echo ""
echo -e "${BLUE}🔐 Setting up GitHub Secrets...${NC}"

# Check if gh CLI is available and authenticated
if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI (gh) not found. Install with: brew install gh${NC}"
    exit 1
fi

if ! gh auth status &> /dev/null; then
    echo -e "${YELLOW}⚠️  GitHub CLI not authenticated. Running gh auth login...${NC}"
    gh auth login
fi

# Set the secrets
echo "Setting GitHub repository secrets..."

gh secret set VERCEL_TOKEN --body "$VERCEL_TOKEN"
echo -e "${GREEN}✅ Set VERCEL_TOKEN${NC}"

gh secret set VERCEL_ORG_ID --body "$VERCEL_ORG_ID"
echo -e "${GREEN}✅ Set VERCEL_ORG_ID${NC}"

gh secret set VERCEL_PROJECT_ID_STAGING --body "$VERCEL_PROJECT_ID_STAGING"
echo -e "${GREEN}✅ Set VERCEL_PROJECT_ID_STAGING${NC}"

gh secret set VERCEL_PROJECT_ID_PRODUCTION --body "$VERCEL_PROJECT_ID_PRODUCTION"
echo -e "${GREEN}✅ Set VERCEL_PROJECT_ID_PRODUCTION${NC}"

gh secret set VERCEL_STAGING_ALIAS --body "$VERCEL_STAGING_ALIAS"
echo -e "${GREEN}✅ Set VERCEL_STAGING_ALIAS${NC}"

gh secret set VERCEL_PROD_ALIAS --body "$VERCEL_PROD_ALIAS"
echo -e "${GREEN}✅ Set VERCEL_PROD_ALIAS${NC}"

echo ""
echo -e "${GREEN}🎉 All GitHub Secrets configured successfully!${NC}"
echo ""
echo -e "${BLUE}📋 Summary of configured secrets:${NC}"
echo "- VERCEL_TOKEN: ✅"
echo "- VERCEL_ORG_ID: ✅"
echo "- VERCEL_PROJECT_ID_STAGING: ✅"
echo "- VERCEL_PROJECT_ID_PRODUCTION: ✅"
echo "- VERCEL_STAGING_ALIAS: ✅"
echo "- VERCEL_PROD_ALIAS: ✅"
echo ""
echo -e "${GREEN}🚀 Your CI/CD workflows are now ready!${NC}"
echo "- Pushes to 'dev' branch → Deploy to staging"
echo "- Pushes to 'main' branch → Deploy to production" 