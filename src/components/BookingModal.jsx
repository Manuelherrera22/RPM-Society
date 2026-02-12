import React from 'react';
import { X, Calendar, MessageSquare, Send } from 'lucide-react';
import './BookingModal.css';

import { supabase } from '../supabaseClient';

const BookingModal = ({ isOpen, onClose, carName }) => {
    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const bookingData = {
            full_name: formData.get('fullName'),
            email: formData.get('email'),
            preferred_date: formData.get('date'),
            special_requests: formData.get('message'),
            car_name: carName || 'General Inquiry'
        };

        try {
            const { error } = await supabase
                .from('bookings')
                .insert([bookingData]);

            if (error) throw error;

            alert(`Request sent successfully for ${bookingData.car_name}! We will contact you shortly.`);
            onClose();
        } catch (error) {
            console.error('Error submitting booking:', error);
            alert('There was an error sending your request. Please try again.');
        }
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
                        <input type="text" name="fullName" placeholder="John Doe" required />
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" placeholder="john@example.com" required />
                    </div>

                    <div className="form-group">
                        <label><Calendar size={14} /> Preferred Date</label>
                        <input type="date" name="date" required />
                    </div>

                    <div className="form-group">
                        <label><MessageSquare size={14} /> Special Requests</label>
                        <textarea name="message" placeholder="Tell us about your trip..." rows="4"></textarea>
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
