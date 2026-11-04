// Cloudflare Pages Function: POST /api/coach
// Real AI career coaching using Cloudflare Workers AI (Llama models).
// Requires a Workers AI binding named "AI" on the Pages project
// (Settings -> Bindings -> Add -> Workers AI -> variable name: AI).
// The frontend falls back to built-in answers if this endpoint is unavailable.

const MODELS = [
  { id: '@cf/meta/llama-4-scout-17b-16e-instruct', label: 'Llama 4 Scout' },
  { id: '@cf/meta/llama-3.3-70b-instruct-fp8-fast', label: 'Llama 3.3 70B' },
  { id: '@cf/meta/llama-3.1-8b-instruct', label: 'Llama 3.1 8B' },
];

const SYSTEM_PROMPT = `You are the SmartCareer India AI Career Coach. You help Indian school students, college students and early-career professionals plan their careers.

Guidelines:
- Give practical, specific advice for India: relevant entrance exams (JEE, NEET, CUET, CLAT, CAT, GATE, UPSC etc.), courses, colleges, skills, certifications, internships and realistic salary ranges in rupees (INR, use lakhs per annum).
- Mention government programmes where useful (National Scholarship Portal, PM Internship Scheme, Skill India/PMKVY, SWAYAM, Apprenticeship India) and suggest checking the official portal for current eligibility.
- Where it helps, point to SmartCareer India tools: Career Quiz, Explore Careers, Career Trends, Scholarships & Schemes, Mock Interview, Smart Resume Builder.
- Be warm, encouraging and concise: at most about 180 words. Use short paragraphs or simple "- " bullet points. Do not use markdown headings, bold or tables.
- If you are not sure about a fact (fees, cut-offs, dates), say so and suggest where to verify it.
- Politely steer off-topic requests back to careers, education and skills. Never ask for passwords, phone numbers or other personal data.`;

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

const extractText = (result) => {
  if (!result) return '';
  if (typeof result === 'string') return result;
  if (typeof result.response === 'string') return result.response;
  if (result.result && typeof result.result.response === 'string') return result.result.response;
  const choice = result.choices && result.choices[0];
  if (choice && choice.message && typeof choice.message.content === 'string') return choice.message.content;
  return '';
};

const cleanHistory = (history) =>
  (Array.isArray(history) ? history : [])
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .slice(-8)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1500) }));

export async function onRequestGet({ env }) {
  return json({ available: Boolean(env && env.AI), model: MODELS[0].id, label: MODELS[0].label });
}

export async function onRequestPost({ request, env }) {
  if (!env || !env.AI) {
    return json({ error: 'AI is not configured for this deployment.' }, 503);
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: 'Invalid JSON body.' }, 400);
  }

  const message = String((body && body.message) || '').trim().slice(0, 2000);
  if (!message) return json({ error: 'Message is required.' }, 400);

  const profile = body && body.profile && typeof body.profile === 'object' ? body.profile : {};
  const profileNote = profile.name ? `\nThe student's name is ${String(profile.name).slice(0, 60)}.` : '';

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT + profileNote },
    ...cleanHistory(body.history),
    { role: 'user', content: message },
  ];

  for (const model of MODELS) {
    try {
      const result = await env.AI.run(model.id, { messages, max_tokens: 500, temperature: 0.6 });
      const reply = extractText(result).trim();
      if (reply) return json({ reply, model: model.id, label: model.label });
    } catch (e) {
      // Try the next model in the list
    }
  }

  return json({ error: 'The AI model did not return an answer.' }, 502);
}
