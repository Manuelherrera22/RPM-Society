import React from 'react';
import { Shield, Star, Key } from 'lucide-react';
import './Services.css';

const Services = () => {
    return (
        <section className="services" id="services">
            <div className="section-header">
                <span className="section-subtitle">Why Choose Us</span>
                <h2 className="section-title">The <span className="gold-text">Experience</span></h2>
            </div>

            <div className="services-container">
                <div className="service-card">
                    <div className="icon-box">
                        <Key size={32} />
                    </div>
                    <h3>White Glove Delivery</h3>
                    <p>We deliver your vehicle directly to your doorstep, airport, or hotel, ensuring a seamless start to your journey.</p>
                </div>

                <div className="service-card highlight">
                    <div className="icon-box">
                        <Star size={32} />
                    </div>
                    <h3>Concierge Service</h3>
                    <p>Our dedicated team is available 24/7 to assist with itineraries, reservations, and bespoke requests.</p>
                </div>

                <div className="service-card">
                    <div className="icon-box">
                        <Shield size={32} />
                    </div>
                    <h3>Comprehensive Coverage</h3>
                    <p>Drive with peace of mind knowing every rental includes premium insurance and roadside assistance.</p>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                <a href="/faq" className="secondary-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
                    View Common Questions
                </a>
            </div>
        </section>
    );
};

export default Services;
