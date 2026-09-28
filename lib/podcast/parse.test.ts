// Run: npm run test:podcast   (Node >= 22.18 — native TypeScript stripping)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseIsoDuration, parseEpisodeNumber, cleanTitle, parseChapters, parseMeta,
  parseSummary, numberFromSlug, episodeSlug, parseRss,
} from './parse.ts';

test('parseIsoDuration', () => {
  assert.equal(parseIsoDuration('PT48M12S'), 2892);
  assert.equal(parseIsoDuration('PT1H2M'), 3720);
  assert.equal(parseIsoDuration('P0D'), null);
  assert.equal(parseIsoDuration(undefined), null);
});

test('parseEpisodeNumber', () => {
  assert.equal(parseEpisodeNumber('Ep. 3 | Title | First Press'), 3);
  assert.equal(parseEpisodeNumber('Episode #12: X'), 12);
  assert.equal(parseEpisodeNumber('Sunscreen as Everyday Skincare | First Press Ep. 02'), 2);
  assert.equal(parseEpisodeNumber('No number'), null);
});

test('cleanTitle', () => {
  assert.equal(cleanTitle('Ep. 3 | How Jacob Bar built it | First Press'), 'How Jacob Bar built it');
  assert.equal(cleanTitle('Sunscreen as Everyday Skincare | First Press Ep. 02'), 'Sunscreen as Everyday Skincare');
  assert.equal(cleanTitle('Agentic Shopping with Scout CEO Ethan Arpi | First Press Ep. 01'),
    'Agentic Shopping with Scout CEO Ethan Arpi');
});

test('parseChapters', () => {
  const c = parseChapters('0:00 Intro\n00:30 Two\n1:02:03 Three\n(12:30) Paren\n12:31 - Dash');
  assert.deepEqual(c.map((x) => x.t), [0, 30, 3723, 750, 751]);
  assert.equal(c[3].label, 'Paren');
  assert.equal(c[4].label, 'Dash');
  assert.deepEqual(parseChapters('00:00 Only one'), []);
});

test('parseMeta', () => {
  const m = parseMeta('Guest: Jane Doe — Co-founder & CEO, Acme\nTopic: founders\nPortfolio: jacob-bar');
  assert.deepEqual(m.guest, { name: 'Jane Doe', role: 'Co-founder & CEO, Acme' });
  assert.equal(m.topic, 'Founders');
  assert.equal(m.portfolioSlug, 'jacob-bar');
  assert.equal(parseMeta('Topic: Cooking').topic, null);
  assert.equal(parseMeta('Portfolio: Bad Slug!').portfolioSlug, null);
});

test('parseSummary', () => {
  const s = parseSummary('First para https://x.com/a here.\n\nSecond.\n\nThird.\nGuest: J');
  assert.deepEqual(s, ['First para here.', 'Second.']);
  assert.deepEqual(parseSummary('Only.\n02:14 Chapter'), ['Only.']);
});

test('slugs', () => {
  assert.equal(numberFromSlug('ep-07-anything'), 7);
  assert.equal(episodeSlug(3, 'How Jacob Bar built it!'), 'ep-03-how-jacob-bar-built-it');
});

test('parseRss', () => {
  const xml = '<feed><entry><yt:videoId>abc</yt:videoId><title>A &amp; B | First Press Ep. 01</title>' +
    '<published>2026-09-23T17:44:14+00:00</published><media:group><media:thumbnail url="https://i/x.jpg" width="1"/>' +
    '<media:description>Hi &quot;there&quot;</media:description></media:group></entry></feed>';
  const [e] = parseRss(xml);
  assert.equal(e.videoId, 'abc');
  assert.equal(e.title, 'A & B | First Press Ep. 01');
  assert.equal(e.description, 'Hi "there"');
});
