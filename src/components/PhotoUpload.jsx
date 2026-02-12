import React, { useState } from 'react';
import './PhotoUpload.css';

const PhotoUpload = ({ onPhotoSelect, label }) => {
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                onPhotoSelect(file, reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="photo-upload-container">
            <label className="photo-upload-label">{label}</label>
            <div className="photo-upload-area">
                {preview ? (
                    <div className="img-preview-wrapper">
                        <img src={preview} alt="Inspection Preview" className="img-preview" />
                        <button className="remove-btn" onClick={() => { setPreview(null); onPhotoSelect(null, null); }}>×</button>
                    </div>
                ) : (
                    <label className="custom-file-upload">
                        <input type="file" accept="image/*,video/*" capture="environment" onChange={handleFileChange} />
                        <span className="upload-icon">📷</span>
                        <span>Take Photo / Upload</span>
                    </label>
                )}
            </div>
        </div>
    );
};

export default PhotoUpload;
