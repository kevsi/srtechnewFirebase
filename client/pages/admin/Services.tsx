import { useEffect, useState } from "react";
import { isFirebaseEnabled, initializeFirebase } from "@/lib/firebase";
import { Search, Save, Trash2, Code, Smartphone, Target, Camera, TrendingUp, Box, Globe, Shield, Rocket, Award, Zap, Activity, Calendar, Layers, Layout, Brush, Cpu, Database, Image as ImageIcon, Link2, MapPin, Monitor, MousePointer, Palette, PenTool, PieChart, Server, Share2, ShoppingCart, Sparkles, SquareStack, Star, Terminal, Trophy, User, Users } from "lucide-react";
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

type Service = {
  id: string;
  title: string;
  desc?: string;        // courte description (accroche)
  details?: string;     // paragraphe plus long
  features?: string[];  // liste de points
  icon?: string;        // clé d’icône ou nom
  createdAt?: any;
};

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState<{ title: string; desc: string; details: string; features: string; icon: string }>({ title: "", desc: "", details: "", features: "", icon: "" });
  const ICON_OPTIONS = [
    'Code','Smartphone','Target','Camera','TrendingUp','Box','Globe','Shield','Rocket','Award','Zap','Activity','Calendar','Layers','Layout','Brush','Cpu','Database','Image','Link2','MapPin','Monitor','MousePointer','Palette','PenTool','PieChart','Server','Share2','ShoppingCart','Sparkles','SquareStack','Star','Terminal','Trophy','User','Users'
  ];

  const ICON_MAP: Record<string, any> = {
    Code, Smartphone, Target, Camera, TrendingUp, Box, Globe, Shield, Rocket, Award, Zap,
    Activity, Calendar, Layers, Layout, Brush, Cpu, Database, Image: ImageIcon, Link2, MapPin,
    Monitor, MousePointer, Palette, PenTool, PieChart, Server, Share2, ShoppingCart, Sparkles,
    SquareStack, Star, Terminal, Trophy, User, Users
  };

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      if (isFirebaseEnabled) {
        const { db: fbDb } = await initializeFirebase();
        if (fbDb) {
          const { collection, getDocs } = await import('firebase/firestore');
          const ref = collection(fbDb, 'services');
          const snap = await getDocs(ref);
          const list: Service[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
          setServices(list);
        }
      } else {
        setServices([]);
      }
    } catch (e) {
      console.error('Error loading services', e);
    } finally {
      setLoading(false);
    }
  };

  const createService = async () => {
    if (!form.title.trim()) {
      alert('Le titre est obligatoire');
      return;
    }
    try {
      if (isFirebaseEnabled) {
        const { db: fbDb } = await initializeFirebase();
        if (fbDb) {
          const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
          await addDoc(collection(fbDb, 'services'), {
            title: form.title,
            desc: form.desc || '',
            details: form.details || '',
            features: form.features
              ? form.features.split(',').map((s) => s.trim()).filter(Boolean)
              : [],
            icon: form.icon || '',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
          setForm({ title: '', desc: '', details: '', features: '', icon: '' });
          loadServices();
        }
      } else {
        setServices([
          { id: String(Date.now()), title: form.title, desc: form.desc, details: form.details, features: form.features.split(',').map(s=>s.trim()).filter(Boolean), icon: form.icon },
          ...services,
        ]);
        setForm({ title: '', desc: '', details: '', features: '', icon: '' });
      }
    } catch (e) {
      console.error('Error creating service', e);
      alert('Erreur lors de la création du service');
    }
  };

  const removeService = async (id: string) => {
    if (!confirm('Supprimer ce service ?')) return;
    try {
      if (isFirebaseEnabled) {
        const { db: fbDb } = await initializeFirebase();
        if (fbDb) {
          const { doc, deleteDoc } = await import('firebase/firestore');
          await deleteDoc(doc(fbDb, 'services', id));
          loadServices();
        }
      } else {
        setServices(services.filter((s) => s.id !== id));
      }
    } catch (e) {
      console.error('Error deleting service', e);
      alert('Erreur lors de la suppression');
    }
  };

  const filtered = services.filter((s) =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.desc?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.details?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Services</h1>
        <p className="text-gray-600 mt-1">Gérer les services proposés</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          <Input placeholder="Titre *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <div>
            <select
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="">Sélectionner une icône (Lucide)</option>
              {ICON_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <div className="flex items-center gap-3 mt-2">
              <div className="text-xs text-gray-500">Aperçu:</div>
              <div className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 border">
                {form.icon && ICON_MAP[form.icon] ? (
                  (() => { const I = ICON_MAP[form.icon]; return <I className="w-5 h-5" />; })()
                ) : (
                  <span className="text-xs text-gray-400">-</span>
                )}
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">Ou saisissez votre propre icône ci-dessous</div>
            <Input placeholder="Icône personnalisée (nom ou URL)" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="mt-1" />
          </div>
          <Input placeholder="Desc (courte)" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} />
          <Input placeholder="Details (paragraphe)" value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} className="md:col-span-2" />
          <Input placeholder="Features (séparées par des virgules)" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} className="md:col-span-2" />
          <Button onClick={createService} className="bg-lime hover:bg-lime/90 text-black w-full md:col-span-1">
            <Save className="w-4 h-4 mr-2" /> Créer
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Rechercher..." className="pl-10" />
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-600">Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-600">Aucun service</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Desc</TableHead>
                <TableHead>Détails</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{s.desc || '-'}</TableCell>
                  <TableCell className="max-w-md truncate">{s.details || '-'}</TableCell>
                  <TableCell className="max-w-md truncate">{(s.features || []).join(', ') || '-'}</TableCell>
                  <TableCell>{s.icon || '-'}</TableCell>
                  <TableCell className="text-right">
                    <button onClick={() => removeService(s.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}


