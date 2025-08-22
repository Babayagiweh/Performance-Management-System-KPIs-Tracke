import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleSelector } from "@/components/RoleSelector";
import { Layout } from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
import Goals from "./pages/Goals";
import KPIs from "./pages/KPIs";
import TeamPerformance from "./pages/TeamPerformance";
import PerformanceReviews from "./pages/PerformanceReviews";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<{ role: string; name: string } | null>(null);

  const handleRoleSelect = (role: string, name: string) => {
    setUser({ role, name });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <RoleSelector onRoleSelect={handleRoleSelect} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout userRole={user.role} userName={user.name} onLogout={handleLogout}>
            <Routes>
              <Route path="/" element={<Dashboard userRole={user.role} userName={user.name} />} />
              <Route path="/goals" element={<Goals userRole={user.role} userName={user.name} />} />
              <Route path="/kpis" element={<KPIs userRole={user.role} userName={user.name} />} />
              <Route path="/team" element={<TeamPerformance userRole={user.role} userName={user.name} />} />
              <Route path="/reviews" element={<PerformanceReviews userRole={user.role} userName={user.name} />} />
              <Route path="/analytics" element={<Analytics userRole={user.role} userName={user.name} />} />
              <Route path="/employees" element={<div className="p-8 text-center">Employees page coming soon...</div>} />
              <Route path="/reports" element={<div className="p-8 text-center">Reports page coming soon...</div>} />
              <Route path="/settings" element={<div className="p-8 text-center">Settings page coming soon...</div>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
