import { useAuth } from "@/components/AuthContext";
import { Users, Calendar, TrendingUp, Activity } from "lucide-react";
import { useEffect, useState } from "react";
import { isFirebaseEnabled, initializeFirebase } from "@/lib/firebase";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    activeUsers: 0,
    totalOnboardings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        if (isFirebaseEnabled) {
          const { db: fbDb } = await initializeFirebase();
          if (fbDb) {
            const { collection, getDocs } = await import('firebase/firestore');
            
            // Compter les utilisateurs
            const usersRef = collection(fbDb, "users");
            const usersSnap = await getDocs(usersRef);
            
            // Compter les événements
            const eventsRef = collection(fbDb, "events");
            const eventsSnap = await getDocs(eventsRef);
            
            // Compter les onboardings
            const onboardingsRef = collection(fbDb, "onboardings");
            const onboardingsSnap = await getDocs(onboardingsRef);

            setStats({
              totalUsers: usersSnap.size,
              totalEvents: eventsSnap.size,
              activeUsers: onboardingsSnap.size,
              totalOnboardings: onboardingsSnap.size,
            });
          }
        } else {
          // Mode démo
          setStats({
            totalUsers: 42,
            totalEvents: 8,
            activeUsers: 35,
            totalOnboardings: 35,
          });
        }
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const statCards = [
    {
      title: "Utilisateurs totaux",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-blue-500",
      change: "+12%",
    },
    {
      title: "Événements",
      value: stats.totalEvents,
      icon: Calendar,
      color: "bg-green-500",
      change: "+5",
    },
    {
      title: "Utilisateurs actifs",
      value: stats.activeUsers,
      icon: Activity,
      color: "bg-purple-500",
      change: "+8%",
    },
    {
      title: "Onboardings",
      value: stats.totalOnboardings,
      icon: TrendingUp,
      color: "bg-orange-500",
      change: "+15%",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Bienvenue, {user?.name || user?.email}</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-6 border border-gray-200 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm text-green-600 font-medium">
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Activité récente</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Nouvel utilisateur inscrit</p>
              <p className="text-sm text-gray-600">Il y a 2 heures</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Nouvel événement créé</p>
              <p className="text-sm text-gray-600">Il y a 5 heures</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Activity className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Utilisateur actif</p>
              <p className="text-sm text-gray-600">Il y a 1 jour</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

