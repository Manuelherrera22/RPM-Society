import React from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import './Hero.css';
import heroImage from '../assets/hero-cadillac.jpg';
import { Link } from 'react-router-dom';

const Hero = ({ onBookNow }) => {
    return (
        <header className="hero" id="home">
            <div className="hero-background">
                <img src="/Cadillac Escalade 2026.png" alt="Luxury Car" />
                <div className="overlay"></div>
            </div>

            <div className="hero-content">
                <span className="subtitle">Experience Excellence</span>
                <h1 className="title">Drive the <span className="highlight">Extraordinary</span></h1>
                <p className="description">
                    Unleash the power of the world's most exclusive fleet.
                    Defined by performance, designed for distinction.
                </p>

                <div className="cta-group">
                    <Link to="/fleet" className="primary-btn">
                        View Fleet <ArrowRight size={20} />
                    </Link>
                    <a href="tel:+17872253222" className="secondary-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        Call to Reserve
                    </a>
                </div>
            </div>

            <div className="scroll-indicator">
                <span>Scroll to Explore</span>
                <ChevronDown className="bounce" size={24} />
            </div>
        </header>
    );
};

export default Hero;
