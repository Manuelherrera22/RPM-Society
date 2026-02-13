import React, { useState } from 'react';
import Hero from '../components/Hero';
import FleetGrid from '../components/FleetGrid';
import FAQ from '../components/FAQ';
import BookingModal from '../components/BookingModal';
import SEO from '../components/SEO';

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <SEO
                title="Home"
                description="Welcome to RPM Society. Rent the world's most exclusive luxury and exotic cars in Sebastian, FL."
            />
            <Hero onBookNow={() => setIsModalOpen(true)} />
            <div className="section-header" style={{ paddingTop: '5rem', background: 'var(--color-black)' }}>
                <h2 className="section-title" style={{ textAlign: 'center' }}>Featured <span className="gold-text">Collection</span></h2>
            </div>
            {/* Show a glimpse of the fleet or full grid? User said "seen as what we have" */}
            <FleetGrid limit={3} />
            <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default Home;
