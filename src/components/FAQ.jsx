import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import './FAQ.css';

const faqs = [
    {
        question: "What are the requirements to rent?",
        answer: "Driver must be at least 25 years old with a valid driver's license and full coverage insurance. A security deposit is also required."
    },
    {
        question: "Do you offer delivery and pickup?",
        answer: "Yes, we offer white-glove delivery and pickup services to your home, office, or airport within our service area."
    },
    {
        question: "Is there a mileage limit?",
        answer: "Most rentals include 100 miles per day. Additional mileage packages are available for purchase."
    },
    {
        question: "Do you accept international licenses?",
        answer: "Yes, we accept valid international driver's licenses along with a passport."
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faq-section" id="faq">
            <div className="section-header">
                <span className="section-subtitle">Information</span>
                <h2 className="section-title">Common <span className="gold-text">Questions</span></h2>
            </div>

            <div className="faq-container">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => toggleAccordion(index)}
                    >
                        <div className="faq-question">
                            <h3>{faq.question}</h3>
                            <span className="icon">
                                {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                            </span>
                        </div>
                        <div className="faq-answer">
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
