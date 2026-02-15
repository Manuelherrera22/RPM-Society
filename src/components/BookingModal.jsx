import React, { useState } from 'react';
import { X, Calendar, Check, AlertCircle } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './BookingModal.css';

const BookingModal = ({ vehicle, isOpen, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    // Fallback if vehicle is not provided
    const targetVehicle = vehicle || { name: "General Inquiry" };

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.target);

        try {
            const bookingData = {
                client_name: formData.get('fullName'),
                client_email: formData.get('email'),
                client_phone: formData.get('phone'),
                car_model: targetVehicle.name,
                start_date: formData.get('startDate'),
                end_date: formData.get('endDate'),
                status: 'pending'
            };

            const { error: dbError } = await supabase
                .from('bookings')
                .insert([bookingData]);

            if (dbError) throw dbError;

            setSuccess(true);
        } catch (err) {
            console.error('Booking error:', err);
            setError('Failed to submit request. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="booking-modal-overlay">
                <div className="booking-modal-content success-view">
                    <button className="modal-close" onClick={onClose}><X size={24} /></button>
                    <div className="success-icon">
                        <Check size={48} />
                    </div>
                    <h2>Request Received</h2>
                    <p>Thank you for choosing the {targetVehicle.name}.</p>
                    <p className="success-message">
                        Our concierge team has received your request. We will contact you shortly at the provided email/phone to coordinate payment and delivery details.
                    </p>
                    <button className="modal-btn" onClick={onClose}>Close</button>
                </div>
            </div>
        );
    }

    return (
        <div className="booking-modal-overlay">
            <div className="booking-modal-content">
                <button className="modal-close" onClick={onClose}><X size={24} /></button>

                <div className="modal-header">
                    <h2>Reserve Vehicle</h2>
                    <p className="vehicle-name">{targetVehicle.name}</p>
                </div>

                {error && <div className="error-message"><AlertCircle size={16} /> {error}</div>}

                <form onSubmit={handleSubmit} className="booking-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" name="fullName" required placeholder="John Doe" />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" required placeholder="john@example.com" />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="tel" name="phone" required placeholder="+1 (555) 000-0000" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Start Date</label>
                            <input type="date" name="startDate" required min={new Date().toISOString().split('T')[0]} />
                        </div>
                        <div className="form-group">
                            <label>End Date</label>
                            <input type="date" name="endDate" required min={new Date().toISOString().split('T')[0]} />
                        </div>
                    </div>

                    <div className="payment-notice">
                        <p><strong>Note:</strong> No immediate payment required. Availability and final payment will be confirmed via concierge.</p>
                    </div>

                    <button type="submit" className="modal-btn submit-btn" disabled={loading}>
                        {loading ? 'Processing...' : 'Submit Request'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
