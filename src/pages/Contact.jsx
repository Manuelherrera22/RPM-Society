import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';
import './Contact.css';

import { supabase } from '../supabaseClient';

const Contact = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const contactData = {
            full_name: formData.get('fullName'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        try {
            const { error } = await supabase
                .from('contacts')
                .insert([contactData]);

            if (error) throw error;

            alert('Message sent successfully! Our concierge will request to you shortly.');
            e.target.reset();
        } catch (error) {
            console.error('Error submitting contact form:', error);
            alert('Failed to send message. Please try again later.');
        }
    };

    return (
        <div className="contact-page">
            <SEO
                title="Contact Us"
                description="Get in touch with RPM Society for inquiries, private concierge services, or press relations."
            />
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
                            <p className="primary-phone" style={{ fontWeight: 'bold', color: '#d4af37' }}>+1 (360) 932-0132</p>
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
                            <p>Rpmsociety07@gmail.com</p>
                            <p>concierge@rpmsociety.com</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <div className="info-icon">
                            <MapPin size={20} />
                        </div>
                        <div className="info-content">
                            <h3>Headquarters</h3>
                            <p>241 Faith Terrace, Sebastian FL</p>
                        </div>
                    </div>
                </div>

                <div className="contact-form-container">
                    <h2>Send a Message</h2>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" name="fullName" placeholder="Enter your name" required />
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" name="email" placeholder="Enter your email" required />
                        </div>

                        <div className="form-group">
                            <label>Subject</label>
                            <input type="text" name="subject" placeholder="Inquiry regarding..." />
                        </div>

                        <div className="form-group">
                            <label>Message</label>
                            <textarea name="message" rows="5" placeholder="How can we assist you today?" required></textarea>
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
