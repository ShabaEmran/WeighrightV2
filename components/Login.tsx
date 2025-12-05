
import React, { useState } from 'react';
import { ArrowLeft, Lock } from 'lucide-react';

interface LoginProps {
  onBack: () => void;
  onLoginSuccess: () => void;
  onAdminLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onBack, onLoginSuccess, onAdminLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Admin Mode State
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAdminMode) {
        if (adminPin === '8888') {
            onAdminLogin();
        } else {
            setError('Invalid Clinical PIN');
        }
    } else {
        // Simulate patient login
        setTimeout(() => {
            onLoginSuccess();
        }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-voy-cream flex flex-col md:flex-row">
      {/* Left: Image Side (Hidden on Mobile) */}
      <div className={`hidden md:block w-1/2 relative overflow-hidden transition-colors duration-500 ${isAdminMode ? 'bg-stone-900' : 'bg-voy-dark'}`}>
        <img 
          src={isAdminMode 
            ? "https://images.unsplash.com/photo-1579684385183-1b60fe97715c?q=80&w=2070&auto=format&fit=crop" // Clinical image
            : "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" // Lifestyle image
          }
          alt="Login Cover" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay transition-opacity duration-500"
        />
        <div className="absolute inset-0 flex flex-col justify-between p-12 text-white z-10">
          <div className="text-3xl font-serif">Weighright</div>
          <div>
            <p className="text-2xl font-serif mb-4 leading-relaxed">
              {isAdminMode 
                ? "Secure Clinical Portal. Authorized access only." 
                : "\"The support I received made all the difference. I finally feel in control.\""
              }
            </p>
            <p className="text-sm opacity-70 uppercase tracking-widest">
                {isAdminMode ? "System v2.4.0" : "Join 50,000+ members"}
            </p>
          </div>
        </div>
      </div>

      {/* Right: Form Side */}
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative bg-white/50 backdrop-blur-xl">
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 p-2 rounded-full hover:bg-stone-100 transition-colors"
        >
          <ArrowLeft size={24} className="text-voy-dark" />
        </button>

        <div className="max-w-md mx-auto w-full">
          <div className="flex items-center gap-3 mb-2">
            {isAdminMode && <Lock size={20} className="text-voy-peach" />}
            <h2 className="text-4xl font-serif text-voy-dark">
                {isAdminMode ? 'Clinician Login' : 'Welcome back'}
            </h2>
          </div>
          <p className="text-voy-text/60 mb-10">
            {isAdminMode ? 'Please enter your unique verification PIN.' : 'Sign in to access your dashboard and prescriptions.'}
          </p>

          {!isAdminMode && (
              <div className="space-y-4 mb-8">
                <button 
                  onClick={onLoginSuccess}
                  className="w-full py-3 px-4 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 transition-colors flex items-center justify-center gap-3 font-medium text-voy-dark"
                >
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                  Sign in with Google
                </button>
                <button 
                  onClick={onLoginSuccess}
                  className="w-full py-3 px-4 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 transition-colors flex items-center justify-center gap-3 font-medium text-voy-dark"
                >
                  <img src="https://www.svgrepo.com/show/512317/apple-173.svg" alt="Apple" className="w-5 h-5" />
                  Sign in with Apple
                </button>
              </div>
          )}

          {!isAdminMode && (
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-voy-cream text-voy-text/40">Or continue with email</span>
                </div>
              </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isAdminMode ? (
                <div>
                  <label className="block text-sm font-medium text-voy-dark mb-1.5">Clinical PIN</label>
                  <input 
                    type="password" 
                    value={adminPin}
                    onChange={(e) => { setAdminPin(e.target.value); setError(''); }}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-voy-dark focus:border-transparent outline-none bg-white/50 text-center text-2xl tracking-widest font-mono"
                    placeholder="••••"
                    maxLength={4}
                    autoFocus
                  />
                  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
            ) : (
                <>
                    <div>
                      <label className="block text-sm font-medium text-voy-dark mb-1.5">Email address</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-voy-dark focus:border-transparent outline-none bg-white/50"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-sm font-medium text-voy-dark">Password</label>
                        <a href="#" className="text-sm text-voy-dark underline hover:text-voy-peach">Forgot password?</a>
                      </div>
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-voy-dark focus:border-transparent outline-none bg-white/50"
                        placeholder="••••••••"
                      />
                    </div>
                </>
            )}

            <button 
              type="submit"
              className="w-full py-4 bg-voy-dark text-white rounded-xl font-medium hover:bg-voy-forest transition-all shadow-lg shadow-voy-dark/20 mt-4"
            >
              {isAdminMode ? 'Access Portal' : 'Sign in'}
            </button>
          </form>

          {/* Footer Toggle */}
          <div className="mt-12 text-center">
            <button 
                onClick={() => { setIsAdminMode(!isAdminMode); setError(''); setAdminPin(''); }}
                className="text-xs text-voy-text/30 hover:text-voy-dark uppercase tracking-widest transition-colors"
            >
                {isAdminMode ? 'Return to Patient Login' : 'Clinician Portal Access'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
