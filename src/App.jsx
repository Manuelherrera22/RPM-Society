import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import Home from './pages/Home'
import Fleet from './pages/Fleet'
import About from './pages/About'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import FAQPage from './pages/FAQPage'
import ServicesPage from './pages/ServicesPage'
import InspectionPage from './pages/InspectionPage'
import InspectionReport from './pages/InspectionReport'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import AdminDashboard from './pages/AdminDashboard'
import CookieConsent from './components/CookieConsent'
import './App.css'

function AppContent() {
    const location = useLocation();
    const isReportPage = location.pathname.startsWith('/report/');
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="app">
            {!isReportPage && <Navbar onBookNow={() => setIsModalOpen(true)} />}
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/fleet" element={<Fleet />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/inspection" element={<InspectionPage />} />
                    <Route path="/report/:id" element={<InspectionReport />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
            </main>
            {!isReportPage && <Footer />}
            <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <CookieConsent />
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    )
}

export default App;
