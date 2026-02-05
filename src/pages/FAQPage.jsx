import React from 'react';
import FAQ from '../components/FAQ';

const FAQPage = () => {
    return (
        <div style={{ paddingTop: '6rem', minHeight: '100vh', background: 'var(--color-black)' }}>
            <FAQ />
            <div style={{ textAlign: 'center', paddingBottom: '4rem', color: 'var(--color-gray-light)' }}>
                <p>Have more questions? Contact our concierge team directly.</p>
            </div>
        </div>
    );
};

export default FAQPage;
