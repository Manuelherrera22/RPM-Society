import React from 'react';

const About = () => {
    return (
        <div style={{ paddingTop: '8rem', paddingBottom: '4rem', paddingLeft: '2rem', paddingRight: '2rem', minHeight: '80vh', background: 'var(--color-black)', color: 'var(--color-white)', maxWidth: '1000px', margin: '0 auto' }}>
            <h1 className="section-title">About <span className="gold-text">RPM Society</span></h1>
            <p style={{ marginTop: '2rem', lineHeight: '1.8', fontSize: '1.1rem', color: 'var(--color-gray-light)' }}>
                Founded on the principles of excellence and exclusivity, RPM Society is not just a rental service—we are curators of automotive experiences.
                Our mission is to provide discerning individuals with access to the world's most coveted machinery, paired with white-glove service that anticipates every need.
            </p>
            <p style={{ marginTop: '1.5rem', lineHeight: '1.8', fontSize: '1.1rem', color: 'var(--color-gray-light)' }}>
                From the moment you inquire to the final mile of your journey, we ensure perfection.
                We believe that driving is an art form, and our fleet is the palette.
            </p>
        </div>
    );
};

export default About;
