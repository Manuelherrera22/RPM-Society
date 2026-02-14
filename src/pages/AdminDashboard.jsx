import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { supabase } from '../supabaseClient';
import SEO from '../components/SEO';
import './AdminDashboard.css';

const AdminDashboard = () => {
    // 1. Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('adminAuth') === 'true';
    });
    const [password, setPassword] = useState('');

    // 2. UI State
    const [activeTab, setActiveTab] = useState('bookings');
    const [loading, setLoading] = useState(false);
    const [selectedInspection, setSelectedInspection] = useState(null);

    // 3. QR Generation State
    const [qrCodeValue, setQrCodeValue] = useState(null);
    const [qrClientName, setQrClientName] = useState('');
    const [qrVehicleId, setQrVehicleId] = useState('');

    // 4. Data State
    const [bookings, setBookings] = useState([]);
    const [inspections, setInspections] = useState([]);
    const [contacts, setContacts] = useState([]);

    // Helpers
    const steps = [
        { id: 'start', title: 'Inspection Start' },
        { id: 'front', title: 'Exterior - Front' },
        { id: 'driver', title: 'Exterior - Driver Side' },
        { id: 'rear', title: 'Exterior - Rear' },
        { id: 'passenger', title: 'Exterior - Passenger Side' },
        { id: 'interior', title: 'Interior' },
        { id: 'review', title: 'Review & Sign' }
    ];
    const getStepTitle = (id) => steps.find(s => s.id === id)?.title || id;

    // --- Actions ---

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

    const generateAccessQR = async () => {
        if (!qrClientName || !qrVehicleId) {
            alert("Please enter Client Name and Vehicle ID");
            return;
        }

        setLoading(true);
        try {
            const token = crypto.randomUUID();
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 30);

            const { error } = await supabase.from('access_tokens').insert([{
                token: token,
                expires_at: expiresAt,
                is_active: true,
                metadata: {
                    clientName: qrClientName,
                    vehicleId: qrVehicleId
                }
            }]);

            if (error) throw error;

            const url = `${window.location.origin}/inspection?token=${token}`;
            setQrCodeValue(url);

        } catch (error) {
            console.error('Error generating QR:', error);
            alert('Failed to generate QR token');
        } finally {
            setLoading(false);
        }
    };

    const revokeAccess = async () => {
        if (!confirm("Are you sure you want to disable all active inspection links?")) return;
        setLoading(true);
        try {
            const { error } = await supabase.from('access_tokens')
                .update({ is_active: false })
                .eq('is_active', true);

            if (error) throw error;

            setQrCodeValue(null);
            alert("All inspection access links have been deactivated.");
        } catch (error) {
            console.error('Error revoking access:', error);
            alert('Failed to revoke access');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'RPM2026') {
            setIsAuthenticated(true);
            localStorage.setItem('adminAuth', 'true');
            fetchData();
        } else {
            alert('Access Denied');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('adminAuth');
    };

    // --- Effects ---

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated]);

    // --- Render ---

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
                <button onClick={handleLogout} className="logout-btn">Logout</button>
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
                    <div className="inspection-dashboard-content">
                        <div className="qr-generator-section">
                            <h3>Inspector Access</h3>
                            <div className="qr-inputs" style={{ marginBottom: '15px' }}>
                                <input
                                    type="text"
                                    placeholder="Client Name"
                                    value={qrClientName}
                                    onChange={e => setQrClientName(e.target.value)}
                                    style={{ padding: '8px', marginRight: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                                />
                                <input
                                    type="text"
                                    placeholder="Vehicle ID"
                                    value={qrVehicleId}
                                    onChange={e => setQrVehicleId(e.target.value)}
                                    style={{ padding: '8px', marginRight: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                                />
                            </div>
                            <div className="qr-controls" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                                <button onClick={generateAccessQR} disabled={loading} className="btn-generate-qr">
                                    {loading ? 'Processing...' : 'Generate New QR (30 Days)'}
                                </button>
                                <button onClick={revokeAccess} disabled={loading} className="btn-revoke-qr" style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
                                    Deactivate All Links
                                </button>
                            </div>

                            {qrCodeValue && (
                                <div className="qr-display">
                                    <div style={{ background: 'white', padding: '16px', borderRadius: '8px', display: 'inline-block' }}>
                                        <QRCode value={qrCodeValue} size={150} />
                                    </div>
                                    <p className="qr-link-text">
                                        Scan to access inspection tool directly<br />
                                        <small>Valid until revoked or 30 days</small>
                                    </p>
                                    <div className="qr-actions" style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                                        <button onClick={() => { navigator.clipboard.writeText(qrCodeValue); alert('Link copied!'); }} className="btn-copy-link">
                                            Copy Link
                                        </button>
                                        <button onClick={() => {
                                            const svg = document.querySelector(".qr-display svg");
                                            const svgData = new XMLSerializer().serializeToString(svg);
                                            const canvas = document.createElement("canvas");
                                            const ctx = canvas.getContext("2d");
                                            const img = new Image();
                                            img.onload = () => {
                                                canvas.width = img.width;
                                                canvas.height = img.height;
                                                ctx.drawImage(img, 0, 0);
                                                const pngFile = canvas.toDataURL("image/png");
                                                const downloadLink = document.createElement("a");
                                                downloadLink.download = "RPM_Inspection_QR.png";
                                                downloadLink.href = pngFile;
                                                downloadLink.click();
                                            };
                                            img.src = "data:image/svg+xml;base64," + btoa(svgData);
                                        }} className="btn-download-qr" style={{ padding: '8px 15px', background: '#d4af37', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                                            Download QR Image
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="inspection-grid">
                            {inspections.map(insp => (
                                <div key={insp.id} className="inspection-card" onClick={() => setSelectedInspection(insp)} style={{ cursor: 'pointer' }}>
                                    <div className="card-header">
                                        <h3>{insp.type.toUpperCase()}</h3>
                                        <span>{new Date(insp.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <p><strong>Vehicle:</strong> {insp.vehicle_id}</p>
                                    {insp.client_name && <p><strong>Client:</strong> {insp.client_name}</p>}
                                    <div className="card-photos">
                                        {insp.photos && Object.keys(insp.photos).length} Photos
                                        {insp.signature_url && " + Signature"}
                                    </div>
                                    <small style={{ color: '#d4af37', marginTop: '10px', display: 'block' }}>Click to view details</small>
                                </div>
                            ))}
                        </div>
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

            {/* Global Modal Styles */}
            <style>{`
                .modal-overlay {
                    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.85); z-index: 1000;
                    display: flex; justify-content: center; align-items: center;
                    backdrop-filter: blur(5px);
                }
                .modal-content {
                    background: #1a1a1a; padding: 30px; border-radius: 12px;
                    width: 90%; max-width: 800px; max-height: 90vh;
                    overflow-y: auto; position: relative;
                    border: 1px solid #333; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }
                .modal-close {
                    position: absolute; top: 15px; right: 20px;
                    background: none; border: none; color: #fff;
                    font-size: 24px; cursor: pointer;
                }
                .detail-section { margin-bottom: 25px; border-bottom: 1px solid #333; padding-bottom: 15px; }
                .detail-photos { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px; }
                .detail-photo { width: 100px; height: 100px; object-fit: cover; border-radius: 4px; cursor: pointer; transition: transform 0.2s; }
                .detail-photo:hover { transform: scale(1.1); }
            `}</style>

            {/* Inspection Details Modal */}
            {selectedInspection && (
                <div className="modal-overlay" onClick={() => setSelectedInspection(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedInspection(null)}>&times;</button>

                        <h2 style={{ borderBottom: '2px solid #d4af37', paddingBottom: '10px', marginBottom: '20px' }}>Inspection Details</h2>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                            <div>
                                <p style={{ color: '#888', marginBottom: '5px' }}>Date</p>
                                <h3>{new Date(selectedInspection.created_at).toLocaleString()}</h3>
                            </div>
                            <div>
                                <p style={{ color: '#888', marginBottom: '5px' }}>Type</p>
                                <h3 style={{ textTransform: 'uppercase', color: selectedInspection.type === 'check-in' ? '#4ade80' : '#f87171' }}>
                                    {selectedInspection.type}
                                </h3>
                            </div>
                            <div>
                                <p style={{ color: '#888', marginBottom: '5px' }}>Vehicle</p>
                                <h3>{selectedInspection.vehicle_id}</h3>
                            </div>
                            <div>
                                <p style={{ color: '#888', marginBottom: '5px' }}>Client</p>
                                <h3>{selectedInspection.client_name || 'N/A'}</h3>
                            </div>
                        </div>

                        {/* Photos & Notes */}
                        {Object.keys(selectedInspection.photos || {}).map(stepId => {
                            // Skip signature key for photos section
                            if (stepId === 'signature') return null;

                            return (
                                <div key={stepId} className="detail-section">
                                    <h4 style={{ color: '#d4af37', marginBottom: '10px' }}>{getStepTitle(stepId)}</h4>

                                    {selectedInspection.notes && selectedInspection.notes[stepId] && (
                                        <p style={{ background: '#2a2a2a', padding: '10px', borderRadius: '4px', fontStyle: 'italic', marginBottom: '10px' }}>
                                            "{selectedInspection.notes[stepId]}"
                                        </p>
                                    )}

                                    <div className="detail-photos">
                                        {Array.isArray(selectedInspection.photos[stepId]) ? (
                                            selectedInspection.photos[stepId].map((item, idx) => {
                                                // Handle potential legacy string format or new object format
                                                const url = typeof item === 'string' ? item : item.url;
                                                const timestamp = typeof item === 'object' && item.timestamp ? new Date(item.timestamp).toLocaleString() : null;

                                                return (
                                                    <div key={idx} style={{ position: 'relative', display: 'inline-block' }}>
                                                        <a href={url} target="_blank" rel="noopener noreferrer">
                                                            <img src={url} alt={`${stepId}-${idx}`} className="detail-photo" />
                                                        </a>
                                                        {timestamp && (
                                                            <div style={{
                                                                position: 'absolute',
                                                                bottom: '4px',
                                                                left: '0',
                                                                right: '0',
                                                                background: 'rgba(0,0,0,0.7)',
                                                                color: 'white',
                                                                fontSize: '10px',
                                                                padding: '2px',
                                                                textAlign: 'center',
                                                                borderRadius: '0 0 4px 4px'
                                                            }}>
                                                                {timestamp}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            // Fallback for single photo format (legacy)
                                            <a href={selectedInspection.photos[stepId]} target="_blank" rel="noopener noreferrer">
                                                <img src={selectedInspection.photos[stepId]} alt={stepId} className="detail-photo" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Signature */}
                        {selectedInspection.signature_url && (
                            <div className="detail-section" style={{ borderBottom: 'none' }}>
                                <h4 style={{ color: '#d4af37', marginBottom: '10px' }}>Signature</h4>
                                <div style={{ background: '#eee', padding: '10px', borderRadius: '4px', display: 'inline-block' }}>
                                    <img src={selectedInspection.signature_url} alt="Signature" style={{ maxWidth: '300px' }} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
