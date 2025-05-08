
# Installer les dépendances de base
pkg update -y
pkg upgrade -y
pkg install nodejs git -y

# Cloner le projet
git clone https://github.com/TON-UTILISATEUR/wa-code-bomber.git || mkdir wa-code-bomber
cd wa-code-bomber

# Installer Puppeteer sans Chromium (non supporté sur Termux)
npm install puppeteer --ignore-scripts

# Lancer le script
node spam-and-report-session.js
