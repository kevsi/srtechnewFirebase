import { useState } from "react";
import { Save, Bell, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: "SR Technologies",
    siteEmail: "contact@srtech.com",
    maintenanceMode: false,
    allowRegistrations: true,
    emailNotifications: true,
  });

  const handleSave = () => {
    // Sauvegarder les paramètres
    localStorage.setItem("admin_settings", JSON.stringify(settings));
    alert("Paramètres sauvegardés avec succès !");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600 mt-1">Gérer les paramètres de la plateforme</p>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-bold text-gray-900">Paramètres généraux</h2>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="siteName">Nom du site</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) =>
                  setSettings({ ...settings, siteName: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="siteEmail">Email de contact</Label>
              <Input
                id="siteEmail"
                type="email"
                value={settings.siteEmail}
                onChange={(e) =>
                  setSettings({ ...settings, siteEmail: e.target.value })
                }
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-bold text-gray-900">Sécurité</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenanceMode">Mode maintenance</Label>
                <p className="text-sm text-gray-600">
                  Activer pour mettre le site en maintenance
                </p>
              </div>
              <Switch
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, maintenanceMode: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="allowRegistrations">Autoriser les inscriptions</Label>
                <p className="text-sm text-gray-600">
                  Permettre aux nouveaux utilisateurs de s'inscrire
                </p>
              </div>
              <Switch
                id="allowRegistrations"
                checked={settings.allowRegistrations}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, allowRegistrations: checked })
                }
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications">Notifications par email</Label>
                <p className="text-sm text-gray-600">
                  Recevoir des notifications par email
                </p>
              </div>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, emailNotifications: checked })
                }
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-lime hover:bg-lime/90 text-black">
            <Save className="w-4 h-4 mr-2" />
            Enregistrer les modifications
          </Button>
        </div>
      </div>
    </div>
  );
}

