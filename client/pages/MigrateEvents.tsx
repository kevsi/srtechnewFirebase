import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/AuthContext";
import { migrateEventsToFirestore } from "@/lib/events";
import { Button } from "@/components/ui/button";

/**
 * Page utilitaire pour migrer les événements locaux vers Firestore
 * Cette page peut être supprimée après la migration
 */
export default function MigrateEvents() {
  const { user } = useAuth();
  const [isMigrating, setIsMigrating] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleMigrate = async () => {
    if (!user) {
      setResult({ success: false, message: "Vous devez être connecté pour effectuer la migration." });
      return;
    }

    setIsMigrating(true);
    setResult(null);

    try {
      await migrateEventsToFirestore();
      setResult({ success: true, message: "Migration terminée avec succès ! Les événements ont été ajoutés à Firestore." });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erreur inconnue lors de la migration";
      setResult({ success: false, message: `Erreur lors de la migration: ${errorMessage}` });
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <main className="max-w-[800px] mx-auto py-20 px-6">
        <h1 className="text-3xl font-semibold mb-6">Migration des événements vers Firestore</h1>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>Note :</strong> Cette page est un utilitaire de migration. Vous pouvez la supprimer après avoir migré vos données.
          </p>
        </div>

        {!user && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">Vous devez être connecté pour effectuer la migration.</p>
          </div>
        )}

        <div className="space-y-4">
          <p className="text-black/70">
            Cette action va migrer les événements depuis <code className="bg-gray-100 px-2 py-1 rounded">client/data/events.ts</code> vers Firestore.
            Les événements existants dans Firestore ne seront pas écrasés.
          </p>

          <Button
            onClick={handleMigrate}
            disabled={isMigrating || !user}
            className="bg-lime text-black hover:bg-lime/90"
          >
            {isMigrating ? "Migration en cours..." : "Migrer les événements"}
          </Button>

          {result && (
            <div className={`rounded-lg p-4 ${
              result.success 
                ? "bg-green-50 border border-green-200" 
                : "bg-red-50 border border-red-200"
            }`}>
              <p className={result.success ? "text-green-800" : "text-red-800"}>
                {result.message}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

