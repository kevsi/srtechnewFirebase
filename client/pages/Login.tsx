import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthContext";
import { Link } from "react-router-dom";
import { Lock, Shield, Zap, Award } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { user, login, onboarding, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Si l'utilisateur est déjà connecté et a complété l'onboarding, rediriger vers l'accueil
    if (user && onboarding && onboarding.role && onboarding.age) {
      navigate("/");
    }
  }, [user, onboarding, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      
      // Attendre un peu pour que l'onboarding soit chargé depuis Firestore
      setTimeout(() => {
        const raw = localStorage.getItem("_auth_onboarding");
        let onboardingData = null;
        if (raw) {
          try {
            onboardingData = JSON.parse(raw);
          } catch (e) {
            console.error("Error parsing onboarding data", e);
          }
        }
        
        // Vérifier si l'onboarding existe déjà et est complet
        if ((onboarding && onboarding.role && onboarding.age) || (onboardingData && onboardingData.role && onboardingData.age)) {
          // Rediriger vers l'accueil si l'onboarding est déjà complété
          navigate("/");
        } else {
          // Sinon, rediriger vers l'onboarding
          navigate("/onboarding");
        }
      }, 500);
    } catch (err: any) {
      setError(err.message || "Erreur lors de la connexion. Vérifiez vos identifiants.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      
      // Attendre un peu pour que l'onboarding soit chargé depuis Firestore
      setTimeout(() => {
        const raw = localStorage.getItem("_auth_onboarding");
        let onboardingData = null;
        if (raw) {
          try {
            onboardingData = JSON.parse(raw);
          } catch (e) {
            console.error("Error parsing onboarding data", e);
          }
        }
        
        // Vérifier si l'onboarding existe déjà et est complet
        if ((onboarding && onboarding.role && onboarding.age) || (onboardingData && onboardingData.role && onboardingData.age)) {
          navigate("/");
        } else {
          navigate("/onboarding");
        }
      }, 500);
    } catch (err: any) {
      setError(err.message || "Erreur lors de la connexion Google.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="min-h-screen flex items-center justify-center p-0">
        <div className="w-full h-full min-h-screen max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2">
          {/* Form Section */}
          <div className="bg-white flex items-center justify-center px-8 lg:px-16 py-12">
            <div className="w-full max-w-md">
              <div className="mb-10">
                <div className="w-12 h-12 bg-lime rounded-xl flex items-center justify-center mb-6">
                  <Lock className="w-6 h-6 text-black" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  Accéder à votre compte
                </h1>
                <p className="text-gray-600">
                  Connectez-vous pour accéder à toutes les fonctionnalités de la plateforme.
                </p>
              </div>

              <div className="space-y-6">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full inline-flex items-center justify-center gap-3 border border-gray-300 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                  type="button"
                >
                  <img
                    src="data:image/svg+xml;utf8,<?xml version='1.0' encoding='utf-8'?><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' width='18' height='18'><path fill='%23EA4335' d='M24 9.5c3.9 0 7.4 1.4 10.1 3.7l7.6-7.6C36.6 2.6 30.7 0 24 0 14.5 0 6.7 4.9 2.7 12l8.8 6.8C13.8 14 18.5 9.5 24 9.5z'/><path fill='%234285F4' d='M46.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9.1h12.6c-.5 3-2.2 5.6-4.7 7.3l7.3 5.7C43.9 37.1 46.5 31.1 46.5 24.5z'/><path fill='%23FBBC05' d='M10.9 28.7C9.9 26.9 9.3 24.8 9.3 22.5s.6-4.4 1.6-6.2L2.1 9.5C.8 12 0 16 0 20.9c0 4.8.8 8.9 2.1 11.4l8.8-3.6z'/></svg>"
                    alt="Google"
                  />
                  Se connecter avec Google
                </button>

                <div className="text-center text-sm text-gray-400">ou</div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Email address *
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-lime focus:border-transparent transition-all outline-none text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Password *
                    </label>
                    <input
                      required
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-lime focus:border-transparent transition-all outline-none text-gray-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-lime hover:bg-lime/90 text-black font-semibold px-6 py-3.5 rounded-lg transition-all duration-200"
                  >
                    Sign In
                  </button>
                </form>

                <div className="text-center pt-2">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-lime hover:text-lime/80 font-medium underline">
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Section */}
          <div className="hidden lg:block relative bg-gradient-to-br from-purple-700 via-purple-800 to-gray-900 overflow-hidden">
            {/* Logo en haut */}
            <div className="absolute top-8 left-8 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">SR Technologies</div>
                  <div className="text-purple-200 text-xs">Make your legacy</div>
                </div>
              </div>
            </div>

            {/* Contenu principal */}
            <div className="absolute inset-0 flex items-center justify-center px-12">
              <div className="max-w-lg">
                <h2 className="text-white text-4xl lg:text-5xl font-bold leading-tight mb-8">
                  Your account is unique — keep it safe and don't share it with others.
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Zap className="w-4 h-4 text-purple-300" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Unlock premium features</div>
                      <div className="text-purple-200 text-sm">Access all tools and resources</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Award className="w-4 h-4 text-purple-300" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Get priority updates</div>
                      <div className="text-purple-200 text-sm">Be the first to know about new features</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Shield className="w-4 h-4 text-purple-300" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Access exclusive resources</div>
                      <div className="text-purple-200 text-sm">Premium templates and support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Effets de fond */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          </div>
        </div>
      </main>
    </div>
  );
}

