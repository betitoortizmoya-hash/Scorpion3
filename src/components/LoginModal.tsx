import React, { useState } from 'react';
import { ScorpionLogo } from './ScorpionLogo';
import { Lock, User, KeyRound, AlertCircle, CheckCircle2, ShieldCheck, X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: string) => void;
  lang?: 'en' | 'es';
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  lang = 'es',
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanUser = username.trim();
    // Check credentials: Ricardo & 12345678 (case insensitive for username)
    if (
      (cleanUser.toLowerCase() === 'ricardo' || cleanUser.toLowerCase() === 'ricardo menchaca') &&
      password === '12345678'
    ) {
      setIsSuccess(true);
      setTimeout(() => {
        onLoginSuccess('Ricardo Menchaca');
        onClose();
        setIsSuccess(false);
      }, 700);
    } else {
      setError(
        lang === 'es'
          ? 'Credenciales incorrectas. Usuario: Ricardo / Contraseña: 12345678'
          : 'Invalid credentials. User: Ricardo / Password: 12345678'
      );
    }
  };

  const handleQuickLogin = () => {
    setUsername('Ricardo');
    setPassword('12345678');
    setIsSuccess(true);
    setTimeout(() => {
      onLoginSuccess('Ricardo Menchaca');
      onClose();
      setIsSuccess(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#16181D] border border-[#2B2F38] rounded-xl p-6 sm:p-8 shadow-2xl shadow-red-950/30">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#9E9E98] hover:text-[#F5F4F0] p-1 rounded hover:bg-[#1F2229] transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center mb-6">
          <ScorpionLogo size="lg" showText={false} className="mb-2" />
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#1F2229] border border-[#2B2F38] text-[11px] font-mono text-[#D4AF37] uppercase font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>Terminal de Operaciones // San Antonio</span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-2xl font-bold uppercase text-[#F5F4F0] tracking-tight">
            {lang === 'es' ? 'Acceso Administrador' : 'Contractor Portal Login'}
          </h2>
          <p className="text-xs text-[#9E9E98] mt-1">
            {lang === 'es'
              ? 'Área exclusiva para el contratista general Ricardo Menchaca'
              : 'Authorized general contractor & dispatch access'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-950/40 border border-red-500/50 text-red-200 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {isSuccess && (
          <div className="mb-4 p-3 rounded bg-emerald-950/40 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2.5 animate-pulse">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {lang === 'es'
                ? '¡Bienvenido, Ricardo! Iniciando terminal de despacho...'
                : 'Welcome, Ricardo! Initializing dispatch terminal...'}
            </span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-[#9E9E98] mb-1.5">
              {lang === 'es' ? 'Usuario Administrador' : 'Admin Username'}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#9E9E98] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ricardo"
                required
                className="w-full bg-[#121316] border border-[#2B2F38] rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#F5F4F0] placeholder-[#9E9E98]/50 focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#9E9E98] mb-1.5">
              {lang === 'es' ? 'Contraseña' : 'Password'}
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-[#9E9E98] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#121316] border border-[#2B2F38] rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#F5F4F0] placeholder-[#9E9E98]/50 focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] font-mono"
              />
            </div>
          </div>

          <div className="p-2.5 rounded bg-[#1F2229] border border-[#2B2F38] text-[11px] font-mono text-[#9E9E98] flex items-center justify-between">
            <span>
              {lang === 'es' ? 'Clave asignada:' : 'Assigned credentials:'}{' '}
              <strong className="text-[#F5F4F0]">Ricardo / 12345678</strong>
            </span>
            <button
              type="button"
              onClick={handleQuickLogin}
              className="text-[#cc0000] hover:text-[#E60000] underline uppercase font-bold text-[10px]"
            >
              {lang === 'es' ? 'Autocompletar' : 'Autofill'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#cc0000] hover:bg-[#E60000] text-[#F5F4F0] font-['Space_Grotesk'] uppercase font-bold text-xs tracking-wider py-3 rounded-lg transition-all shadow-lg shadow-red-950/40 flex items-center justify-center gap-2 mt-2"
          >
            <Lock className="w-4 h-4" />
            <span>{lang === 'es' ? 'Ingresar al Portal' : 'Access Terminal'}</span>
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-[#2B2F38] text-center">
          <button
            type="button"
            onClick={handleQuickLogin}
            className="w-full py-2 px-3 rounded bg-[#1F2229] hover:bg-[#292a2d] text-xs font-mono text-[#F5F4F0] border border-[#2B2F38] transition-colors flex items-center justify-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
            <span>
              {lang === 'es'
                ? 'Entrar con 1 Clic como Ricardo (Admin)'
                : '1-Click Quick Login as Ricardo (Admin)'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
