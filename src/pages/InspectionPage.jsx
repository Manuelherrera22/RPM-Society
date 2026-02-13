import React, { useState, useRef } from 'react';
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
        photos: {},
        notes: {},
        signature: null
    });
    const sigPad = useRef({});

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passcode, setPasscode] = useState('');

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
        setInspectionData(prev => ({
            ...prev,
            photos: {
                ...prev.photos,
                [currentStep.id]: { file, preview } // Store both file and preview
            }
        }));
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
            setInspectionData(prev => ({ ...prev, signature: sigPad.current.getTrimmedCanvas().toDataURL('image/png') }));
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

    // Call this once on mount to verify connection
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
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const inspectionId = crypto.randomUUID(); // Unique ID for this session

        alert("Submitting inspection... uploading photos. Please wait.");

        try {
            // 1. Upload Photos
            const photoUrls = {};
            for (const [key, photoData] of Object.entries(inspectionData.photos)) {
                if (photoData.file) {
                    const fileName = `${inspectionId}/${key}.jpg`;
                    const publicUrl = await uploadPhoto(photoData.file, fileName);
                    photoUrls[key] = publicUrl;
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
                notes: inspectionData.notes,
                photos: photoUrls,
                signature_url: signatureUrl,
                status: 'submitted'
            }]);

            if (error) throw error;

            alert('Inspection submitted successfully! Records saved to database.');
            // Optionally redirect or reset state
            setStep(0);
            setInspectionData({
                type: 'check-in',
                vehicleId: '',
                photos: {},
                notes: {},
                signature: null
            });

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
                return (
                    <div className="step-content">
                        <h3>Select Inspection Type</h3>
                        <div className="type-buttons">
                            <button
                                className={`type-btn ${inspectionData.type === 'check-in' ? 'active' : ''}`}
                                onClick={() => setInspectionData({ ...inspectionData, type: 'check-in' })}
                            >
                                Check-in (Pick-up)
                            </button>
                            <button
                                className={`type-btn ${inspectionData.type === 'check-out' ? 'active' : ''}`}
                                onClick={() => setInspectionData({ ...inspectionData, type: 'check-out' })}
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
                        />
                    </div>
                );
            case 'review':
                return (
                    <div className="step-content">
                        <h3>Review Inspection</h3>
                        <div className="review-grid">
                            {Object.keys(inspectionData.photos).map(key => (
                                <div key={key} className="review-item">
                                    <strong>{key}:</strong>
                                    {/* Handle both new object structure and potential old simple string structure if any */}
                                    <img
                                        src={inspectionData.photos[key]?.preview || inspectionData.photos[key]}
                                        alt={key}
                                        className="review-img"
                                    />
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
                return (
                    <div className="step-content">
                        <PhotoUpload
                            label={`Upload photo for ${currentStep.title}`}
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
                    <button onClick={handleNext} disabled={step === steps.length - 1} className="btn-primary">
                        {step === steps.length - 1 ? 'Submit Inspection' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InspectionPage;
