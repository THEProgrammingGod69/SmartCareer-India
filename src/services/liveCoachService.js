// Client for the real AI coach (Cloudflare Pages Function at /api/coach).
// Every call fails soft so the AI Coach page can fall back to built-in answers.

const ENDPOINT = '/api/coach';

const fetchWithTimeout = async (url, options = {}, ms = 20000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
};

const readJson = async (res) => {
  const type = res.headers.get('content-type') || '';
  if (!type.includes('application/json')) throw new Error('Not a JSON response');
  return res.json();
};

const tidy = (text) =>
  text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

export const checkLiveCoach = async () => {
  try {
    const res = await fetchWithTimeout(ENDPOINT, { method: 'GET' }, 6000);
    if (!res.ok) return { available: false };
    const data = await readJson(res);
    return { available: Boolean(data.available), label: data.label || 'Llama' };
  } catch (e) {
    return { available: false };
  }
};

export const askLiveCoach = async (message, history = [], profile = {}) => {
  const res = await fetchWithTimeout(
    ENDPOINT,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history, profile }),
    },
    30000
  );
  if (!res.ok) throw new Error(`Coach request failed (${res.status})`);
  const data = await readJson(res);
  if (!data.reply) throw new Error('Empty reply');
  return { text: tidy(data.reply), label: data.label || 'Llama' };
};
