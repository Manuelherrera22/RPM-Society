import React, { useState } from 'react';
import './PhotoUpload.css';

const PhotoUpload = ({ onPhotoSelect, label }) => {

    // We don't keep internal state anymore, we just pass the file up
    // and let the parent handle the display of multiple photos.

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Pass both file and preview data up
                onPhotoSelect(file, reader.result);
                // Clear the input so the same file can be selected again if needed
                // or just to reset the UI for the next photo
                e.target.value = null;
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="photo-upload-container">
            <label className="photo-upload-label">{label}</label>
            <div className="photo-upload-area">
                <label className="custom-file-upload">
                    <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleFileChange}
                    />
                    <span className="upload-icon">📷</span>
                    <span>Take Photo / Add Photo</span>
                </label>
            </div>
        </div>
    );
};

export default PhotoUpload;
