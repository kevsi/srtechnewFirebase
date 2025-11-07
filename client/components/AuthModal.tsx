import React, { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthContext";

type Props = {
  open: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
};

export default function AuthModal({ open, onClose, initialMode }: Props) {
  const { login, signup, saveOnboarding, onboarding } = useAuth();
  const [mode, setMode] = useState<'signin'|'signup'|'onboarding'>(initialMode ?? 'signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<any>({ company: '', role: '', projectType: '', timeline: '', budget: '' });

  useEffect(() => {
    if (open) {
      setMode(initialMode ?? 'signin');
      setStep(0);
    }
  }, [open, initialMode]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === 'signin') {
        await login(email, password);
      } else if (mode === 'signup') {
        await signup(email, password);
      }
      // Si l'onboarding est déjà présent, fermer et rediriger vers l'accueil
      try {
        const raw = localStorage.getItem('_auth_onboarding');
        if (onboarding || raw) {
          onClose();
          try { window.location.href = '/'; } catch {}
          return;
        }
      } catch {}
      // Sinon, poursuivre vers onboarding
      setMode('onboarding');
      setStep(0);
    } catch (err) {
      alert('Authentication failed');
    }
  };

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const submitOnboarding = () => {
    saveOnboarding(form);
    try { localStorage.setItem('_auth_onboarding', JSON.stringify(form)); } catch {}
    onClose();
    try { window.location.href = '/'; } catch {}
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-medium">{mode === 'onboarding' ? 'Onboarding' : mode === 'signin' ? 'Sign in' : 'Create account'}</h3>
          <button onClick={onClose} aria-label="Close" className="text-black/60">✕</button>
        </div>

        <div className="p-6">
          {mode !== 'onboarding' ? (
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded px-3 py-2" />
              </div>
              <div className="flex items-center gap-3">
                <button type="submit" className="bg-lime text-black px-4 py-2 rounded">{mode === 'signin' ? 'Sign in' : 'Create account'}</button>
                <button type="button" onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')} className="text-sm text-black/70 underline">{mode === 'signin' ? 'Create account' : 'Have an account? Sign in'}</button>
              </div>
            </form>
          ) : (
            <div>
              <div className="mb-4">Step {step + 1} of 4</div>

              {step === 0 && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium">Company name</label>
                  <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full border rounded px-3 py-2" />
                  <label className="block text-sm font-medium mt-2">Your role</label>
                  <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full border rounded px-3 py-2" />
                </div>
              )}

              {step === 1 && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium">Project type</label>
                  <select value={form.projectType} onChange={(e) => setForm({ ...form, projectType: e.target.value })} className="w-full border rounded px-3 py-2">
                    <option value="">Select a project type</option>
                    <option>Website</option>
                    <option>Mobile App</option>
                    <option>Branding</option>
                    <option>AR/3D</option>
                  </select>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium">Timeline</label>
                  <input value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} placeholder="e.g. 3 months" className="w-full border rounded px-3 py-2" />
                  <label className="block text-sm font-medium mt-2">Budget</label>
                  <input value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="e.g. $10k - $50k" className="w-full border rounded px-3 py-2" />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3">
                  <h4 className="font-medium">Review</h4>
                  <div className="text-sm text-black/70">
                    <p><strong>Company:</strong> {form.company}</p>
                    <p><strong>Role:</strong> {form.role}</p>
                    <p><strong>Project:</strong> {form.projectType}</p>
                    <p><strong>Timeline:</strong> {form.timeline}</p>
                    <p><strong>Budget:</strong> {form.budget}</p>
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <div>
                  {step > 0 && <button onClick={prev} className="px-4 py-2 rounded border">Back</button>}
                </div>
                <div className="flex items-center gap-3">
                  {step < 3 ? (
                    <button onClick={next} className="bg-lime text-black px-4 py-2 rounded">Next</button>
                  ) : (
                    <button onClick={submitOnboarding} className="bg-lime text-black px-4 py-2 rounded">Finish</button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
