import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthContext";

export default function Onboarding() {
  const navigate = useNavigate();
  const { user, onboarding, saveOnboarding } = useAuth();
  const [form, setForm] = useState<{ role: string; age: string }>({
    role: "",
    age: "",
  });

  useEffect(() => {
    // Si l'utilisateur n'est pas connecté, rediriger vers login
    if (!user) {
      navigate("/login");
      return;
    }

    // Si l'onboarding est déjà complété, rediriger vers l'accueil
    if (onboarding && onboarding.role && onboarding.age) {
      navigate("/");
    }
  }, [user, onboarding, navigate]);

  const submitOnboarding = async () => {
    if (!form.role || !form.age) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      await saveOnboarding(form);
      localStorage.setItem("_auth_onboarding", JSON.stringify(form));
      navigate("/");
    } catch (err) {
      console.error("Erreur lors de la sauvegarde de l'onboarding:", err);
      alert("Erreur lors de la sauvegarde. Veuillez réessayer.");
    }
  };

  if (!user) {
    return null; // Redirection en cours
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-2xl">
          <div className="mb-10">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Configuration de votre profil
            </h1>
            <p className="text-gray-600">
              Complétez votre profil pour personnaliser votre expérience.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Votre rôle *
                </label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-lime focus:border-transparent transition-all outline-none text-gray-900"
                  required
                >
                  <option value="">Sélectionnez votre rôle</option>
                  <option value="Étudiant">Étudiant</option>
                  <option value="Professionnel">Professionnel</option>
                  <option value="Entrepreneur">Entrepreneur</option>
                  <option value="Enseignant">Enseignant</option>
                  <option value="Chercheur">Chercheur</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Votre âge *
                </label>
                <input
                  type="number"
                  min="13"
                  max="120"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                  placeholder="Entrez votre âge"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-lime focus:border-transparent transition-all outline-none text-gray-900"
                  required
                />
              </div>

              <div className="mt-8 flex items-center justify-end">
                <button
                  onClick={submitOnboarding}
                  className="bg-lime hover:bg-lime/90 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200"
                >
                  Terminer
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

