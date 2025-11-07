import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useEvent } from '@/hooks/use-events';
import { formatDate } from '@/lib/events';
import { ArrowLeft, Calendar, MapPin, Share2, Clock, Ticket } from 'lucide-react';

export default function EvenementDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: event, isLoading, error } = useEvent(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Header />
        <main className="max-w-[900px] mx-auto py-20 px-6 text-center">
          <p className="text-black/60">Chargement de l'événement...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Header />
        <main className="max-w-[900px] mx-auto py-20 px-6">
          <h1 className="text-2xl font-medium">Événement introuvable</h1>
          <p className="mt-4 text-black/70">
            {error ? "Erreur lors du chargement de l'événement." : "L'événement demandé n'a pas été trouvé."}
          </p>
          <Link to="/evenements" className="inline-block mt-6 bg-lime text-black px-4 py-2 rounded">Retour aux événements</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      <header className="relative">
        <div className="h-[320px] md:h-[380px] lg:h-[420px] w-full bg-gradient-to-r from-[#E6FFDD] via-[#D0F7FF] to-[#E8F0FF] overflow-hidden rounded-b-3xl">
          <div className="max-w-[1200px] mx-auto h-full flex items-center px-6 lg:px-0">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div className="p-6 lg:p-0">
                <Breadcrumbs items={[{ label: 'Accueil', to: '/' }, { label: 'Événements', to: '/evenements' }, { label: event.title, current: true }]} />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-black">{event.title}</h1>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-medium shadow">
                    <Calendar className="w-4 h-4" /> {formatDate(event.date)}
                  </span>

                  <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-medium shadow">
                    <MapPin className="w-4 h-4" /> {event.location}
                  </span>

                  <span className="inline-flex items-center gap-2 bg-white/70 px-3 py-2 rounded-full text-sm text-black/70">
                    <Clock className="w-4 h-4" /> 09:00 - 17:00
                  </span>
                </div>

                <p className="mt-6 max-w-2xl text-black/80 text-lg">{event.desc}</p>

              </div>

              <div className="hidden lg:flex justify-end">
                <div className="w-[300px] h-[180px] rounded-2xl bg-white/60 shadow-xl border border-white/30 flex items-center justify-center">
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/bfe592fa3a536dca7180a97d84a4277b4425749e?width=800" alt="event" className="w-full h-full object-cover rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 lg:px-0 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Programme</h2>
              <div className="text-sm text-black/60">Dernière mise à jour • Mars 2025</div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#F0F9FF] to-[#F7FFF0] flex items-center justify-center text-black/60 font-semibold">09</div>
                <div>
                  <div className="font-medium">Accueil & café</div>
                  <div className="text-sm text-black/60">09:00 — 09:30</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#F0F9FF] to-[#F7FFF0] flex items-center justify-center text-black/60 font-semibold">09</div>
                <div>
                  <div className="font-medium">Ouverture et introduction</div>
                  <div className="text-sm text-black/60">09:30 — 10:00</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#F0F9FF] to-[#F7FFF0] flex items-center justify-center text-black/60 font-semibold">10</div>
                <div>
                  <div className="font-medium">Sessions techniques</div>
                  <div className="text-sm text-black/60">10:00 — 12:00</div>
                </div>
              </div>

              <div className="mt-6 border-t pt-6">
                <h3 className="text-lg font-semibold mb-3">Intervenants</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg border">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E9F8FF] to-[#F0FFF2] flex items-center justify-center font-semibold text-black/70">AD</div>
                    <div>
                      <div className="font-medium">Alice Dupont</div>
                      <div className="text-sm text-black/60">Architecte réseau • Cisco</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg border">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E9F8FF] to-[#F0FFF2] flex items-center justify-center font-semibold text-black/70">BM</div>
                    <div>
                      <div className="font-medium">Bruno Martin</div>
                      <div className="text-sm text-black/60">Ingénieur systèmes • Dell</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="bg-white rounded-2xl p-6 shadow-md flex flex-col gap-6">
            <div className="text-sm text-black/60">Détails</div>
            <div className="text-lg font-semibold">{formatDate(event.date)}</div>
            <div className="text-sm text-black/70">{event.location}</div>

            <div className="pt-2">
              <div className="text-sm text-black/60">Début</div>
              <div className="font-medium">09:00</div>
            </div>

            <div>
              <div className="text-sm text-black/60">Fin</div>
              <div className="font-medium">17:00</div>
            </div>

            <div className="pt-4 border-t">
              <div className="text-sm text-black/60 mb-2">À propos</div>
              <div className="text-sm text-black/80">{event.desc.length > 140 ? event.desc.slice(0,140) + '…' : event.desc}</div>
            </div>

            <div className="pt-4 border-t">
              <Link to="/evenements" className="text-sm text-black/60 hover:underline">Voir tous les événements</Link>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
