#!/bin/bash

# Vercel Projects Analysis Script
# This script documents environment variables from each UDance Vercel project

PROJECTS=("udance-prod" "udance-staging" "udance-dev")
OUTPUT_FILE="memory-bank/vercel-env-backup.md"

echo "# Vercel Environment Variables Backup" > $OUTPUT_FILE
echo "Generated: $(date)" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

for project in "${PROJECTS[@]}"; do
    echo "## Project: $project" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
    
    # Note: Manual step required - need to link to each project
    echo "### Environment Variables" >> $OUTPUT_FILE
    echo "\`\`\`" >> $OUTPUT_FILE
    echo "# To get env vars for $project:" >> $OUTPUT_FILE
    echo "# 1. Run: vercel link --project $project" >> $OUTPUT_FILE
    echo "# 2. Run: vercel env ls" >> $OUTPUT_FILE
    echo "# 3. Copy output here" >> $OUTPUT_FILE
    echo "\`\`\`" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
    
    echo "### Project Details" >> $OUTPUT_FILE
    echo "\`\`\`" >> $OUTPUT_FILE
    echo "# To get project details for $project:" >> $OUTPUT_FILE
    echo "# 1. Run: vercel project ls | grep $project" >> $OUTPUT_FILE
    echo "\`\`\`" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
done

echo "Analysis script completed. Manual steps required to collect environment variables."
echo "Output file: $OUTPUT_FILE" 