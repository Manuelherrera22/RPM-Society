import React from 'react';
import { ArrowUpRight, Gauge, Timer, DollarSign } from 'lucide-react';
import './FleetGrid.css';
import lamborghini from '../assets/lamborghini.png';
import ferrari from '../assets/ferrari.png';
import mclaren from '../assets/mclaren.png';
import porsche from '../assets/porsche.png';
import rolls from '../assets/rolls.png';
import aston from '../assets/aston.png';
import cadillac from '../assets/hero-cadillac.jpg';

const fleet = [
    {
        id: 1,
        name: "Cadillac Escalade ESV 2026",
        brand: "Cadillac",
        price: "400",
        speed: "5.9s",
        power: "420 HP",
        image: cadillac,
        hidden: false,
        mileage: "100 miles included",
        extraMile: "$3.00",
        deposit: "$1,000 security deposit"
    },
    {
        id: 2,
        name: "Coming Soon",
        brand: "Secret",
        price: "---",
        speed: "---",
        power: "---",
        image: ferrari,
        hidden: true
    },
    {
        id: 3,
        name: "Coming Soon",
        brand: "Secret",
        price: "---",
        speed: "---",
        power: "---",
        image: mclaren,
        hidden: true
    },
    {
        id: 4,
        name: "Coming Soon",
        brand: "Secret",
        price: "---",
        speed: "---",
        power: "---",
        image: porsche,
        hidden: true
    },
    {
        id: 5,
        name: "Coming Soon",
        brand: "Secret",
        price: "---",
        speed: "---",
        power: "---",
        image: rolls,
        hidden: true
    },
    {
        id: 6,
        name: "Coming Soon",
        brand: "Secret",
        price: "---",
        speed: "---",
        power: "---",
        image: aston,
        hidden: true
    }
];

const FleetGrid = ({ limit }) => {
    const displayFleet = limit ? fleet.slice(0, limit) : fleet;

    return (
        <section className="fleet-section" id="fleet">
            <div className="section-header">
                {!limit && <span className="section-subtitle">Our Collection</span>}
                {!limit && <h2 className="section-title">The <span className="gold-text">Fleet</span></h2>}
            </div>

            <div className="fleet-grid">
                {displayFleet.map((car) => (
                    <div key={car.id} className="car-card">
                        <div className={`card-image ${car.hidden ? 'blur-effect' : ''}`}>
                            <img src={car.image} alt={car.name} />
                            {car.hidden && (
                                <div className="card-overlay">
                                    <span className="book-btn-card">Locked</span>
                                </div>
                            )}
                        </div>

                        <div className="card-content">
                            <div className="card-header">
                                <span className="brand">{car.brand}</span>
                                <h3 className="model">{car.name}</h3>
                            </div>

                            {!car.hidden ? (
                                <>
                                    <div className="price-section">
                                        <span className="currency">$</span>
                                        <span className="price-value">{car.price}</span>
                                        <span className="price-period">/day</span>
                                    </div>

                                    <div className="divider"></div>

                                    <div className="specs-row">
                                        <div className="spec-item economy-spec">
                                            <Timer size={14} className="spec-icon-gold" />
                                            <span className="spec-label">0-60: {car.speed}</span>
                                        </div>
                                        <div className="spec-item power-spec">
                                            <Gauge size={14} className="spec-icon-gold" />
                                            <span className="spec-label">{car.power}</span>
                                        </div>
                                    </div>

                                    {car.mileage && (
                                        <div className="rental-terms">
                                            <p>{car.mileage}</p>
                                            <div className="term-row">
                                                <span>Additional mile {car.extraMile}</span>
                                            </div>
                                            <div className="term-row">
                                                <span>{car.deposit}</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="card-footer-centered">
                                        <a href="tel:+17872253222" className="view-details-link">
                                            VIEW DETAILS <ArrowUpRight size={14} />
                                        </a>
                                    </div>
                                </>
                            ) : (
                                <div className="locked-content">
                                    <p>Details Coming Soon</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FleetGrid;
