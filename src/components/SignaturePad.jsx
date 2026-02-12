import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './SignaturePad.css';

const SignaturePad = ({ onClear, onSave }) => {
    const sigPad = useRef({});

    const clear = () => {
        sigPad.current.clear();
        onClear();
    };

    const trim = () => {
        const dataURL = sigPad.current.getTrimmedCanvas().toDataURL('image/png');
        onSave(dataURL);
    };

    return (
        <div className="signature-container">
            <h3>Sign Below</h3>
            <div className="sig-canvas-wrapper">
                <SignatureCanvas
                    ref={sigPad}
                    penColor="white"
                    canvasProps={{ className: 'sigCanvas' }}
                    backgroundColor="#222"
                    onEnd={trim}
                />
            </div>
            <button className="btn-clear" onClick={clear}>Clear</button>
        </div>
    );
};

export default SignaturePad;
