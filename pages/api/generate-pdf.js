import fs from 'fs';
import puppeteer from 'puppeteer';
import handlers from 'handlers';

export default async (_req, res) => {
  try {
    const file = fs.readFileSync('./invoice.html', 'utf8');

    const template = handlers.compile(`${file}`);
    const html = template(req.body.name);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({ format: 'A4' });
    await browser.close();

    res.statusCode = 200;
    res.send(pdf);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
