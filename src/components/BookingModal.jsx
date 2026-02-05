import React from 'react';
import { X, Calendar, MessageSquare, Send } from 'lucide-react';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose, carName }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would normally handle form submission
        alert(`Request sent for ${carName || 'General Inquiry'}`);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="modal-header">
                    <h2>Reserve The <span className="gold-text">{carName || 'Experience'}</span></h2>
                    <p>Complete the form below to connect with our concierge.</p>
                </div>

                <form className="booking-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" placeholder="John Doe" required />
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" placeholder="john@example.com" required />
                    </div>

                    <div className="form-group">
                        <label><Calendar size={14} /> Preferred Date</label>
                        <input type="date" required />
                    </div>

                    <div className="form-group">
                        <label><MessageSquare size={14} /> Special Requests</label>
                        <textarea placeholder="Tell us about your trip..." rows="4"></textarea>
                    </div>

                    <button type="submit" className="submit-btn">
                        Submit Request <Send size={16} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
