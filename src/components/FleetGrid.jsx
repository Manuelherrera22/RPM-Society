import React from 'react';
import { ArrowUpRight, Gauge, Timer, DollarSign } from 'lucide-react';
import './FleetGrid.css';
import lamborghini from '../assets/lamborghini.png';
import ferrari from '../assets/ferrari.png';
import mclaren from '../assets/mclaren.png';
import porsche from '../assets/porsche.png';
import rolls from '../assets/rolls.png';
import aston from '../assets/aston.png';
import cadillac from '../assets/hero-cadillac.png';

const fleet = [
    {
        id: 1,
        name: "Cadillac Escalade 2026",
        brand: "Cadillac",
        price: "1,500", // Estimation/Placeholder
        speed: "4.4s",
        power: "682 HP",
        image: cadillac,
        hidden: false
    },
    {
        id: 2,
        name: "Próximamente",
        brand: "Secret",
        price: "---",
        speed: "---",
        power: "---",
        image: ferrari,
        hidden: true
    },
    {
        id: 3,
        name: "Próximamente",
        brand: "Secret",
        price: "---",
        speed: "---",
        power: "---",
        image: mclaren,
        hidden: true
    },
    {
        id: 4,
        name: "Próximamente",
        brand: "Secret",
        price: "---",
        speed: "---",
        power: "---",
        image: porsche,
        hidden: true
    },
    {
        id: 5,
        name: "Próximamente",
        brand: "Secret",
        price: "---",
        speed: "---",
        power: "---",
        image: rolls,
        hidden: true
    },
    {
        id: 6,
        name: "Próximamente",
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
                            <div className="card-overlay">
                                {car.hidden ? (
                                    <span className="book-btn-card">Locked</span>
                                ) : (
                                    <a href="tel:+17872253222" className="book-btn-card">Call to Reserve</a>
                                )}
                            </div>
                        </div>

                        <div className="card-content">
                            <div className="card-header">
                                <span className="brand">{car.brand}</span>
                                <h3 className="model">{car.name}</h3>
                            </div>

                            <div className="specs-grid">
                                <div className="spec-item">
                                    <DollarSign size={16} className="spec-icon" />
                                    <span>${car.price}/day</span>
                                </div>
                                <div className="spec-item">
                                    <Timer size={16} className="spec-icon" />
                                    <span>0-60: {car.speed}</span>
                                </div>
                                <div className="spec-item">
                                    <Gauge size={16} className="spec-icon" />
                                    <span>{car.power}</span>
                                </div>
                            </div>

                            <div className="card-footer">
                                <span className="details-link">View Details <ArrowUpRight size={16} /></span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FleetGrid;
