import { useMemo } from 'react';

export default function App() {
  const backendUrl = useMemo(() => {
    return import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
  }, []);

  return (
    <main className="app">
      <header className="hero reveal">
        <p className="eyebrow">CI/CD | EC2 READY</p>
        <h1>Ship fast. Observe faster.</h1>
        <p className="lead">
          A clean, lightweight React surface for your deployed API.
        </p>
        <div className="cta-row">
          <button className="cta">View Status</button>
          <span className="pill">Backend: {backendUrl}</span>
        </div>
      </header>

      <section className="grid">
        <article className="card reveal delay-1">
          <h2>Endpoint</h2>
          <p className="mono">{backendUrl}</p>
          <p className="hint">Update via VITE_BACKEND_URL in your env.</p>
        </article>
        <article className="card reveal delay-2">
          <h2>Deploy</h2>
          <p>Push to main, let the pipeline rebuild and restart containers.</p>
        </article>
        <article className="card reveal delay-3">
          <h2>Secure</h2>
          <p>SSH-only access and containerized services on EC2.</p>
        </article>
      </section>
    </main>
  );
}
