import React from 'react';
import { ArrowUpRight, Gauge, Timer, DollarSign } from 'lucide-react';
import './FleetGrid.css';
import lamborghini from '../assets/lamborghini.png';
import ferrari from '../assets/ferrari.png';
import mclaren from '../assets/mclaren.png';
import porsche from '../assets/porsche.png';
import rolls from '../assets/rolls.png';
import aston from '../assets/aston.png';

const fleet = [
    {
        id: 1,
        name: "Lamborghini Revuelto",
        brand: "Lamborghini",
        price: "2,500",
        speed: "2.5s",
        power: "1001 HP",
        image: lamborghini
    },
    {
        id: 2,
        name: "Ferrari SF90 Stradale",
        brand: "Ferrari",
        price: "2,800",
        speed: "2.5s",
        power: "986 HP",
        image: ferrari
    },
    {
        id: 3,
        name: "McLaren 765LT",
        brand: "McLaren",
        price: "2,200",
        speed: "2.7s",
        power: "755 HP",
        image: mclaren
    },
    {
        id: 4,
        name: "Porsche 911 GT3 RS",
        brand: "Porsche",
        price: "1,800",
        speed: "3.0s",
        power: "518 HP",
        image: porsche
    },
    {
        id: 5,
        name: "Rolls Royce Spectre",
        brand: "Rolls Royce",
        price: "3,000",
        speed: "4.4s",
        power: "577 HP",
        image: rolls
    },
    {
        id: 6,
        name: "Aston Martin Valhalla",
        brand: "Aston Martin",
        price: "3,500",
        speed: "2.5s",
        power: "937 HP",
        image: aston
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
                        <div className="card-image">
                            <img src={car.image} alt={car.name} />
                            <div className="card-overlay">
                                <a href="tel:+17872253222" className="book-btn-card">Call to Reserve</a>
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
