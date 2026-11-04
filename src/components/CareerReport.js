import React, { forwardRef } from 'react';

// Printable career report. Uses plain inline styles so it renders the same
// in the print window regardless of the app theme.
const ink = '#17160F';
const muted = '#6B675C';
const line = '#E5E0D4';
const accent = '#D9480F';
const cream = '#F7F5EF';

const cell = { padding: '8px 10px', borderBottom: `1px solid ${line}`, textAlign: 'left', fontSize: 12, verticalAlign: 'top' };

const CareerReport = forwardRef(({ matches = [], name = '' }, ref) => {
  const top = matches.slice(0, 5);
  const best = top[0];
  const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  const skills = Array.from(new Set(top.slice(0, 3).flatMap((c) => c.skills || []))).slice(0, 10);
  const education = best
    ? Array.isArray(best.education)
      ? best.education.join('; ')
      : best.education
    : '';

  const nextSteps = best
    ? [
        `Read the full profile for ${best.title} on SmartCareer India and note the entry requirements.`,
        `Start building these skills: ${skills.slice(0, 5).join(', ')}.`,
        'Check the Scholarships & Schemes page for financial support and free skilling programmes you qualify for.',
        'Practise with the Mock Interview and Smart Resume tools before applying for internships.',
        'Discuss this report with a parent, teacher or career counsellor.',
      ]
    : [];

  return (
    <div
      ref={ref}
      style={{
        fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        color: ink,
        background: '#fff',
        padding: '36px 40px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: `2px solid ${ink}`, paddingBottom: 14 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.02em' }}>
            SmartCareer <span style={{ color: muted, fontWeight: 500 }}>India</span>
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.03em', marginTop: 6 }}>Career Report</div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 11, color: muted, lineHeight: 1.6 }}>
          <div>Prepared for: <strong style={{ color: ink }}>{name || 'Student'}</strong></div>
          <div>{date}</div>
        </div>
      </div>

      {best && (
        <>
          {/* Top match */}
          <div style={{ marginTop: 22, padding: '18px 20px', background: cream, border: `1px solid ${line}`, borderRadius: 10 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: muted }}>Top career match</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 6 }}>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>{best.title}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: accent }}>{best.matchPercentage}%</div>
            </div>
            <div style={{ fontSize: 12.5, color: muted, marginTop: 6, lineHeight: 1.55 }}>{best.description}</div>
            <div style={{ display: 'flex', gap: 28, marginTop: 12, fontSize: 11.5 }}>
              {best.salary && (
                <div>
                  <div style={{ color: muted }}>Salary range</div>
                  <div style={{ fontWeight: 600 }}>{best.salary}</div>
                </div>
              )}
              {best.growth && (
                <div>
                  <div style={{ color: muted }}>Growth outlook</div>
                  <div style={{ fontWeight: 600 }}>{best.growth}</div>
                </div>
              )}
              {best.category && (
                <div>
                  <div style={{ color: muted }}>Field</div>
                  <div style={{ fontWeight: 600 }}>{best.category}</div>
                </div>
              )}
            </div>
            {education && (
              <div style={{ fontSize: 11.5, marginTop: 10 }}>
                <span style={{ color: muted }}>Education: </span>
                {education}
              </div>
            )}
          </div>

          {/* Matches table */}
          <div style={{ marginTop: 24, fontSize: 14, fontWeight: 700 }}>Your top {top.length} matches</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
            <thead>
              <tr>
                {['#', 'Career', 'Field', 'Match', 'Salary range', 'Growth'].map((h) => (
                  <th key={h} style={{ ...cell, fontSize: 10.5, color: muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `1px solid ${ink}` }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {top.map((c, i) => (
                <tr key={c.id || c.title}>
                  <td style={{ ...cell, color: muted }}>{i + 1}</td>
                  <td style={{ ...cell, fontWeight: 600 }}>{c.title}</td>
                  <td style={cell}>{c.category || '-'}</td>
                  <td style={{ ...cell, fontWeight: 700, color: i === 0 ? accent : ink }}>{c.matchPercentage}%</td>
                  <td style={cell}>{c.salary || '-'}</td>
                  <td style={cell}>{c.growth || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Skills + next steps */}
          <div style={{ display: 'flex', gap: 28, marginTop: 24 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Skills to build</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {skills.map((s) => (
                  <span key={s} style={{ fontSize: 11, padding: '4px 8px', border: `1px solid ${line}`, borderRadius: 6, background: cream }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ flex: 1.3 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Recommended next steps</div>
              <ol style={{ margin: 0, paddingLeft: 18, fontSize: 12, lineHeight: 1.6 }}>
                {nextSteps.map((s) => (
                  <li key={s} style={{ marginBottom: 4 }}>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <div style={{ marginTop: 32, paddingTop: 12, borderTop: `1px solid ${line}`, display: 'flex', justifyContent: 'space-between', fontSize: 10, color: muted }}>
        <span>Generated by SmartCareer India · smartcareer-india.pages.dev</span>
        <span>Matches are based on your quiz answers and are guidance, not a guarantee.</span>
      </div>
    </div>
  );
});

CareerReport.displayName = 'CareerReport';

export default CareerReport;
