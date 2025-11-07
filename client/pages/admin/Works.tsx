import { useEffect, useState } from "react";
import { isFirebaseEnabled, initializeFirebase } from "@/lib/firebase";
import { Search, Save, Trash2 } from "lucide-react";
import { useMemo } from "react";
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

type Work = {
  id: string;
  title: string;
  slug?: string;
  description?: string;
  categories?: string[];
  img?: string;
  createdAt?: any;
};

export default function AdminWorks() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState<{ title: string; slug: string; description: string; categories: string; img: string }>({ title: "", slug: "", description: "", categories: "", img: "" });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const availableCategories = useMemo(() => {
    const all = (works || []).flatMap((w) => w.categories || []);
    return Array.from(new Set(all)).sort((a, b) => a.localeCompare(b));
  }, [works]);

  useEffect(() => {
    loadWorks();
  }, []);

  const loadWorks = async () => {
    try {
      if (isFirebaseEnabled) {
        const { db: fbDb } = await initializeFirebase();
        if (fbDb) {
          const { collection, getDocs } = await import('firebase/firestore');
          const ref = collection(fbDb, 'works');
          const snap = await getDocs(ref);
          const list: Work[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
          setWorks(list);
        }
      } else {
        setWorks([]);
      }
    } catch (e) {
      console.error('Error loading works', e);
    } finally {
      setLoading(false);
    }
  };

  const createWork = async () => {
    if (!form.title.trim()) { alert('Le titre est obligatoire'); return; }
    try {
      if (isFirebaseEnabled) {
        const { db: fbDb, storage } = await initializeFirebase();
        if (fbDb) {
          const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
          let imageUrl = form.img || '';
          // Upload vers Storage si un fichier est choisi et storage configuré
          if (storage && file) {
            const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
            const path = `works/${Date.now()}_${file.name}`;
            const storageRef = ref(storage as any, path);
            await uploadBytes(storageRef, file);
            imageUrl = await getDownloadURL(storageRef);
          }
          const categoriesArray = Array.from(new Set([
            ...selectedCategories,
            ...((form.categories || "").split(',').map(s=>s.trim()).filter(Boolean))
          ]));
          await addDoc(collection(fbDb, 'works'), {
            title: form.title,
            slug: form.slug || form.title.toLowerCase().replace(/\s+/g, '-'),
            description: form.description || '',
            categories: categoriesArray,
            img: imageUrl,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
          setForm({ title: '', slug: '', description: '', categories: '', img: '' });
          setFile(null);
          setPreview("");
          setSelectedCategories([]);
          loadWorks();
        }
      } else {
        const categoriesArray = Array.from(new Set([
          ...selectedCategories,
          ...((form.categories || "").split(',').map(s=>s.trim()).filter(Boolean))
        ]));
        setWorks([{ id: String(Date.now()), title: form.title, slug: form.slug, description: form.description, categories: categoriesArray, img: form.img || preview }, ...works]);
        setForm({ title: '', slug: '', description: '', categories: '', img: '' });
        setFile(null);
        setPreview("");
        setSelectedCategories([]);
      }
    } catch (e) {
      console.error('Error creating work', e);
      alert('Erreur lors de la création du work');
    }
  };

  const removeWork = async (id: string) => {
    if (!confirm('Supprimer ce work ?')) return;
    try {
      if (isFirebaseEnabled) {
        const { db: fbDb } = await initializeFirebase();
        if (fbDb) {
          const { doc, deleteDoc } = await import('firebase/firestore');
          await deleteDoc(doc(fbDb, 'works', id));
          loadWorks();
        }
      } else {
        setWorks(works.filter((w) => w.id !== id));
      }
    } catch (e) {
      console.error('Error deleting work', e);
      alert('Erreur lors de la suppression');
    }
  };

  const filtered = works.filter((w) =>
    w.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (w.slug || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (w.categories || []).join(', ').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Works</h1>
        <p className="text-gray-600 mt-1">Gérer les réalisations (works)</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          <Input placeholder="Titre *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Input placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <div>
            <Input placeholder="Catégories (séparées par des virgules)" value={form.categories} onChange={(e) => setForm({ ...form, categories: e.target.value })} />
            {availableCategories.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {availableCategories.map((cat) => {
                  const active = selectedCategories.includes(cat);
                  return (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setSelectedCategories((prev) => prev.includes(cat) ? prev.filter(c=>c!==cat) : [...prev, cat])}
                      className={`px-2 py-1 rounded text-sm border ${active ? 'bg-lime text-black border-lime' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            )}
            {selectedCategories.length > 0 && (
              <div className="mt-2 text-xs text-gray-600">Sélection: {selectedCategories.join(', ')}</div>
            )}
          </div>
          <div className="space-y-2">
            <Input placeholder="Image URL" value={form.img} onChange={(e) => { setForm({ ...form, img: e.target.value }); setPreview(e.target.value); }} />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0] || null;
                setFile(f);
                if (f) setPreview(URL.createObjectURL(f));
              }}
              className="block w-full text-sm"
            />
          </div>
          <Input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="md:col-span-2" />
          <Button onClick={createWork} className="bg-lime hover:bg-lime/90 text-black w-full">
            <Save className="w-4 h-4 mr-2" /> Créer
          </Button>
        </div>
        {preview && (
          <div className="mt-3">
            <div className="text-sm text-gray-600 mb-1">Aperçu de l'image</div>
            <img src={preview} alt="preview" className="max-h-40 rounded border" />
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Rechercher..." className="pl-10" />
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-600">Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-600">Aucun work</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Catégories</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((w) => (
                <TableRow key={w.id}>
                  <TableCell className="font-medium">{w.title}</TableCell>
                  <TableCell>{w.slug || '-'}</TableCell>
                  <TableCell>{(w.categories || []).join(', ') || '-'}</TableCell>
                  <TableCell className="max-w-xs truncate">{w.img || '-'}</TableCell>
                  <TableCell className="max-w-xl truncate">{w.description || '-'}</TableCell>
                  <TableCell className="text-right">
                    <button onClick={() => removeWork(w.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-600">
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


