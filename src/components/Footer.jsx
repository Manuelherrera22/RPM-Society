import React from 'react';
import { Instagram, Facebook, Twitter, MapPin, Mail, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer" id="contact">
            <div className="footer-content">
                <div className="footer-brand">
                    <h2 className="footer-logo">RPM SOCIETY</h2>
                    <p>Elevating your journey with the world's most exclusive fleet.</p>
                </div>

                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#fleet">Fleet</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#about">About Us</a></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h3>Contact</h3>
                    <div className="contact-item">
                        <MapPin size={18} />
                        <span>1234 Luxury Ave, Beverly Hills, CA</span>
                    </div>
                    <div className="contact-item">
                        <Phone size={18} />
                        <span>+1 (787) 225-3222</span>
                    </div>
                    <div className="contact-item">
                        <Mail size={18} />
                        <span>concierge@rpmsociety.com</span>
                    </div>
                </div>

                <div className="footer-social">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="#"><Instagram size={24} /></a>
                        <a href="#"><Facebook size={24} /></a>
                        <a href="#"><Twitter size={24} /></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 RPM Society. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
