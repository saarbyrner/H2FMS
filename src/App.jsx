import { Routes, Route } from 'react-router-dom'
import LayoutWithMainNav from './components/LayoutWithMainNav'
import SimplePage from './pages/SimplePage'
import Soldiers from './pages/Soldiers'
import CalendarPage from './pages/Calendar'
// Nutrition pages
import NutritionDashboard from './features/nutrition/pages/Dashboard'
// Psychological pages
import PsychologicalDashboard from './features/psychological/pages/Dashboard'
// Physical pages
import PhysicalDashboard from './features/physical/pages/Dashboard'
// Medical pages
import MedicalDashboard from './features/medical/pages/Dashboard'
// Analysis pages
import AnalysisDashboard from './features/analysis/pages/Dashboard'
// Forms pages
import FormsDashboard from './features/forms/pages/Dashboard'
// Media pages
import MediaDashboard from './features/media/pages/Dashboard'
// Settings pages
import SettingsDashboard from './features/settings/pages/Dashboard'

function App() {
  return (
    <LayoutWithMainNav>
      <Routes>
        <Route path="/" element={<SimplePage pageName="Home" />} />
        <Route path="/dashboard" element={<SimplePage pageName="Dashboard" />} />
        <Route path="/medical" element={<MedicalDashboard />} />
        <Route path="/analysis" element={<AnalysisDashboard />} />
        <Route path="/soldier" element={<Soldiers />} />
        <Route path="/questionnaires" element={<FormsDashboard />} />
  <Route path="/planning" element={<CalendarPage />} />
  {/* Nutrition Routes */}
  <Route path="/nutrition" element={<NutritionDashboard />} />
  {/* Psychological Routes (ALL MOCK DATA) */}
  <Route path="/psychological" element={<PsychologicalDashboard />} />
  {/* Physical Routes (ALL MOCK DATA) */}
  <Route path="/physical" element={<PhysicalDashboard />} />
        <Route path="/media" element={<MediaDashboard />} />
        <Route path="/activity" element={<SimplePage pageName="Activity log" />} />
        <Route path="/settings" element={<SettingsDashboard />} />
        <Route path="/help" element={<SimplePage pageName="Help" />} />
      </Routes>
    </LayoutWithMainNav>
  )
}

export default App