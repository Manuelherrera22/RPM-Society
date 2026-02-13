import React from 'react';
import { Instagram, Facebook, Twitter, MapPin, Mail, Phone, Shield, Camera } from 'lucide-react';
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
                        <span>241 Faith Terrace, Sebastian FL</span>
                    </div>
                    <div className="contact-item">
                        <Phone size={18} />
                        <div>
                            <span style={{ display: 'block' }}>+1 (360) 932-0132</span>
                            <span style={{ fontSize: '0.9em', opacity: 0.8 }}>+1 (787) 225-3222</span>
                        </div>
                    </div>
                    <div className="contact-item">
                        <Mail size={18} />
                        <span>Rpmsociety07@gmail.com</span>
                    </div>
                </div>

                <div className="footer-links">
                    <h3>Legal & Staff</h3>
                    <ul>
                        <li><a href="/terms">Terms of Service</a></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                    </ul>
                </div>

                <div className="footer-social">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="https://www.instagram.com/rpmsociety07" target="_blank" rel="noopener noreferrer"><Instagram size={24} /></a>
                        <a href="https://www.facebook.com/profile.php?id=61587341997201&ref=PROFILE_EDIT_xav_ig_profile_page_web#" target="_blank" rel="noopener noreferrer"><Facebook size={24} /></a>
                        <a href="#"><Twitter size={24} /></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom" style={{ position: 'relative' }}>
                <p>&copy; 2024 RPM Society. All rights reserved.</p>

                {/* Secret Admin Button (Bottom Right) */}
                <a
                    href="/admin"
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        right: '20px',
                        color: 'var(--color-gold)',
                        opacity: 0.3,
                        transition: 'opacity 0.3s ease',
                        zIndex: 10
                    }}
                    title="Admin"
                    onMouseEnter={(e) => e.target.style.opacity = '1'}
                    onMouseLeave={(e) => e.target.style.opacity = '0.3'}
                >
                    <Shield size={20} />
                </a>

                {/* Secret Inspection Button (Bottom Left) */}
                <a
                    href="/inspection"
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '20px',
                        color: 'var(--color-gold)',
                        opacity: 0.3,
                        transition: 'opacity 0.3s ease',
                        zIndex: 10
                    }}
                    title="Staff Inspection"
                    onMouseEnter={(e) => e.target.style.opacity = '1'}
                    onMouseLeave={(e) => e.target.style.opacity = '0.3'}
                >
                    <Camera size={20} />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
