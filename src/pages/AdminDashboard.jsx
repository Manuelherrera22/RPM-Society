import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import SEO from '../components/SEO';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('bookings');

    // Data States
    const [bookings, setBookings] = useState([]);
    const [inspections, setInspections] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Simple Auth (Passcode: RPM2026)
    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'RPM2026') {
            setIsAuthenticated(true);
            fetchData();
        } else {
            alert('Access Denied');
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const { data: bookingsData } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
            const { data: inspectionsData } = await supabase.from('inspections').select('*').order('created_at', { ascending: false });
            const { data: contactsData } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });

            if (bookingsData) setBookings(bookingsData);
            if (inspectionsData) setInspections(inspectionsData);
            if (contactsData) setContacts(contactsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-login-container">
                <div className="login-box">
                    <h2>Staff Access</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="Enter Passcode"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">Unlock Dashboard</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <SEO title="RPM Ops Center" description="Staff access only." />
            <header className="admin-header">
                <h1>RPM Society <span className="gold-text">Ops Center</span></h1>
                <button onClick={() => setIsAuthenticated(false)} className="logout-btn">Logout</button>
            </header>

            <div className="admin-tabs">
                <button className={activeTab === 'bookings' ? 'active' : ''} onClick={() => setActiveTab('bookings')}>Bookings ({bookings.length})</button>
                <button className={activeTab === 'inspections' ? 'active' : ''} onClick={() => setActiveTab('inspections')}>Inspections ({inspections.length})</button>
                <button className={activeTab === 'contacts' ? 'active' : ''} onClick={() => setActiveTab('contacts')}>Messages ({contacts.length})</button>
            </div>

            <div className="admin-content">
                {loading && <p>Loading data...</p>}

                {activeTab === 'bookings' && (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Client</th>
                                <th>Vehicle</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr key={booking.id}>
                                    <td>{new Date(booking.preferred_date).toLocaleDateString()}</td>
                                    <td>
                                        <strong>{booking.full_name}</strong><br />
                                        <small>{booking.email}</small>
                                    </td>
                                    <td>{booking.car_name}</td>
                                    <td><span className={`status ${booking.status}`}>{booking.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {activeTab === 'inspections' && (
                    <div className="inspection-grid">
                        {inspections.map(insp => (
                            <div key={insp.id} className="inspection-card">
                                <div className="card-header">
                                    <h3>{insp.type.toUpperCase()}</h3>
                                    <span>{new Date(insp.created_at).toLocaleDateString()}</span>
                                </div>
                                <p><strong>Vehicle:</strong> {insp.vehicle_id}</p>
                                <div className="card-photos">
                                    {insp.photos && Object.keys(insp.photos).length} Photos
                                    {insp.signature_url && " + Signature"}
                                </div>
                                {/* In a real app, clicking here would open a modal with details */}
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'contacts' && (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>From</th>
                                <th>Subject</th>
                                <th>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map(msg => (
                                <tr key={msg.id}>
                                    <td>{new Date(msg.created_at).toLocaleDateString()}</td>
                                    <td>{msg.full_name}<br /><small>{msg.email}</small></td>
                                    <td>{msg.subject || 'No Subject'}</td>
                                    <td>{msg.message.substring(0, 50)}...</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
