import { useEffect, useState } from "react";
import { isFirebaseEnabled, initializeFirebase } from "@/lib/firebase";
import { Search, MoreVertical, Edit, Trash2, Shield, ShieldOff } from "lucide-react";
import { useAuth } from "@/components/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

type User = {
  id: string;
  email: string;
  name?: string;
  role?: string;
  age?: string;
  verified?: boolean;
  isAdmin?: boolean;
  createdAt?: any;
};

export default function AdminUsers() {
  const { refreshUser, user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      if (isFirebaseEnabled) {
        const { db: fbDb, auth: fbAuth } = await initializeFirebase();
        if (fbDb) {
          const { collection, getDocs, doc, getDoc } = await import('firebase/firestore');
          
          // Récupérer tous les utilisateurs depuis Firestore
          const usersRef = collection(fbDb, "users");
          const usersSnap = await getDocs(usersRef);
          
          const usersList: User[] = [];
          
          // Pour chaque utilisateur, récupérer aussi l'onboarding
          for (const userDoc of usersSnap.docs) {
            const userData = userDoc.data();
            const onboardingRef = doc(fbDb, "onboardings", userDoc.id);
            const onboardingSnap = await getDoc(onboardingRef);
            const onboardingData = onboardingSnap.exists() ? onboardingSnap.data() : {};
            
            usersList.push({
              id: userDoc.id,
              email: userData.email || userDoc.id,
              name: userData.name,
              role: onboardingData.role,
              age: onboardingData.age,
              verified: userData.verified,
              isAdmin: userData.isAdmin === true,
              createdAt: userData.createdAt,
            });
          }
          
          setUsers(usersList);
        }
      } else {
        // Mode démo
        setUsers([
          {
            id: "1",
            email: "user1@example.com",
            name: "John Doe",
            role: "Étudiant",
            age: "25",
            verified: true,
            isAdmin: false,
          },
          {
            id: "2",
            email: "user2@example.com",
            name: "Jane Smith",
            role: "Professionnel",
            age: "30",
            verified: true,
            isAdmin: false,
          },
        ]);
      }
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleAdmin = async (userId: string, currentAdminStatus: boolean) => {
    const action = currentAdminStatus ? "rétrograder" : "promouvoir";
    if (!confirm(`Êtes-vous sûr de vouloir ${action} cet utilisateur ${currentAdminStatus ? "de" : "en"} admin ?`)) {
      return;
    }

    try {
      if (isFirebaseEnabled) {
        const { db: fbDb } = await initializeFirebase();
        if (fbDb) {
          const { doc, updateDoc, setDoc, serverTimestamp } = await import('firebase/firestore');
          const userRef = doc(fbDb, "users", userId);
          
          // Vérifier si le document existe, sinon le créer
          const { getDoc } = await import('firebase/firestore');
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            await updateDoc(userRef, {
              isAdmin: !currentAdminStatus,
              updatedAt: serverTimestamp(),
            });
          } else {
            // Créer le document si il n'existe pas
            const user = users.find(u => u.id === userId);
            await setDoc(userRef, {
              email: user?.email || '',
              name: user?.name || null,
              verified: user?.verified || false,
              isAdmin: !currentAdminStatus,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });
          }
          
          // Si c'est l'utilisateur actuel, rafraîchir ses données
          if (currentUser?.uid === userId) {
            await refreshUser();
          }
          
          loadUsers();
        }
      } else {
        setUsers(users.map(u => 
          u.id === userId ? { ...u, isAdmin: !currentAdminStatus } : u
        ));
      }
    } catch (error) {
      console.error("Error toggling admin status:", error);
      alert("Erreur lors de la modification du statut admin");
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      return;
    }

    try {
      if (isFirebaseEnabled) {
        const { db: fbDb } = await initializeFirebase();
        if (fbDb) {
          const { doc, deleteDoc } = await import('firebase/firestore');
          await deleteDoc(doc(fbDb, "users", userId));
          await deleteDoc(doc(fbDb, "onboardings", userId));
          loadUsers();
        }
      } else {
        setUsers(users.filter((u) => u.id !== userId));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Erreur lors de la suppression de l'utilisateur");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Utilisateurs</h1>
          <p className="text-gray-600 mt-1">Gérer tous les utilisateurs de la plateforme</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Rechercher un utilisateur..."
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
        ) : filteredUsers.length === 0 ? (
          <div className="p-8 text-center text-gray-600">Aucun utilisateur trouvé</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Âge</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell>{user.name || "-"}</TableCell>
                  <TableCell>{user.role || "-"}</TableCell>
                  <TableCell>{user.age || "-"}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.verified
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user.verified ? "Vérifié" : "Non vérifié"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${
                        user.isAdmin
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.isAdmin ? (
                        <>
                          <Shield className="w-3 h-3" />
                          Admin
                        </>
                      ) : (
                        "User"
                      )}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleToggleAdmin(user.id, user.isAdmin || false)}
                        >
                          {user.isAdmin ? (
                            <>
                              <ShieldOff className="w-4 h-4 mr-2" />
                              Retirer les droits admin
                            </>
                          ) : (
                            <>
                              <Shield className="w-4 h-4 mr-2" />
                              Promouvoir admin
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="text-sm text-gray-600">
        Total: {filteredUsers.length} utilisateur{filteredUsers.length > 1 ? "s" : ""}
      </div>
    </div>
  );
}

