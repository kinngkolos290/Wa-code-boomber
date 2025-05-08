
const puppeteer = require('puppeteer');
const fs = require('fs');

const TARGET_NUMBER = '33712345678'; // Numéro cible
const LOOP_INTERVAL_MS = 60000;
const FIXED_MESSAGE = "Code de jumelage : ";
const SESSION_FILE = 'session.json';

function generateCode() {
  const part1 = Math.floor(100 + Math.random() * 900);
  const part2 = Math.floor(100 + Math.random() * 900);
  return `${part1}-${part2}`;
}

async function saveSession(page) {
  const cookies = await page.cookies();
  fs.writeFileSync(SESSION_FILE, JSON.stringify(cookies, null, 2));
  console.log("Session sauvegardée.");
}

async function loadSession(page) {
  if (fs.existsSync(SESSION_FILE)) {
    const cookies = JSON.parse(fs.readFileSync(SESSION_FILE));
    await page.setCookie(...cookies);
    console.log("Session chargée.");
  }
}

async function sendMessage(page, message) {
  const link = `https://web.whatsapp.com/send?phone=${TARGET_NUMBER}&text=${encodeURIComponent(message)}`;
  await page.goto(link);
  await page.waitForSelector('div[title]', { timeout: 15000 });
  await page.keyboard.press('Enter');
  console.log(`[${new Date().toLocaleTimeString()}] Message envoyé : ${message}`);
  await page.waitForTimeout(2000);
}

async function reportContact(page) {
  try {
    await page.click('header span[data-icon="menu"]');
    await page.waitForSelector('div[role="button"]', { visible: true });

    const buttons = await page.$$('div[role="button"]');
    for (let btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text && text.toLowerCase().includes('signaler')) {
        await btn.click();
        console.log(`[${new Date().toLocaleTimeString()}] Contact signalé.`);
        break;
      }
    }
    await page.waitForTimeout(2000);
  } catch (err) {
    console.error("Erreur pendant le signalement :", err.message);
  }
}

(async () => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();

  await loadSession(page);
  await page.goto('https://web.whatsapp.com');
  console.log("Si la session est expirée, scanne le QR code manuellement.");
  await page.waitForTimeout(20000);
  await saveSession(page);

  while (true) {
    const code = generateCode();
    const message = `${FIXED_MESSAGE}${code}`;

    await sendMessage(page, message);
    await reportContact(page);

    console.log(`Attente ${LOOP_INTERVAL_MS / 1000} secondes...`);
    await page.waitForTimeout(LOOP_INTERVAL_MS);
  }
})();
