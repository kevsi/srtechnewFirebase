import { ReactNode } from "react";
import AdminLayout from "@/components/AdminLayout";
import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";

type AdminWrapperProps = {
  children: ReactNode;
};

export default function AdminWrapper({ children }: AdminWrapperProps) {
  return (
    <ProtectedAdminRoute>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedAdminRoute>
  );
}

