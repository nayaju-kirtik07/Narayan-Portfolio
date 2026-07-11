# Cloudflare R2 Bucket Setup Script
# Run this after installing wrangler: npm install -g wrangler

Write-Host "=== Cloudflare R2 Bucket Setup ===" -ForegroundColor Cyan
Write-Host ""

# 1. Login to Cloudflare
Write-Host "Step 1: Login to Cloudflare (opens browser)" -ForegroundColor Yellow
wrangler login

# 2. Create R2 bucket
Write-Host ""
Write-Host "Step 2: Creating R2 bucket 'narayan-portfolio'..." -ForegroundColor Yellow
wrangler r2 bucket create narayan-portfolio

# 3. Create API token for R2
Write-Host ""
Write-Host "Step 3: Generate R2 credentials..." -ForegroundColor Yellow
Write-Host "Run: wrangler r2 bucket list"
Write-Host ""
Write-Host "Then create an API token at: https://dash.cloudflare.com/profile/api-tokens" -ForegroundColor Green
Write-Host "Permissions needed: R2 Bucket (Read + Write)"
Write-Host ""
Write-Host "Step 4: Update .env.local with your R2 credentials:" -ForegroundColor Yellow
Write-Host @"
R2_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=<your-access-key-id>
R2_SECRET_ACCESS_KEY=<your-secret-access-key>
R2_BUCKET_NAME=narayan-portfolio
R2_PUBLIC_URL=https://pub-<hash>.r2.dev
"@
Write-Host ""
Write-Host "=== To enable public access on your bucket ===" -ForegroundColor Cyan
Write-Host "1. Go to Cloudflare Dashboard > R2 > narayan-portfolio"
Write-Host "2. Settings > Public Access > Enable"
Write-Host "3. Copy the Public Bucket URL and add to .env.local as R2_PUBLIC_URL"
