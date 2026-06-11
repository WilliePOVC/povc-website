// Press On Ventures — Notion integration for Press page
// Fetches the "Connect" table (DB: 36ce9175-4432-81b1-88fd-e9d46f533b94)
// Filter: Publish = "Yes", sorted by Date Published desc

import { PressItem, FALLBACK_PRESS_ITEMS } from './data';

const DB_ID = '36ce9175-4432-81b1-88fd-e9d46f533b94';
const NOTION_VERSION = '2022-06-28';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(dateStr: string): string {
  if (!dateStr) return 'Ongoing';
  const d = new Date(dateStr + 'T00:00:00');
  const month = MONTHS[d.getMonth()];
  const year = d.getFullYear();
  return `${month} ${year}`;
}

interface NotionPage {
  properties: {
    Headline?: { title?: Array<{ plain_text: string }> };
    URL?: { url?: string };
    'Publication Display Name'?: { rich_text?: Array<{ plain_text: string }> };
    'Company Display Name'?: { rich_text?: Array<{ plain_text: string }> };
    'Date Published'?: { date?: { start: string } };
  };
}

interface NotionQueryResponse {
  results: NotionPage[];
  has_more: boolean;
  next_cursor: string | null;
}

export async function fetchPressItems(): Promise<PressItem[]> {
  const apiKey = process.env.NOTION_API_KEY;

  if (!apiKey) {
    console.warn('[notion] NOTION_API_KEY not set — using fallback press data');
    return FALLBACK_PRESS_ITEMS;
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    'Notion-Version': NOTION_VERSION,
    'Content-Type': 'application/json',
  };

  const entries: PressItem[] = [];
  let cursor: string | undefined;

  try {
    do {
      const body: Record<string, unknown> = {
        filter: { property: 'Publish', select: { equals: 'Yes' } },
        sorts: [{ property: 'Date Published', direction: 'descending' }],
      };
      if (cursor) body.start_cursor = cursor;

      const resp = await fetch(`https://api.notion.com/v1/databases/${DB_ID}/query`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        next: { revalidate: 3600 }, // ISR: revalidate hourly
      });

      if (!resp.ok) {
        console.error(`[notion] HTTP ${resp.status} — using fallback`);
        return FALLBACK_PRESS_ITEMS;
      }

      const data: NotionQueryResponse = await resp.json();

      for (const page of data.results) {
        const p = page.properties;
        const headline = p.Headline?.title?.[0]?.plain_text ?? '';
        const url = p.URL?.url ?? '';
        const pub = p['Publication Display Name']?.rich_text?.[0]?.plain_text ?? '';
        const company = p['Company Display Name']?.rich_text?.[0]?.plain_text ?? '';
        const dateStr = p['Date Published']?.date?.start ?? '';

        if (headline && url) {
          entries.push({
            pub,
            date: formatDate(dateStr),
            dateISO: dateStr,
            title: headline,
            company,
            url,
          });
        }
      }

      cursor = data.has_more ? (data.next_cursor ?? undefined) : undefined;
    } while (cursor);

    if (entries.length === 0) {
      console.warn('[notion] No entries returned — using fallback');
      return FALLBACK_PRESS_ITEMS;
    }

    return entries;
  } catch (err) {
    console.error('[notion] Fetch failed — using fallback:', err);
    return FALLBACK_PRESS_ITEMS;
  }
}
