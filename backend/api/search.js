const cheerio = require('cheerio');

async function getEmbassies(country) {
  const params = new URLSearchParams({
    action: 'parse',
    page: `List of diplomatic missions in ${country}`,
    prop: 'text',
    format: 'json',
    origin: '*',
  });
  const res = await fetch(`https://en.wikipedia.org/w/api.php?${params}`);
  const data = await res.json();
  if (!data.parse) return [];
  const $ = cheerio.load(data.parse.text['*']);
  const list = [];
  $('table.wikitable tr').each((_, row) => {
    const cells = $(row).find('td');
    if (!cells.length) return;
    const name = $(cells[0]).text().trim();
    const href = $(cells[0]).find('a').attr('href');
    if (name && href) list.push({ name, wikiLink: `https://en.wikipedia.org${href}` });
  });
  return list.slice(0, 30);
}

async function getWebsite(wikiLink) {
  try {
    const r = await fetch(wikiLink, {
      headers: { 'User-Agent': 'JobByEmad/1.0' },
      signal: AbortSignal.timeout(5000),
    });
    const $ = cheerio.load(await r.text());
    let site = null;
    $('a.external').each((_, el) => {
      const h = $(el).attr('href');
      if (h && h.startsWith('http') && !site) site = h;
    });
    return site;
  } catch {
    return null;
  }
}

async function getFBPage(siteUrl) {
  try {
    const r = await fetch(siteUrl, {
      headers: { 'User-Agent': 'JobByEmad/1.0' },
      signal: AbortSignal.timeout(5000),
    });
    const $ = cheerio.load(await r.text());
    let fb = null;
    $('a[href*="facebook.com"]').each((_, el) => {
      const h = $(el).attr('href') || '';
      const m = h.match(/facebook\.com\/([^/?#\s]+)/);
      if (m && m[1] && !['sharer', 'share', 'dialog', 'plugins', 'login'].includes(m[1]) && !fb)
        fb = m[1];
    });
    return fb;
  } catch {
    return null;
  }
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { country, job } = req.query;
  if (!country || !job) {
    return res.status(400).json({ error: 'country and job required' });
  }

  try {
    const embassies = await getEmbassies(country);
    const results = [];

    await Promise.allSettled(
      embassies.map(async (emb) => {
        const website = await getWebsite(emb.wikiLink);
        const fbPage = website ? await getFBPage(website) : null;
        if (website || fbPage) {
          results.push({
            name: emb.name,
            country,
            website: website || null,
            facebookSearch: fbPage
              ? `https://www.facebook.com/${fbPage}/search/?q=${encodeURIComponent(job)}`
              : null,
          });
        }
      })
    );

    return res.status(200).json(results);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
