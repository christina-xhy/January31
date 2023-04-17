# !/usr/bin/env bash
rm -rf dist
npm run build -- --base /walletRecording-preview
cd dist
git init
git add .
git commit -m 'deploy'
git remote add origin git@github.com:christina-xhy/walletRecording-preview.git
git branch -M main
git push -f origin main:main
echo '===================部署成功====================='
cd ..