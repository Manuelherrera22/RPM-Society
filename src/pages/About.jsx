import React from 'react';
import SEO from '../components/SEO';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <SEO
                title="About Us"
                description="Learn about RPM Society's mission to curate automotive experiences with the world's most coveted machinery."
            />
            <div className="about-hero">
                <h1 className="section-title">About <span className="gold-text">RPM Society</span></h1>
                <p className="about-text">
                    Founded on the principles of excellence and exclusivity, RPM Society is not just a rental service—we are curators of automotive experiences.
                    Our mission is to provide discerning individuals with access to the world's most coveted machinery, paired with white-glove service that anticipates every need.
                </p>
                <p className="about-text" style={{ marginTop: '1.5rem' }}>
                    From the moment you inquire to the final mile of your journey, we ensure perfection.
                    We believe that driving is an art form, and our fleet is the palette.
                </p>
            </div>

            <div className="inspection-guarantee-section">
                <h2 className="section-subtitle">Garantía de Transparencia</h2>
                <p className="section-intro">
                    Para nosotros, su vehículo no es solo un activo, es una pieza de ingeniería que merece el máximo respeto.
                    Nuestro sistema de <strong>Inspección Digital</strong> garantiza transparencia total.
                </p>

                <div className="process-grid">
                    <div className="process-card">
                        <h3>1. Check-In (Salida)</h3>
                        <p>Auditoría visual paso a paso.</p>
                        <ul>
                            <li>Fotos de 4 ángulos + interior.</li>
                            <li>Registro inmediato de detalles.</li>
                            <li>Firma digital del cliente.</li>
                            <li>Huella de tiempo y ubicación.</li>
                        </ul>
                    </div>
                    <div className="process-card">
                        <h3>2. Check-Out (Retorno)</h3>
                        <p>Comparación instantánea.</p>
                        <ul>
                            <li>Verificación contra fotos iniciales.</li>
                            <li>Detección clara de cambios.</li>
                            <li>Cierre de ciclo seguro.</li>
                        </ul>
                    </div>
                </div>

                <div className="owner-benefit">
                    <h3>Tranquilidad para el Dueño</h3>
                    <p>
                        Eliminamos las áreas grises. La tecnología actúa como juez imparcial, protegiendo su activo y asegurando que
                        reciba su vehículo exactamente como lo entregó.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
