'use client';
import React, { useState } from 'react';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

type TrendPoint = { period: string; ratio: number };

export default function Home() {
  const [keyword, setKeyword] = useState('블로그');
  const [start, setStart] = useState('2025-06-01');
  const [end, setEnd] = useState('2025-08-30');
  const [timeUnit, setTimeUnit] = useState<'date' | 'week' | 'month'>('date');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TrendPoint[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchTrend = async () => {
    setLoading(true); setError(null); setData(null);
    try {
      const res = await fetch(`${BACKEND}/api/kr/datalab/trend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword, start, end, time_unit: timeUnit }),
      });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      const series = json?.result?.results?.[0]?.data || [];
      setData(series);
    } catch (e:any) {
      setError(e.message || '요청 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 800, margin: '40px auto', padding: 16 }}>
      <h1>Keyword Tracker – DataLab Trend (MVP)</h1>
      <section style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr 1fr 1fr', alignItems: 'end' }}>
        <div>
          <label>키워드</label>
          <input value={keyword} onChange={e=>setKeyword(e.target.value)} style={{ width:'100%' }} />
        </div>
        <div>
          <label>시작일 (YYYY-MM-DD)</label>
          <input value={start} onChange={e=>setStart(e.target.value)} style={{ width:'100%' }} />
        </div>
        <div>
          <label>종료일</label>
          <input value={end} onChange={e=>setEnd(e.target.value)} style={{ width:'100%' }} />
        </div>
        <div>
          <label>단위</label>
          <select value={timeUnit} onChange={e=>setTimeUnit(e.target.value as any)} style={{ width:'100%' }}>
            <option value="date">일</option>
            <option value="week">주</option>
            <option value="month">월</option>
          </select>
        </div>
      </section>
      <button onClick={fetchTrend} style={{ marginTop: 12, padding: '10px 16px' }}>조회</button>

      {loading && <p>불러오는 중…</p>}
      {error && <p style={{ color:'red' }}>{error}</p>}

      {data && (
        <table style={{ marginTop: 16, width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ddd', textAlign: 'left', padding: 8 }}>기간</th>
              <th style={{ borderBottom: '1px solid #ddd', textAlign: 'right', padding: 8 }}>지수</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p: TrendPoint, idx: number) => (
              <tr key={idx}>
                <td style={{ borderBottom: '1px solid #f0f0f0', padding: 8 }}>{p.period}</td>
                <td style={{ borderBottom: '1px solid #f0f0f0', padding: 8, textAlign: 'right' }}>{p.ratio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
