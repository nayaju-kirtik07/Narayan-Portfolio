# Cloudflare R2 CORS Setup
# Run this after configuring .env.local with your R2 credentials

Write-Host "=== Setting up CORS on R2 Bucket ===" -ForegroundColor Cyan

$endpoint = $env:R2_ENDPOINT
$accessKey = $env:R2_ACCESS_KEY_ID
$secretKey = $env:R2_SECRET_ACCESS_KEY
$bucket = $env:R2_BUCKET_NAME

if (-not $endpoint) {
  # Fallback: load from .env.local
  $envContent = Get-Content ".env.local"
  $endpoint = ($envContent | Select-String "R2_ENDPOINT=(.*)").Matches.Groups[1].Value
  $accessKey = ($envContent | Select-String "R2_ACCESS_KEY_ID=(.*)").Matches.Groups[1].Value
  $secretKey = ($envContent | Select-String "R2_SECRET_ACCESS_KEY=(.*)").Matches.Groups[1].Value
  $bucket = ($envContent | Select-String "R2_BUCKET_NAME=(.*)").Matches.Groups[1].Value
}

# CORS XML configuration
$corsXml = @'
<CORSConfiguration>
  <CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>HEAD</AllowedMethod>
    <AllowedHeader>*</AllowedHeader>
    <MaxAgeSeconds>3600</MaxAgeSeconds>
  </CORSRule>
</CORSConfiguration>
'@

Write-Host "Applying CORS to bucket: $bucket" -ForegroundColor Yellow

# Use curl to set CORS via S3 API
$date = (Get-Date).ToUniversalTime().ToString("ddd, dd MMM yyyy HH:mm:ss 'GMT'")
$contentType = "application/xml"
$resource = "/$bucket/?cors"
$stringToSign = "PUT`n`n$contentType`n$date`n$resource"

# Create HMAC-SHA1 signature
$hmac = New-Object System.Security.Cryptography.HMACSHA1
$hmac.Key = [Text.Encoding]::UTF8.GetBytes($secretKey)
$signature = [Convert]::ToBase64String($hmac.ComputeHash([Text.Encoding]::UTF8.GetBytes($stringToSign)))
$auth = "AWS $accessKey`:$signature"

$headers = @{
  "Date" = $date
  "Content-Type" = $contentType
  "Authorization" = $auth
}

$body = [Text.Encoding]::UTF8.GetBytes($corsXml)
$url = "$endpoint/$bucket/?cors"

try {
  $response = Invoke-WebRequest -Uri $url -Method PUT -Headers $headers -Body $body -ContentType $contentType -UseBasicParsing
  Write-Host "CORS configured successfully!" -ForegroundColor Green
  Write-Host ""
  Write-Host "Allowed origins: * (any domain)" -ForegroundColor Green
  Write-Host "Allowed methods: GET, HEAD" -ForegroundColor Green
} catch {
  Write-Host "Error: $_" -ForegroundColor Red
  Write-Host ""
  Write-Host "To set CORS manually:" -ForegroundColor Yellow
  Write-Host "1. Go to Cloudflare Dashboard > R2 > narayan-portfolio" -ForegroundColor Yellow
  Write-Host "2. Click 'CORS' tab" -ForegroundColor Yellow
  Write-Host "3. Add this rule:" -ForegroundColor Yellow
  Write-Host "   Origin: *" -ForegroundColor Yellow
  Write-Host "   Methods: GET, HEAD" -ForegroundColor Yellow
  Write-Host "   Headers: *" -ForegroundColor Yellow
  Write-Host "4. Click Save" -ForegroundColor Yellow
}
