import React from 'react';
import SEO from '../components/SEO';
import './Legal.css';

const Terms = () => {
    return (
        <div className="legal-page">
            <SEO
                title="Terms of Service"
                description="Read the Terms of Service for RPM Society luxury car rentals."
            />
            <div className="legal-container">
                <h1 className="legal-title">Terms of Service</h1>
                <p className="legal-updated">Last Updated: February 2026</p>

                <section className="legal-section">
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using the services provided by RPM Society ("we," "us," or "our"), you agree to be bound by these Terms of Service.
                        If you do not agree to these terms, please do not use our services.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>2. Rental Eligibility</h2>
                    <p>To rent a vehicle from RPM Society, you must:</p>
                    <ul>
                        <li>Be at least 25 years of age.</li>
                        <li>Possess a valid driver's license (international permits required for non-US residents).</li>
                        <li>Provide proof of full-coverage insurance that transfers to rental vehicles.</li>
                        <li>Pass our security and background verification process.</li>
                    </ul>
                </section>

                <section className="legal-section">
                    <h2>3. Vehicle Use and Restrictions</h2>
                    <p>Our vehicles are for personal use only. The following activities are strictly prohibited:</p>
                    <ul>
                        <li>Racing, track use, or any competitive driving.</li>
                        <li>Off-road driving.</li>
                        <li>Sub-leasing or allowing unauthorized drivers.</li>
                        <li>Smoking or consuming illegal substances inside the vehicle.</li>
                    </ul>
                    <p>Violation of these restrictions will result in immediate termination of the rental and forfeiture of the security deposit.</p>
                </section>

                <section className="legal-section">
                    <h2>4. Inspection and Damage</h2>
                    <p>
                        A mandatory digital inspection is conducted before (Check-in) and after (Check-out) every rental.
                        You acknowledge that the findings of these inspections, documented via photos and timestamped logs, are binding.
                        You are responsible for any new damage found upon return that was not documented during Check-in.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>5. Security Deposit</h2>
                    <p>
                        A refundable security deposit is required for all rentals. The amount varies by vehicle tier.
                        This deposit will be returned within 7-14 business days after the vehicle is returned in satisfactory condition.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>6. Limitation of Liability</h2>
                    <p>
                        RPM Society shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or vehicles.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>7. Contact Us</h2>
                    <p>
                        For any questions regarding these terms, please contact us at concierge@rpmsociety.com.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Terms;
