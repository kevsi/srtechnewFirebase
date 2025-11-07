import { initializeFirebase } from "./firebase";
import { collection, doc, getDoc, getDocs, query, orderBy, setDoc, deleteDoc, Timestamp } from "firebase/firestore";

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  desc: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export function formatDate(dateInput: any) {
  try {
    if (!dateInput) return "-";
    // Firestore Timestamp
    if (typeof dateInput?.toDate === 'function') {
      const d = dateInput.toDate();
      return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    // String or number
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return "-";
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return "-";
  }
}

/**
 * Récupère tous les événements depuis Firestore
 */
export async function getEvents(): Promise<Event[]> {
  const { db } = await initializeFirebase();
  
  if (!db) {
    // Fallback vers les données locales si Firebase n'est pas disponible
    const { events } = await import("@/data/events");
    return events.map(e => ({ ...e, id: e.id }));
  }

  try {
    const eventsRef = collection(db, "events");
    const q = query(eventsRef, orderBy("date", "asc"));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || "",
        date: data.date || "",
        location: data.location || "",
        desc: data.desc || "",
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      };
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des événements:", error);
    // Fallback vers les données locales en cas d'erreur
    const { events } = await import("@/data/events");
    return events.map(e => ({ ...e, id: e.id }));
  }
}

/**
 * Récupère un événement par son ID depuis Firestore
 */
export async function getEventById(id: string): Promise<Event | null> {
  const { db } = await initializeFirebase();
  
  if (!db) {
    // Fallback vers les données locales si Firebase n'est pas disponible
    const { events } = await import("@/data/events");
    const event = events.find(e => e.id === id);
    return event ? { ...event, id: event.id } : null;
  }

  try {
    const eventRef = doc(db, "events", id);
    const snapshot = await getDoc(eventRef);
    
    if (!snapshot.exists()) {
      // Fallback vers les données locales si l'événement n'existe pas dans Firestore
      const { events } = await import("@/data/events");
      const event = events.find(e => e.id === id);
      return event ? { ...event, id: event.id } : null;
    }

    const data = snapshot.data();
    return {
      id: snapshot.id,
      title: data.title || "",
      date: data.date || "",
      location: data.location || "",
      desc: data.desc || "",
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    };
  } catch (error) {
    console.error("Erreur lors de la récupération de l'événement:", error);
    // Fallback vers les données locales en cas d'erreur
    const { events } = await import("@/data/events");
    const event = events.find(e => e.id === id);
    return event ? { ...event, id: event.id } : null;
  }
}

/**
 * Crée ou met à jour un événement dans Firestore
 */
export async function saveEvent(event: Omit<Event, "id" | "createdAt" | "updatedAt">, id?: string): Promise<string> {
  const { db } = await initializeFirebase();
  
  if (!db) {
    throw new Error("Firebase n'est pas disponible. Impossible de sauvegarder l'événement.");
  }

  try {
    const now = Timestamp.now();
    const eventData = {
      ...event,
      updatedAt: now,
      ...(id ? {} : { createdAt: now }),
    };

    if (id) {
      const eventRef = doc(db, "events", id);
      await setDoc(eventRef, eventData, { merge: true });
      return id;
    } else {
      const eventsRef = collection(db, "events");
      const newEventRef = doc(eventsRef);
      await setDoc(newEventRef, eventData);
      return newEventRef.id;
    }
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de l'événement:", error);
    throw error;
  }
}

/**
 * Supprime un événement de Firestore
 */
export async function deleteEvent(id: string): Promise<void> {
  const { db } = await initializeFirebase();
  
  if (!db) {
    throw new Error("Firebase n'est pas disponible. Impossible de supprimer l'événement.");
  }

  try {
    const eventRef = doc(db, "events", id);
    await deleteDoc(eventRef);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'événement:", error);
    throw error;
  }
}

/**
 * Migre les événements locaux vers Firestore
 */
export async function migrateEventsToFirestore(): Promise<void> {
  const { db } = await initializeFirebase();
  
  if (!db) {
    throw new Error("Firebase n'est pas disponible. Impossible de migrer les événements.");
  }

  try {
    const { events: localEvents } = await import("@/data/events");
    
    for (const event of localEvents) {
      const eventRef = doc(db, "events", event.id);
      const existing = await getDoc(eventRef);
      
      if (!existing.exists()) {
        await setDoc(eventRef, {
          ...event,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });
        console.log(`Événement migré: ${event.title}`);
      } else {
        console.log(`Événement déjà existant: ${event.title}`);
      }
    }
    
    console.log("Migration terminée avec succès!");
  } catch (error) {
    console.error("Erreur lors de la migration:", error);
    throw error;
  }
}

