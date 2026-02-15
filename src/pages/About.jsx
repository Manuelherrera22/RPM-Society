import React from 'react';
import SEO from '../components/SEO';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <SEO
                title="About Us"
                description="Learn about RPM Society's mission to curate automotive experiences with the world's most coveted machinery."
            />
            <div className="about-hero">
                <h1 className="section-title">About <span className="gold-text">RPM Society</span></h1>
                <p className="about-text">
                    Founded on the principles of excellence and exclusivity, RPM Society is not just a rental service—we are curators of automotive experiences.
                    Our mission is to provide discerning individuals with access to the world's most coveted machinery, paired with white-glove service that anticipates every need.
                </p>
                <p className="about-text" style={{ marginTop: '1.5rem' }}>
                    From the moment you inquire to the final mile of your journey, we ensure perfection.
                    We believe that driving is an art form, and our fleet is the palette.
                </p>
            </div>

            <div className="inspection-guarantee-section">
                <h2 className="section-subtitle">Transparency Guarantee</h2>
                <p className="section-intro">
                    To us, your vehicle isn't just an asset—it's a masterpiece of engineering deserving the utmost respect.
                    Our <strong>Digital Inspection System</strong> ensures total transparency.
                </p>

                <div className="process-grid">
                    <div className="process-card">
                        <h3>1. Check-In (Departure)</h3>
                        <p>Step-by-step visual audit.</p>
                        <ul>
                            <li>4-angle exterior + interior photos.</li>
                            <li>Immediate detail logging.</li>
                            <li>Digital client signature.</li>
                            <li>Time and location stamping.</li>
                        </ul>
                    </div>
                    <div className="process-card">
                        <h3>2. Check-Out (Return)</h3>
                        <p>Instant comparison.</p>
                        <ul>
                            <li>Verification against initial photos.</li>
                            <li>Clear change detection.</li>
                            <li>Secure cycle closure.</li>
                        </ul>
                    </div>
                </div>

                <div className="owner-benefit">
                    <h3>Peace of Mind for Owners</h3>
                    <p>
                        We eliminate gray areas. Technology acts as an impartial judge, protecting your asset and ensuring
                        you receive your vehicle exactly as you delivered it.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
