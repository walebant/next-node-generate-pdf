import fs from 'fs';
import puppeteer from 'puppeteer';
import handlers from 'handlebars';

export default async (req, res) => {
  const { name } = JSON.parse(req.body);
  const customerName = name || 'John Doe';

  try {
    const file = fs.readFileSync('./invoice-template.html', 'utf8');

    const template = handlers.compile(`${file}`);
    const html = template({ customerName });

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({ format: 'A4' });
    await browser.close();

    res.statusCode = 200;
    res.send(pdf);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
