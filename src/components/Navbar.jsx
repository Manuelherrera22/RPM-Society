import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/rpm-logo.jpg';

const Navbar = ({ onBookNow }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
        setIsMobileMenuOpen(false);
    }, [location]);

    return (
        <nav className={`navbar ${isScrolled || location.pathname !== '/' ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <Link to="/" className="logo-link">
                    <img src={logo} alt="RPM Society" className="logo-img" />
                </Link>

                <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    <Link to="/">Home</Link>
                    <Link to="/fleet">Fleet</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/about">About</Link>
                    <Link to="/blog">Blog</Link>
                    <Link to="/contact">Contact</Link>
                    <a href="tel:+17872253222" className="book-btn-mobile">Call to Book</a>
                </div>

                <div className="nav-actions">
                    <a href="tel:+17872253222" className="book-btn">Call to Book</a>
                    <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
