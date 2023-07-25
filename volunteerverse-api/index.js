const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless:"new", defaultViewport:false,});
  const page = await browser.newPage();
  await page.goto('https://www.democracylab.org/projects');
  await page.screenshot({path: 'example.png'});
  await browser.close();
})();