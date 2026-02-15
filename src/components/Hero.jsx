import React from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import './Hero.css';
import heroImage from '../assets/hero-cadillac.jpg';
import { Link } from 'react-router-dom';

const Hero = ({ onBookNow }) => {
    return (
        <header className="hero" id="home">
            <div className="hero-background">
                <img src={heroImage} alt="Luxury Car" />
                <div className="overlay"></div>
            </div>

            <div className="hero-content">
                <span className="subtitle">Experience Excellence</span>
                <h1 className="title">Driven by presence. Defined by <span className="highlight">Luxury</span></h1>
                <p className="description">
                    RPM Society delivers memorable luxury experiences. Whether for travel, events, or everyday life.
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
