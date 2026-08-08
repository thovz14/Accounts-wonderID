#!/bin/bash
cd "/home/thomas/Developement/Apps/Wonderdev account"

python3 -c "
import sys
content = open('index.html').read()
content = content.replace('<div style=\"display: none; font-size: 13px; color: var(--text-muted);\">Don\'t have an account?', '<div style=\"font-size: 13px; color: var(--text-muted);\">Don\'t have an account?')
open('index.html', 'w').write(content)
"

git add index.html
git commit -m "Enable account creation"
git push

echo "✅ Account creation is now ENABLED and synced to GitHub."
