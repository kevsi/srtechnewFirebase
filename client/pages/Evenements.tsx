import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/AuthContext";
import { useEvents } from "@/hooks/use-events";
import { formatDate } from "@/lib/events";

export default function Evenements() {
  const { user } = useAuth();
  const { data: events = [], isLoading, error } = useEvents();

  // L'utilisateur peut se connecter via les boutons Login/Sign up dans le Header

  if (!user) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Header />
        <main className="max-w-[800px] mx-auto py-20 px-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">Accès réservé</h2>
          <p className="text-black/70 mb-6">Vous devez être connecté pour accéder à la page des événements. Utilisez les boutons "Login" ou "Sign up" dans le header pour vous connecter.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      <section className="py-12 lg:py-20 px-6">
        <div className="max-w-[1440px] mx-auto text-center">
          <p className="text-black/80 font-['Josefin_Sans'] text-sm lg:text-base uppercase mb-3">
            Événements
          </p>
          <h1 className="text-black font-['Work_Sans'] text-3xl lg:text-[48px] font-medium mb-6">
            Nos prochains événements
          </h1>
          <p className="max-w-2xl mx-auto text-black/70">
            Rejoignez-nous pour des conférences, ateliers et salons techniques
            où les principaux acteurs du secteur partagent leur expertise.
          </p>
        </div>

        {isLoading && (
          <div className="max-w-[1440px] mx-auto mt-8 text-center text-black/60">
            Chargement des événements...
          </div>
        )}

        {error && (
          <div className="max-w-[1440px] mx-auto mt-8 text-center text-red-600">
            Erreur lors du chargement des événements. Veuillez réessayer.
          </div>
        )}

        {!isLoading && !error && events.length === 0 && (
          <div className="max-w-[1440px] mx-auto mt-8 text-center text-black/60">
            Aucun événement disponible pour le moment.
          </div>
        )}

        {!isLoading && !error && events.length > 0 && (
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {events.map((e) => (
              <article
                key={e.id}
                className="border rounded-lg p-6 shadow-sm bg-white"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-medium">{e.title}</h3>
                  <div className="text-sm text-black/60">
                    {formatDate(e.date)}
                  </div>
                </div>

                <p className="text-black/70 mb-4">{e.desc}</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-black/60">{e.location}</span>
                  <Link
                    to={`/evenements/${e.id}`}
                    className="inline-flex items-center gap-2 bg-lime text-black font-medium uppercase px-3 py-2 rounded"
                  >
                    Learn more
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
