import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Jobs from "@/pages/Jobs";
import Dashboard from "@/pages/Dashboard";
import FAQs from "./pages/FAQs";
import ViewJob from "@/pages/ViewJob";
import Applications from "@/pages/Applications";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/jobs/:slug" element={<ViewJob />} />
        <Route path="/my-applications" element={<Applications />} />
      </Routes>
    </Router>
  );
}

export default App;
