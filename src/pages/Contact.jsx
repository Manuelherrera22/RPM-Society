import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-page">
            <div className="contact-container">
                <div className="contact-info">
                    <h1>Get in <span className="gold-text">Touch</span></h1>
                    <span className="subtitle">
                        Experience the exceptional. Whether you have a specific request or prefer to discuss your needs with our concierge, we are at your service.
                    </span>

                    <div className="info-item">
                        <div className="info-icon">
                            <Phone size={20} />
                        </div>
                        <div className="info-content">
                            <h3>Private Concierge</h3>
                            <p>+1 (787) 225-3222</p>
                            <p style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: '0.2rem' }}>Available 24/7 for members</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <div className="info-icon">
                            <Mail size={20} />
                        </div>
                        <div className="info-content">
                            <h3>Email Inquiries</h3>
                            <p>concierge@rpmsociety.com</p>
                            <p>press@rpmsociety.com</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <div className="info-icon">
                            <MapPin size={20} />
                        </div>
                        <div className="info-content">
                            <h3>Headquarters</h3>
                            <p>9465 Wilshire Blvd, Suite 300</p>
                            <p>Beverly Hills, CA 90212</p>
                        </div>
                    </div>
                </div>

                <div className="contact-form-container">
                    <h2>Send a Message</h2>
                    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" placeholder="Enter your name" />
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" placeholder="Enter your email" />
                        </div>

                        <div className="form-group">
                            <label>Subject</label>
                            <input type="text" placeholder="Inquiry regarding..." />
                        </div>

                        <div className="form-group">
                            <label>Message</label>
                            <textarea rows="5" placeholder="How can we assist you today?"></textarea>
                        </div>

                        <button type="submit" className="send-btn">
                            Send Request <Send size={16} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
