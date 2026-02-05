import React from 'react';
import { Quote } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
    {
        id: 1,
        text: "The level of service provided by RPM Society is unparalleled. The Revuelto was in pristine condition and the delivery was seamless.",
        author: "James Sterling",
        role: "CEO, Sterling Tech",
        location: "Beverly Hills, CA"
    },
    {
        id: 2,
        text: "I've rented from many luxury services, but none compare to the attention to detail here. The concierge team made our anniversary unforgettable.",
        author: "Elena Rodriguez",
        role: "Fashion Director",
        location: "Miami, FL"
    },
    {
        id: 3,
        text: "Driving the Valhalla was a dream come true. RPM Society made the entire process effortless and exclusive.",
        author: "Michael Chang",
        role: "Venture Capitalist",
        location: "San Francisco, CA"
    }
];

const Testimonials = () => {
    return (
        <section className="testimonials" id="reviews">
            <div className="section-header">
                <span className="section-subtitle">The Society</span>
                <h2 className="section-title">Member <span className="gold-text">Stories</span></h2>
            </div>

            <div className="testimonials-grid">
                {testimonials.map((item) => (
                    <div key={item.id} className="testimonial-card">
                        <Quote className="quote-icon" size={40} />
                        <p className="testimonial-text">"{item.text}"</p>
                        <div className="testimonial-author">
                            <div className="author-info">
                                <h4>{item.author}</h4>
                                <span>{item.role}</span>
                                <small>{item.location}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
