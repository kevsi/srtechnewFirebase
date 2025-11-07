import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/components/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Work from "./pages/Work";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import WorkCase from "./pages/WorkCase";
import Evenements from "./pages/Evenements";
import EvenementDetail from "./pages/EvenementDetail";
import MigrateEvents from "./pages/MigrateEvents";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";
import WorkDetail from "./pages/WorkDetail";
import AdminWrapper from "./pages/admin/AdminWrapper";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminEvents from "./pages/admin/Events";
import AdminSettings from "./pages/admin/Settings";
import AdminServices from "./pages/admin/Services";
import AdminWorks from "./pages/admin/Works";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<WorkDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/evenements" element={<Evenements />} />
            <Route path="/evenements/:id" element={<EvenementDetail />} />
            <Route path="/migrate-events" element={<MigrateEvents />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/onboarding" element={<Onboarding />} />
            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <AdminWrapper>
                  <AdminDashboard />
                </AdminWrapper>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminWrapper>
                  <AdminUsers />
                </AdminWrapper>
              }
            />
            <Route
              path="/admin/events"
              element={
                <AdminWrapper>
                  <AdminEvents />
                </AdminWrapper>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <AdminWrapper>
                  <AdminSettings />
                </AdminWrapper>
              }
            />
            <Route
              path="/admin/services"
              element={
                <AdminWrapper>
                  <AdminServices />
                </AdminWrapper>
              }
            />
            <Route
              path="/admin/works"
              element={
                <AdminWrapper>
                  <AdminWorks />
                </AdminWrapper>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
