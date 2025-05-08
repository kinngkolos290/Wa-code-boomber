# WA Code Bomber

**Un projet éthique de test d'automatisation WhatsApp**

> Créé par **Supreme Destructor**

![Logo](https://files.catbox.moe/mqoztv.jpg)

---

## Description

Ce projet est un outil d'automatisation à but éducatif qui utilise Puppeteer pour envoyer des codes aléatoires à un numéro spécifique via WhatsApp Web. Il peut également simuler un signalement du contact ciblé. Le tout tourne en boucle.

> **Attention :** Ce script est à but démonstratif et doit respecter les conditions d'utilisation de WhatsApp. L'utilisation abusive de cet outil peut être considérée comme malveillante.

---

## Fonctionnalités

- Envoi régulier de codes de jumelage générés aléatoirement
- Possibilité de signaler le contact automatiquement
- Gestion de session persistante avec cookies (pas besoin de rescanner le QR code)

---

## Prérequis

- Node.js
- OS supportant Puppeteer avec Chromium (Linux, macOS, Windows via WSL, VPS)

---

## Installation

```bash
# Clone du repo
git clone https://github.com/kinngkolos290/Wa-code-boomber.git
cd Wa-code-boomber

# Installation des dépendances
npm install

# Lancement du script
node spam-and-report-session.js
