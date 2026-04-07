import { useMemo, useState } from 'react';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<AuthLayout mode="login" />} />
      <Route path="/signup" element={<AuthLayout mode="signup" />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function AuthLayout({ mode }) {
  const backendUrl = useMemo(() => {
    return import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
  }, []);

  return (
    <main className="auth">
      <section className="auth-shell">
        <header className="auth-brand reveal">
          <p className="eyebrow">CI/CD | EC2 READY</p>
          <h1>Welcome back.</h1>
          <p className="lead">
            Securely access your dashboard and keep deployments flowing.
          </p>
          <div className="status-pill">
            <span className="status-dot" aria-hidden="true" />
            Backend: {backendUrl}
          </div>
        </header>

        <div className="auth-card reveal delay-1" aria-live="polite">
          <div className="tabs" role="tablist" aria-label="Authentication">
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? 'tab active' : 'tab')}
              role="tab"
              aria-selected={mode === 'login'}
            >
              Log in
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) => (isActive ? 'tab active' : 'tab')}
              role="tab"
              aria-selected={mode === 'signup'}
            >
              Sign up
            </NavLink>
          </div>

          {mode === 'login' ? (
            <LoginForm backendUrl={backendUrl} />
          ) : (
            <SignupForm backendUrl={backendUrl} />
          )}
        </div>
      </section>
    </main>
  );
}

function LoginForm({ backendUrl }) {
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: 'idle', message: '' });

    if (!form.email || !form.password) {
      setStatus({ type: 'error', message: 'Email and password are required.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${backendUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || 'Login failed.');
      }

      if (payload.token) {
        localStorage.setItem('authToken', payload.token);
      }
      if (payload.user) {
        localStorage.setItem('authUser', JSON.stringify(payload.user));
      }

      setStatus({
        type: 'success',
        message: `Welcome back${payload.user?.name ? `, ${payload.user.name}` : ''}.`,
      });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Login failed.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="auth-form" aria-label="Login form" onSubmit={onSubmit}>
      <h2>Log in to your account</h2>
      <p className="muted">
        Use your credentials to continue monitoring deployments.
      </p>
      <label className="field">
        Email
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="name@company.com"
          required
        />
      </label>
      <label className="field">
        Password
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          placeholder="Enter your password"
          minLength={6}
          required
        />
      </label>
      <div className="form-row">
        <label className="checkbox">
          <input
            type="checkbox"
            name="remember"
            checked={form.remember}
            onChange={onChange}
          />
          Remember me
        </label>
        <button type="button" className="link">
          Forgot password?
        </button>
      </div>
      {status.message ? (
        <p className={status.type === 'error' ? 'notice error' : 'notice success'}>
          {status.message}
        </p>
      ) : null}
      <button type="submit" className="primary" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in…' : 'Log in'}
      </button>
      <button type="button" className="secondary">
        Continue with GitHub
      </button>
    </form>
  );
}

function SignupForm({ backendUrl }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    teamSize: '',
    acceptTerms: false,
  });
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: 'idle', message: '' });

    if (!form.name || !form.email || !form.password || !form.teamSize) {
      setStatus({ type: 'error', message: 'Please complete every field.' });
      return;
    }
    if (!form.acceptTerms) {
      setStatus({ type: 'error', message: 'Accept the terms to continue.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${backendUrl}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          teamSize: form.teamSize,
          acceptTerms: form.acceptTerms,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || 'Signup failed.');
      }

      if (payload.token) {
        localStorage.setItem('authToken', payload.token);
      }
      if (payload.user) {
        localStorage.setItem('authUser', JSON.stringify(payload.user));
      }

      setStatus({
        type: 'success',
        message: 'Account created. You are signed in.',
      });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Signup failed.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="auth-form" aria-label="Signup form" onSubmit={onSubmit}>
      <h2>Create your account</h2>
      <p className="muted">
        Join the team and get instant access to deployment insights.
      </p>
      <label className="field">
        Full name
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Alex Morgan"
          required
        />
      </label>
      <label className="field">
        Work email
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="name@company.com"
          required
        />
      </label>
      <label className="field">
        Password
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          placeholder="Create a password"
          minLength={6}
          required
        />
      </label>
      <label className="field">
        Team size
        <select name="teamSize" value={form.teamSize} onChange={onChange} required>
          <option value="" disabled>
            Select one
          </option>
          <option value="1-5">1-5</option>
          <option value="6-20">6-20</option>
          <option value="21-100">21-100</option>
          <option value="100+">100+</option>
        </select>
      </label>
      <label className="checkbox">
        <input
          type="checkbox"
          name="acceptTerms"
          checked={form.acceptTerms}
          onChange={onChange}
          required
        />
        I agree to the terms and privacy policy
      </label>
      {status.message ? (
        <p className={status.type === 'error' ? 'notice error' : 'notice success'}>
          {status.message}
        </p>
      ) : null}
      <button type="submit" className="primary" disabled={isSubmitting}>
        {isSubmitting ? 'Creating account…' : 'Create account'}
      </button>
      <p className="fineprint">Already have an account? Use the Log in tab.</p>
    </form>
  );
}
