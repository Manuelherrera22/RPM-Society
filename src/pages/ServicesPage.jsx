import React from 'react';
import Services from '../components/Services';

const ServicesPage = () => {
    return (
        <div style={{ paddingTop: '0', minHeight: '100vh', background: 'var(--color-black)' }}>
            {/* Component has its own padding, just need container bg */}
            <Services />
        </div>
    );
};

export default ServicesPage;
