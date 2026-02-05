import React from 'react';
import FleetGrid from '../components/FleetGrid';

const Fleet = () => {
    return (
        <div style={{ paddingTop: '6rem', minHeight: '100vh', background: 'var(--color-black)' }}>
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <span className="section-subtitle">The Complete Collection</span>
                <h2 className="section-title">Our <span className="gold-text">Fleet</span></h2>
            </div>
            <FleetGrid />
        </div>
    );
};

export default Fleet;
