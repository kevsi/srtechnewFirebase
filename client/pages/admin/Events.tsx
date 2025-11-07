import { useEffect, useState } from "react";
import { isFirebaseEnabled, initializeFirebase } from "@/lib/firebase";
import { Search, Plus, Edit, Trash2, Calendar, Save } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Event = {
  id: string;
  title: string;
  description?: string;
  date?: any;
  location?: string;
  createdAt?: any;
};

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [newEvent, setNewEvent] = useState<{ title: string; desc: string; date: string; location: string }>({
    title: "",
    desc: "",
    date: "",
    location: "",
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      if (isFirebaseEnabled) {
        const { db: fbDb } = await initializeFirebase();
        if (fbDb) {
          const { collection, getDocs } = await import('firebase/firestore');
          const eventsRef = collection(fbDb, "events");
          const eventsSnap = await getDocs(eventsRef);
          
          const eventsList: Event[] = eventsSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Event[];
          
          setEvents(eventsList);
        }
      } else {
        // Mode démo
        setEvents([
          {
            id: "1",
            title: "Conférence Tech 2024",
            description: "Une conférence sur les dernières technologies",
            date: new Date(),
            location: "Paris",
          },
          {
            id: "2",
            title: "Workshop React",
            description: "Apprendre React en profondeur",
            date: new Date(),
            location: "Lyon",
          },
        ]);
      }
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newEvent.title.trim()) {
      alert("Le titre est obligatoire");
      return;
    }
    try {
      if (isFirebaseEnabled) {
        const { db: fbDb } = await initializeFirebase();
        if (fbDb) {
          const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
          await addDoc(collection(fbDb, 'events'), {
            title: newEvent.title,
            desc: newEvent.desc || '',
            location: newEvent.location || '',
            date: newEvent.date ? new Date(newEvent.date) : null,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
          setNewEvent({ title: '', desc: '', date: '', location: '' });
          loadEvents();
        }
      } else {
        setEvents([
          {
            id: String(Date.now()),
            title: newEvent.title,
            description: newEvent.desc,
            date: newEvent.date ? new Date(newEvent.date) : undefined,
            location: newEvent.location,
          },
          ...events,
        ]);
        setNewEvent({ title: '', desc: '', date: '', location: '' });
      }
    } catch (e) {
      console.error('Error creating event', e);
      alert("Erreur lors de la création de l'événement");
    }
  };

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (eventId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
      return;
    }

    try {
      if (isFirebaseEnabled) {
        const { db: fbDb } = await initializeFirebase();
        if (fbDb) {
          const { doc, deleteDoc } = await import('firebase/firestore');
          await deleteDoc(doc(fbDb, "events", eventId));
          loadEvents();
        }
      } else {
        setEvents(events.filter((e) => e.id !== eventId));
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Erreur lors de la suppression de l'événement");
    }
  };

  const formatDate = (date: any) => {
    if (!date) return "-";
    try {
      if (date.toDate) {
        return date.toDate().toLocaleDateString("fr-FR");
      }
      return new Date(date).toLocaleDateString("fr-FR");
    } catch {
      return "-";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Événements</h1>
          <p className="text-gray-600 mt-1">Gérer tous les événements de la plateforme</p>
        </div>
        <div className="hidden lg:block"></div>
      </div>

      {/* Create */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <input
            placeholder="Titre *"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            className="border rounded px-3 py-2"
          />
          <input
            placeholder="Lieu"
            value={newEvent.location}
            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            className="border rounded px-3 py-2"
          />
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className="border rounded px-3 py-2"
          />
          <input
            placeholder="Description (desc)"
            value={newEvent.desc}
            onChange={(e) => setNewEvent({ ...newEvent, desc: e.target.value })}
            className="border rounded px-3 py-2 md:col-span-1"
          />
          <Button onClick={handleCreate} className="bg-lime hover:bg-lime/90 text-black w-full">
            <Save className="w-4 h-4 mr-2" /> Créer
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Rechercher un événement..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-600">Chargement...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="p-8 text-center text-gray-600">Aucun événement trouvé</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Lieu</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell className="max-w-md truncate">
                    {event.description || "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {formatDate(event.date)}
                    </div>
                  </TableCell>
                  <TableCell>{event.location || "-"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/evenements/${event.id}`}>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="text-sm text-gray-600">
        Total: {filteredEvents.length} événement{filteredEvents.length > 1 ? "s" : ""}
      </div>
    </div>
  );
}

