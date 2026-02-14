import React, { useState, useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import PhotoUpload from '../components/PhotoUpload';
import SEO from '../components/SEO';
import { supabase } from '../supabaseClient';
import './InspectionPage.css';

const InspectionPage = () => {
    const [step, setStep] = useState(0);
    const [inspectionData, setInspectionData] = useState({
        type: 'check-in', // or 'check-out'
        vehicleId: '',
        photos: {}, // Structure: { stepId: [ { file, preview, url, timestamp }, ... ] }
        notes: {},
        signature: null
    });
    const sigPad = useRef({});

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passcode, setPasscode] = useState('');
    const [tokenMetadata, setTokenMetadata] = useState(null); // { clientName, vehicleId, tokenId }

    // Sequential Flow State
    const [inspectionStatus, setInspectionStatus] = useState('pending'); // pending, ready, completed
    const [lockedType, setLockedType] = useState(null);

    const steps = [
        { id: 'start', title: 'Inspection Start' },
        { id: 'front', title: 'Exterior - Front' },
        { id: 'driver', title: 'Exterior - Driver Side' },
        { id: 'rear', title: 'Exterior - Rear' },
        { id: 'passenger', title: 'Exterior - Passenger Side' },
        { id: 'interior', title: 'Interior' },
        { id: 'review', title: 'Review & Sign' }
    ];

    const currentStep = steps[step];

    const handlePhotoSelect = (file, preview) => {
        setInspectionData(prev => {
            const currentPhotos = prev.photos[currentStep.id] || [];
            return {
                ...prev,
                photos: {
                    ...prev.photos,
                    [currentStep.id]: [...currentPhotos, { file, preview }]
                }
            };
        });
    };

    const handleRemovePhoto = (stepId, index) => {
        setInspectionData(prev => {
            const currentPhotos = prev.photos[stepId] || [];
            const newPhotos = currentPhotos.filter((_, i) => i !== index);
            return {
                ...prev,
                photos: {
                    ...prev.photos,
                    [stepId]: newPhotos
                }
            };
        });
    };

    const handleNoteChange = (e) => {
        const { value } = e.target;
        setInspectionData(prev => ({
            ...prev,
            notes: { ...prev.notes, [currentStep.id]: value }
        }));
    };

    const clearSignature = () => {
        sigPad.current.clear();
        setInspectionData(prev => ({ ...prev, signature: null }));
    };

    const saveSignature = () => {
        if (sigPad.current) {
            setInspectionData(prev => ({ ...prev, signature: sigPad.current.getCanvas().toDataURL('image/png') }));
        }
    };

    const checkDatabaseConnection = async () => {
        const { error } = await supabase.from('inspections').select('count', { count: 'exact', head: true });
        if (error) {
            console.error("Database check failed:", error);
        } else {
            console.log("Database connection successful");
        }
    };

    // Token Validation
    useEffect(() => {
        const validateToken = async () => {
            const params = new URLSearchParams(window.location.search);
            const token = params.get('token');

            if (token) {
                // Check token validity
                const { data, error } = await supabase
                    .from('access_tokens')
                    .select('*')
                    .eq('token', token)
                    .eq('is_active', true)
                    .single();

                if (data) {
                    const now = new Date();
                    const expiresAt = new Date(data.expires_at);

                    if (now < expiresAt) {
                        setIsAuthenticated(true);

                        // Check for existing inspections with this token to enforce flow
                        const { data: existingInspections } = await supabase
                            .from('inspections')
                            .select('type')
                            .eq('linked_token_id', data.id);

                        const hasCheckIn = existingInspections?.some(i => i.type === 'check-in');
                        const hasCheckOut = existingInspections?.some(i => i.type === 'check-out');

                        if (hasCheckIn && hasCheckOut) {
                            setInspectionStatus('completed');
                        } else if (hasCheckIn) {
                            // Force Check-out
                            setLockedType('check-out');
                            setInspectionData(prev => ({
                                ...prev,
                                type: 'check-out',
                                vehicleId: data.metadata?.vehicleId || prev.vehicleId
                            }));
                        } else {
                            // Force Check-in (default)
                            setLockedType('check-in');
                            setInspectionData(prev => ({
                                ...prev,
                                type: 'check-in',
                                vehicleId: data.metadata?.vehicleId || prev.vehicleId
                            }));
                        }

                        // Store metadata
                        if (data.metadata) {
                            setTokenMetadata({
                                ...data.metadata,
                                tokenId: data.id
                            });
                        }

                        // Clean URL without refresh
                        window.history.replaceState({}, document.title, window.location.pathname);
                        return;
                    } else {
                        alert("This access link has expired.");
                    }
                } else {
                    console.error("Invalid token:", error);
                }
            }
        };

        validateToken();
    }, []);

    // Database connection check remains separate
    React.useEffect(() => {
        checkDatabaseConnection();
    }, []);

    const uploadPhoto = async (file, path) => {
        const { data, error } = await supabase.storage
            .from('inspection-photos')
            .upload(path, file);

        if (error) {
            console.error('Error uploading photo:', error);
            throw error;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('inspection-photos')
            .getPublicUrl(path);

        return publicUrl;
    };

    const uploadSignature = async (dataUrl, path) => {
        // Convert base64 to blob
        const res = await fetch(dataUrl);
        const blob = await res.blob();

        const { data, error } = await supabase.storage
            .from('inspection-photos')
            .upload(path, blob);

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
            .from('inspection-photos')
            .getPublicUrl(path);

        return publicUrl;
    };

    const handleSubmit = async () => {
        const inspectionId = crypto.randomUUID(); // Unique ID for this session

        alert("Submitting inspection... uploading photos. Please wait.");

        try {
            // 1. Upload Photos
            const photoUrls = {};
            // Iterate over each step's photo array
            for (const [key, photoList] of Object.entries(inspectionData.photos)) {
                if (Array.isArray(photoList) && photoList.length > 0) {
                    photoUrls[key] = []; // Initialize array for this step
                    for (let i = 0; i < photoList.length; i++) {
                        const photoData = photoList[i];
                        if (photoData.file) {
                            // Naming convention: inspectionId/stepId_index.jpg
                            const fileName = `${inspectionId}/${key}_${i}.jpg`;
                            const publicUrl = await uploadPhoto(photoData.file, fileName);

                            // Save with timestamp
                            photoUrls[key].push({
                                url: publicUrl,
                                timestamp: new Date().toISOString()
                            });
                        }
                    }
                }
            }

            // 2. Upload Signature
            let signatureUrl = null;
            if (inspectionData.signature) {
                const fileName = `${inspectionId}/signature.png`;
                signatureUrl = await uploadSignature(inspectionData.signature, fileName);
            }

            // 3. Insert Record
            const { error } = await supabase.from('inspections').insert([{
                id: inspectionId,
                created_at: new Date(),
                type: inspectionData.type,
                vehicle_id: inspectionData.vehicleId,
                client_name: tokenMetadata?.clientName || null, // Save client name
                linked_token_id: tokenMetadata?.tokenId || null, // Link to token
                notes: inspectionData.notes,
                photos: photoUrls, // stores arrays of objects {url, timestamp} now
                signature_url: signatureUrl,
                status: 'submitted'
            }]);

            if (error) throw error;

            alert('Inspection submitted successfully! Records saved to database.');
            // Optionally redirect or reset state
            setStep(0);
            setInspectionData({
                type: lockedType === 'check-in' ? 'check-out' : 'check-in', // Toggle for next test if not strict
                vehicleId: '',
                photos: {},
                notes: {},
                signature: null
            });
            window.location.reload(); // Reload to re-validate token and update state

        } catch (error) {
            console.error('Error submitting inspection:', error);
            alert('Error submitting inspection. Check console for details.');
        }
    };

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (step > 0) setStep(step - 1);
    };

    const renderStepContent = () => {
        switch (currentStep.id) {
            case 'start':
                if (inspectionStatus === 'completed') {
                    return (
                        <div className="step-content" style={{ textAlign: 'center', padding: '40px' }}>
                            <h2 style={{ color: '#4ade80' }}>All Done!</h2>
                            <p>Both Check-in and Check-out inspections have been completed for this session.</p>
                            <p style={{ marginTop: '20px', color: '#888' }}>You can close this window.</p>
                        </div>
                    );
                }

                return (
                    <div className="step-content">
                        <h3>Select Inspection Type</h3>

                        {tokenMetadata && (
                            <div className="inspection-info-box" style={{ background: '#222', padding: '15px', borderRadius: '5px', marginBottom: '15px', borderLeft: '4px solid #d4af37' }}>
                                <p style={{ margin: 0, color: '#aaa', fontSize: '0.9rem' }}>Inspection for Client:</p>
                                <h4 style={{ margin: '5px 0 0', color: 'white' }}>{tokenMetadata.clientName}</h4>
                            </div>
                        )}

                        <div className="type-buttons">
                            <button
                                className={`type-btn ${inspectionData.type === 'check-in' ? 'active' : ''}`}
                                onClick={() => !lockedType && setInspectionData({ ...inspectionData, type: 'check-in' })}
                                disabled={lockedType && lockedType !== 'check-in'}
                                style={lockedType && lockedType !== 'check-in' ? { opacity: 0.3, cursor: 'not-allowed' } : {}}
                            >
                                Check-in (Pick-up)
                            </button>
                            <button
                                className={`type-btn ${inspectionData.type === 'check-out' ? 'active' : ''}`}
                                onClick={() => !lockedType && setInspectionData({ ...inspectionData, type: 'check-out' })}
                                disabled={lockedType && lockedType !== 'check-out'}
                                style={lockedType && lockedType !== 'check-out' ? { opacity: 0.3, cursor: 'not-allowed' } : {}}
                            >
                                Check-out (Return)
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Vehicle ID / License Plate"
                            className="vehicle-input"
                            value={inspectionData.vehicleId}
                            onChange={(e) => setInspectionData({ ...inspectionData, vehicleId: e.target.value })}
                            readOnly={!!tokenMetadata?.vehicleId} // Lock if came from token
                            style={tokenMetadata?.vehicleId ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
                        />
                        {tokenMetadata?.vehicleId && <small style={{ color: '#aaa' }}>Locked by QR Code</small>}
                    </div>
                );
            case 'review':
                return (
                    <div className="step-content">
                        <h3>Review Inspection</h3>
                        <div className="review-grid">
                            {Object.keys(inspectionData.photos).map(key => (
                                <div key={key} className="review-section">
                                    <h4>{steps.find(s => s.id === key)?.title || key}</h4>
                                    <div className="review-photos-row">
                                        {inspectionData.photos[key] && inspectionData.photos[key].map((photo, idx) => (
                                            <img
                                                key={idx}
                                                // Handle object vs string format for preview
                                                src={photo.preview || photo.url || photo}
                                                alt={`${key} ${idx}`}
                                                className="review-img-small"
                                            />
                                        ))}
                                    </div>
                                    {inspectionData.notes[key] && (
                                        <p className="review-note"><strong>Note:</strong> {inspectionData.notes[key]}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                        <h3>Signature</h3>
                        <div className="signature-wrapper">
                            <SignatureCanvas
                                ref={sigPad}
                                penColor="white"
                                canvasProps={{ className: 'sigCanvas' }}
                                backgroundColor="#333"
                                onEnd={saveSignature}
                            />
                            <button onClick={clearSignature} className="btn-clear-sig">Clear Signature</button>
                        </div>
                    </div>
                );
            default:
                const currentPhotos = inspectionData.photos[currentStep.id] || [];
                return (
                    <div className="step-content">
                        {/* Photo Gallery Grid */}
                        <div className="photo-gallery">
                            {currentPhotos.map((photo, index) => (
                                <div key={index} className="photo-thumbnail-wrapper">
                                    <img
                                        src={photo.preview || photo.url || photo}
                                        alt={`Upload ${index}`}
                                        className="photo-thumbnail"
                                    />
                                    <button
                                        className="remove-thumb-btn"
                                        onClick={() => handleRemovePhoto(currentStep.id, index)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>

                        <PhotoUpload
                            label={currentPhotos.length > 0 ? "Add another photo" : `Upload photo for ${currentStep.title}`}
                            onPhotoSelect={handlePhotoSelect}
                        />
                        <textarea
                            placeholder="Add notes about damage or condition..."
                            className="notes-area"
                            value={inspectionData.notes[currentStep.id] || ''}
                            onChange={handleNoteChange}
                        />
                    </div>
                );
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="inspection-login" style={{
                height: '80vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#111',
                color: '#fff'
            }}>
                <h2>Staff Access Only</h2>
                <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter Security Code"
                    style={{ padding: '10px 20px', marginTop: '20px', borderRadius: '5px', border: '1px solid #333', backgroundColor: '#222', color: 'white', outline: 'none' }}
                />
                <button
                    onClick={() => {
                        if (passcode === 'RPM2026') setIsAuthenticated(true);
                        else alert('Access Denied');
                    }}
                    style={{ marginTop: '20px', padding: '10px 30px', background: '#e11d48', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Access
                </button>
                <p style={{ marginTop: '20px', color: '#666', fontSize: '0.8rem' }}>
                    Or scan a valid access QR code.
                </p>
            </div>
        )
    }

    return (
        <div className="inspection-page">
            <SEO
                title="Vehicle Inspection"
                description="RPM Society Staff Only - Vehicle Condition Inspection Tool."
                keywords="internal, inspection, check-in, check-out"
            />
            <div className="inspection-container">
                <h1>{currentStep.title}</h1>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${((step + 1) / steps.length) * 100}%` }}></div>
                </div>
                <div className="inspection-content-wrapper">
                    {renderStepContent()}
                </div>
                <div className="inspection-controls">
                    <button onClick={handleBack} disabled={step === 0} className="btn-secondary">Back</button>
                    <button onClick={handleNext} className="btn-primary">
                        {step === steps.length - 1 ? 'Submit Inspection' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InspectionPage;
