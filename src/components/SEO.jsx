import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords }) => {
    const siteTitle = "RPM Society | Exclusive Car Rentals";
    const defaultDescription = "Experience the thrill of driving the world's most exclusive fleet. Luxury car rentals in Sebastian, FL.";
    const defaultKeywords = "luxury car rental, exotic cars, sebastian fl, lamborghini, ferrari, porsche";

    return (
        <Helmet>
            <title>{title ? `${title} | RPM Society` : siteTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title ? `${title} | RPM Society` : siteTitle} />
            <meta property="og:description" content={description || defaultDescription} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title ? `${title} | RPM Society` : siteTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
        </Helmet>
    );
};

export default SEO;
