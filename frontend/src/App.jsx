import { useMemo } from 'react';

export default function App() {
  const backendUrl = useMemo(() => {
    return import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  }, []);

  return (
    <main className="app">
      <h1>React Frontend</h1>
      <p>Backend URL: {backendUrl}</p>
      <p className="hint">Set VITE_BACKEND_URL to point at your API.</p>
    </main>
  );
}
