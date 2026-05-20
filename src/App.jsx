import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import LandingScreen from './pages/LandingScreen'
import LoginScreen from './pages/LoginScreen'
import SignupScreen from './pages/SignupScreen'
import ProfileScreen from './pages/ProfileScreen'

function AppContent() {
  const location = useLocation()

  return (
    <div className="phone-frame">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
