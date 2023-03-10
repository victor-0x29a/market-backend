git add .
sleep 1
git commit -m "$*"
git push market-backend
echo 'Upload realizado do commit ' + "$*"
