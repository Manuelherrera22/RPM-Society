import React, { useState, useEffect } from 'react';
import './CookieConsent.css';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('rpm_cookie_consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('rpm_cookie_consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-banner">
            <div className="cookie-content">
                <p>
                    We use cookies to ensure you get the best experience on our website.
                    By continuing to browse, you agree to our <a href="/privacy">Privacy Policy</a>.
                </p>
                <button onClick={acceptCookies} className="cookie-btn">Accept</button>
            </div>
        </div>
    );
};

export default CookieConsent;
