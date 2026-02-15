import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Download, Printer, Share2, Mail, Link as LinkIcon, Check, MessageCircle } from 'lucide-react';
import logo from '../assets/rpm-logo.jpg';
import './InspectionReport.css';

const InspectionReport = () => {
    const { id } = useParams();
    const [inspection, setInspection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [generatingPdf, setGeneratingPdf] = useState(false);

    const steps = [
        { id: 'start', title: 'Start' },
        { id: 'front', title: 'Front' },
        { id: 'driver', title: 'Driver Side' },
        { id: 'rear', title: 'Rear' },
        { id: 'passenger', title: 'Passenger Side' },
        { id: 'interior', title: 'Interior' }
    ];

    const getStepTitle = (id) => steps.find(s => s.id === id)?.title || id;

    useEffect(() => {
        const fetchInspection = async () => {
            const { data, error } = await supabase
                .from('inspections')
                .select('*')
                .eq('id', id)
                .single();
            if (data) setInspection(data);
            setLoading(false);
        };
        fetchInspection();
    }, [id]);

    if (loading) return <div className="report-loading">Generating Report...</div>;
    if (!inspection) return <div className="report-error">Inspection not found.</div>;

    const handlePrint = () => {
        window.print();
    };

    const handleDownloadPDF = () => {
        setGeneratingPdf(true);
        const element = document.querySelector('.report-container');
        const opt = {
            margin: [10, 10, 10, 10], // top, left, bottom, right
            filename: `RPM_Inspection_${inspection.vehicle_id}_${new Date().toISOString().split('T')[0]}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Temporarily hide actions for PDF generation
        const actions = document.querySelector('.report-actions');
        if (actions) actions.style.display = 'none';

        html2pdf().set(opt).from(element).save().then(() => {
            setGeneratingPdf(false);
            if (actions) actions.style.display = 'flex';
        }).catch(err => {
            console.error('PDF Generation Error:', err);
            setGeneratingPdf(false);
            if (actions) actions.style.display = 'flex';
        });
    };

    const handleWhatsApp = () => {
        const url = window.location.href;
        const text = `Hello ${inspection.client_name || ''}, here is your vehicle inspection report for the ${inspection.vehicle_id}: ${url}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleCopyLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleEmail = () => {
        const subject = `Vehicle Inspection Report - ${inspection.vehicle_id}`;
        const body = `Here is the inspection report for your rental:\n\n${window.location.href}\n\nRPM Society`;
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'RPM Inspection Report',
                    text: `Inspection Report for ${inspection.vehicle_id}`,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            handleCopyLink();
        }
    };

    return (
        <div className="report-container" style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
            {/* Action Bar - Hidden when printing */}
            <div className="report-actions no-print">
                <div className="action-group">
                    <button onClick={handleDownloadPDF} className="action-btn primary" disabled={generatingPdf}>
                        <Download size={16} /> {generatingPdf ? 'Saving...' : 'Download PDF'}
                    </button>
                    <button onClick={handleWhatsApp} className="action-btn whatsapp-btn" style={{ background: '#25D366', color: 'white', borderColor: '#25D366' }}>
                        <MessageCircle size={16} /> WhatsApp
                    </button>
                    <button onClick={handleEmail} className="action-btn">
                        <Mail size={16} /> Email
                    </button>
                    <button onClick={handlePrint} className="action-btn">
                        <Printer size={16} /> Print
                    </button>
                    <button onClick={handleCopyLink} className="action-btn">
                        {copied ? <Check size={16} /> : <LinkIcon size={16} />}
                        {copied ? 'Copied' : 'Link'}
                    </button>
                </div>
            </div>

            {/* Header */}
            <header className="report-header">
                <div className="report-brand">
                    <img src={logo} alt="RPM Society" style={{ height: '50px', marginBottom: '10px' }} />
                    <h1>RPM SOCIETY</h1>
                    <p>Vehicle Inspection Report</p>
                </div>
                <div className="report-meta">
                    <p><strong>Date:</strong> {new Date(inspection.created_at).toLocaleString()}</p>
                    <p><strong>Type:</strong> <span className="uppercase">{inspection.type}</span></p>
                    <p><strong>Ref:</strong> {inspection.id.split('-')[0]}</p>
                </div>
            </header>

            {/* Vehicle & Client Info */}
            <section className="report-section info-grid">
                <div className="info-box">
                    <h3>Vehicle Information</h3>
                    <p className="large-text">{inspection.vehicle_id}</p>
                </div>
                <div className="info-box">
                    <h3>Client Information</h3>
                    <p className="large-text">{inspection.client_name || 'N/A'}</p>
                    <p className="sub-text">Token ID: {inspection.linked_token_id || 'N/A'}</p>
                </div>
            </section>

            {/* Inspection Photos */}
            <section className="report-section">
                <h3>Visual Evidence</h3>
                <div className="report-photos-grid">
                    {Object.keys(inspection.photos || {}).map(stepId => {
                        if (stepId === 'signature') return null;

                        const photos = Array.isArray(inspection.photos[stepId])
                            ? inspection.photos[stepId]
                            : [inspection.photos[stepId]]; // Handle legacy single photo

                        return (
                            <div key={stepId} className="photo-group">
                                <h4>{getStepTitle(stepId)}</h4>
                                {inspection.notes && inspection.notes[stepId] && (
                                    <p className="photo-note">" {inspection.notes[stepId]} "</p>
                                )}
                                <div className="photos-row">
                                    {photos.map((item, idx) => {
                                        const url = typeof item === 'string' ? item : item.url;
                                        const timestamp = typeof item === 'object' && item.timestamp ? new Date(item.timestamp).toLocaleString() : '';

                                        return (
                                            <div key={idx} className="report-photo-wrapper">
                                                <img src={url} alt={`${stepId}-${idx}`} className="report-photo" />
                                                {timestamp && <span className="photo-timestamp">{timestamp}</span>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Signature */}
            <section className="report-section signature-section">
                <div className="signature-box">
                    <h3>Client Signature</h3>
                    {inspection.signature_url ? (
                        <img src={inspection.signature_url} alt="Client Signature" className="signature-img" />
                    ) : (
                        <p>No signature recorded.</p>
                    )}
                    <p className="agreement-text">
                        By signing, the client acknowledges the condition of the vehicle as documented above.
                    </p>
                </div>
            </section>

            <footer className="report-footer">
                <p>&copy; {new Date().getFullYear()} RPM Society. All Rights Reserved.</p>
                <p>Generated via RPM Ops Center</p>
            </footer>
        </div>
    );
};

export default InspectionReport;
