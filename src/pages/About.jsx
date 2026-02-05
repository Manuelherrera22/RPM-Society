import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
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
    );
};

export default About;
