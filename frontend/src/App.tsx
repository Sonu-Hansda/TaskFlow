import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
// import { KanbanPage } from "./pages/KanbanPage";
// import { MyTasksPage } from "./pages/MyTasksPage";
// import { TeamPage } from "./pages/TeamPage";
// import { ProfilePage } from "./pages/ProfilePage";
// import { LoginPage } from "./pages/LoginPage";
// import { SignupPage } from "./pages/SignupPage";
// import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} /> */}
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/kanban" element={<KanbanPage />} />
          <Route path="/tasks" element={<MyTasksPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;