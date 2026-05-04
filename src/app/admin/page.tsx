'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      router.push('/admin/dashboard');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0A0E27]">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#0066FF]/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#00D4FF]/5 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-full border-2 border-[#00D4FF]/30 shadow-[0_0_40px_rgba(0,212,255,0.15)] overflow-hidden mb-4">
            <img
              src="/dr-vijay-ladumor.jpeg"
              alt="Sparsh Hospital"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <h1 className="text-2xl font-bold text-white">
            <span className="text-white">Sparsh</span>{' '}
            <span className="text-[#00D4FF]">Hospital</span>
          </h1>
          <p className="text-white/40 text-sm mt-1">Admin Panel</p>
        </div>

        {/* Login Card */}
        <div className="glass-card p-8 relative overflow-hidden">
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D4FF]/30 to-transparent" />

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066FF]/20 to-[#00D4FF]/20 border border-white/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#00D4FF]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Admin Login</h2>
              <p className="text-white/40 text-xs">Access the inquiry dashboard</p>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm text-white/55 font-medium mb-2 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#00D4FF]/60" />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@sparsh.com"
                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/20 focus:border-[#00D4FF]/40 focus:shadow-[0_0_15px_rgba(0,212,255,0.08)] focus:outline-none focus:ring-1 focus:ring-[#00D4FF]/20 transition-all duration-300 text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-white/55 font-medium mb-2 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#00D4FF]/60" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter password"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/20 focus:border-[#00D4FF]/40 focus:shadow-[0_0_15px_rgba(0,212,255,0.08)] focus:outline-none focus:ring-1 focus:ring-[#00D4FF]/20 transition-all duration-300 text-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="relative w-full py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2.5 overflow-hidden group disabled:opacity-60"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF] via-[#0044CC] to-[#0066FF] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_30px_rgba(0,212,255,0.2),0_0_40px_rgba(0,212,255,0.3)]" />
              <span className="relative z-10 flex items-center gap-2.5 text-white">
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Lock className="w-5 h-5" />
                )}
                {loading ? 'Signing in...' : 'Sign In'}
              </span>
            </motion.button>
          </form>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-white/30 hover:text-[#00D4FF] text-sm transition-colors duration-300"
          >
            &larr; Back to website
          </a>
        </div>
      </motion.div>
    </div>
  );
}
