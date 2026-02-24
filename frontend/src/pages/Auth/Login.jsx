import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Sprout, CheckCircle2 } from 'lucide-react';
import { api } from '../../lib/api';
import { InputField } from '../../components/ui/InputField';

export const Login = () => {
    const { login } = useAuthStore();
    const navigate = useNavigate();

    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState('');
    const [role, setRole] = useState('FARMER');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAuth = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            let response;

            if (isRegister) {
                response = await api.post('/api/auth/register', {
                    name,
                    email: email.trim().toLowerCase(),
                    password,
                    role
                });
            } else {
                response = await api.post('/api/auth/login', {
                    email: email.trim().toLowerCase(),
                    password
                });
            }

            // 🔥 Correct extraction based on backend structure
            const responseData = response.data;

            if (!responseData.success) {
                throw new Error('Authentication failed');
            }

            const {
                id,
                name: userName,
                email: userEmail,
                role: userRole,
                token,
                refreshToken
            } = responseData.data;

            const user = {
                id,
                name: userName,
                email: userEmail,
                role: userRole
            };

            // Store in auth store
            login(token, refreshToken, user);

            // Safe navigation
            if (userRole) {
                navigate(`/${userRole.toLowerCase()}/dashboard`);
            } else {
                throw new Error('User role missing');
            }

        } catch (err) {
            console.error("Login Error:", err);
            setError(
                err.response?.data?.message ||
                err.message ||
                'Authentication failed. Please check credentials.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-background-light dark:bg-background-dark font-display">
            {/* Left Side: Landing / Marketing Hero */}
            <div className="hidden md:flex flex-1 flex-col justify-between p-12 lg:p-24 bg-primary text-white relative overflow-hidden">
                {/* Background Pattern / Decoration */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-light rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4"></div>
                </div>

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-3 text-accent font-bold text-2xl mb-16 tracking-tight">
                        <span className="material-symbols-outlined text-[36px]">agriculture</span>
                        <span>AgriLink<span className="text-white">AI</span></span>
                    </div>

                    <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-6">
                        The Future of <br />
                        <span className="text-accent">Agricultural</span> Trade.
                    </h1>

                    <p className="text-primary-light text-xl mb-12 max-w-lg leading-relaxed text-white/80">
                        Connect directly with verified buyers, leverage AI-driven pricing, and secure funding for your next harvest.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-lg font-medium">
                            <CheckCircle2 className="text-accent w-6 h-6" /> Data-Driven AI Crop Pricing
                        </div>
                        <div className="flex items-center gap-4 text-lg font-medium">
                            <CheckCircle2 className="text-accent w-6 h-6" /> Zero-Middleman Marketplace
                        </div>
                        <div className="flex items-center gap-4 text-lg font-medium">
                            <CheckCircle2 className="text-accent w-6 h-6" /> Verified Investor Syndiates
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-sm font-medium text-white/50">
                    &copy; 2026 AgriLink Global. All rights reserved.
                </div>
            </div>

            {/* Right Side: Auth Form */}
            <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-surface-light dark:bg-surface-dark relative">
                {/* Mobile pattern */}
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary md:hidden"></div>

                <div className="max-w-md w-full space-y-8">
                    <div className="text-center md:text-left">
                        <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent mb-6 md:hidden">
                            <span className="material-symbols-outlined text-[32px]">agriculture</span>
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            {isRegister ? 'Join AgriLinkAI' : 'Welcome Back'}
                        </h2>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            {isRegister ? 'Create an account to access intelligent agricultural markets.' : 'Sign in to access your intelligent market dashboard.'}
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 flex items-start gap-3">
                            <span className="material-symbols-outlined text-red-500">error</span>
                            <span>{error}</span>
                        </div>
                    )}

                    <form className="mt-8 space-y-6" onSubmit={handleAuth}>
                        <div className="space-y-5">
                            {isRegister && (
                                <>
                                    <InputField
                                        label="Full Name"
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Doe"
                                    />
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">I am a</label>
                                        <select
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            className="w-full border border-slate-300 dark:border-white/10 rounded-lg px-4 py-3 bg-white dark:bg-surface-dark text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                        >
                                            <option value="FARMER">Farmer</option>
                                            <option value="BUYER">Buyer</option>
                                            <option value="INVESTOR">Investor</option>
                                        </select>
                                    </div>
                                </>
                            )}
                            <InputField
                                label="Email Address"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                            />
                            <InputField
                                label="Password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>

                        {!isRegister && (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded" />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
                                        Remember me
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <a href="#" className="font-bold text-primary dark:text-accent hover:underline">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                        )}

                        <Button type="submit" className="w-full text-lg h-14" isLoading={isLoading}>
                            {isRegister ? 'Create Account' : 'Sign in securely'}
                        </Button>
                    </form>

                    <div className="mt-10 pt-6 border-t border-slate-100 dark:border-white/10 text-center">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            {isRegister ? 'Already have an account? ' : "Don't have an account? "}
                            <button onClick={() => setIsRegister(!isRegister)} className="font-bold text-primary dark:text-accent hover:underline cursor-pointer">
                                {isRegister ? 'Sign in instead' : 'Register Now'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
