import React from 'react';
import Services from '../components/Services';
import SEO from '../components/SEO';

const ServicesPage = () => {
    return (
        <div style={{ paddingTop: '0', minHeight: '100vh', background: 'var(--color-black)' }}>
            <SEO
                title="Our Services"
                description="Discover our premium services including chauffeur, event rentals, and film production vehicles."
            />
            {/* Component has its own padding, just need container bg */}
            <Services />
        </div>
    );
};

export default ServicesPage;
