import { ReactNode, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

type ProtectedAdminRouteProps = {
  children: ReactNode;
};

export default function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const adminStatus = useMemo(() => {
    if (!user) return false;
    if (typeof user.isAdmin === "undefined") return undefined;
    return isAdmin();
  }, [user, isAdmin]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (typeof user.isAdmin === "undefined") {
      return;
    }

    if (!isAdmin()) {
      navigate("/");
      return;
    }
  }, [user, isAdmin, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Authentification requise</h1>
          <p className="text-gray-600">Veuillez vous connecter pour accéder à cette page.</p>
        </div>
      </div>
    );
  }

  if (typeof user.isAdmin === "undefined" || adminStatus === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Chargement des permissions...</p>
        </div>
      </div>
    );
  }

  if (!adminStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Accès refusé</h1>
          <p className="text-gray-600">Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

