import React from 'react';
import SEO from '../components/SEO';
import './Legal.css';

const Privacy = () => {
    return (
        <div className="legal-page">
            <SEO
                title="Privacy Policy"
                description="Understand how RPM Society collects, uses, and protects your data."
            />
            <div className="legal-container">
                <h1 className="legal-title">Privacy Policy</h1>
                <p className="legal-updated">Last Updated: February 2026</p>

                <section className="legal-section">
                    <h2>1. Information We Collect</h2>
                    <p>We collect information necessary to provide our luxury rental services, including:</p>
                    <ul>
                        <li>Personal Identification: Name, email, phone number, date of birth.</li>
                        <li>Verification Documents: Driver's license copies, insurance policies.</li>
                        <li>Payment Information: Credit card details (processed securely via third-party providers).</li>
                        <li>Vehicle Data: GPS location and telemetry data during the rental period for security purposes.</li>
                    </ul>
                </section>

                <section className="legal-section">
                    <h2>2. How We Use Your Information</h2>
                    <p>We use your data to:</p>
                    <ul>
                        <li>Process bookings and verify eligibility.</li>
                        <li>Communicate regarding your reservation or concierge requests.</li>
                        <li>Ensure the security of our fleet via GPS tracking.</li>
                        <li>Improve our services and customer experience.</li>
                    </ul>
                </section>

                <section className="legal-section">
                    <h2>3. Data Sharing</h2>
                    <p>
                        We do not sell your personal information. We may share data with trusted third parties only for:
                    </p>
                    <ul>
                        <li>Insurance verification processes.</li>
                        <li>Payment processing.</li>
                        <li>Legal compliance if required by law enforcement.</li>
                    </ul>
                </section>

                <section className="legal-section">
                    <h2>4. Digital Inspections</h2>
                    <p>
                        Photos and data collected during vehicle inspections are stored securely to document the condition of our assets.
                        These records may be shared with insurance providers in the event of a claim.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>5. Security</h2>
                    <p>
                        We implement industry-standard security measures to protect your personal information.
                        However, no method of transmission over the internet is 100% secure.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>6. Contact Us</h2>
                    <p>
                        If you have questions about our privacy practices, please reach out to privacy@rpmsociety.com.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Privacy;
