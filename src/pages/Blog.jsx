import React from 'react';
import './Blog.css';
import heroImage from '../assets/hero.png';
import lamborghini from '../assets/lamborghini.png';
import rolls from '../assets/rolls.png';

const blogPosts = [
    {
        id: 1,
        title: "The Art of the Grand Tour",
        category: "Lifestyle",
        date: "October 12, 2024",
        excerpt: "Exploring the European coastlines in the Aston Martin Valhalla is more than a drive; it's a sensory awakening.",
        image: heroImage,
    },
    {
        id: 2,
        title: "Unleashing the Revuelto",
        category: "Reviews",
        date: "September 28, 2024",
        excerpt: "Lamborghini's first V12 hybrid plug-in HPEV is here. We took it to the track to see if it retains the raging bull's soul.",
        image: lamborghini,
    },
    {
        id: 3,
        title: "Silence is the New Luxury",
        category: "News",
        date: "September 15, 2024",
        excerpt: "The Rolls-Royce Spectre redefines electric motoring with an uncompromising focus on waftability and presence.",
        image: rolls,
    }
];

const Blog = () => {
    return (
        <div className="blog-page">
            <div className="blog-header">
                <span className="section-subtitle">The Journal</span>
                <h1 className="section-title">Automotive <span className="gold-text">Culture</span></h1>
                <p>Curated stories from the world of high performance and luxury.</p>
            </div>

            <div className="blog-grid">
                {blogPosts.map((post) => (
                    <article key={post.id} className="blog-card">
                        <div className="blog-image">
                            <img src={post.image} alt={post.title} />
                            <span className="category-tag">{post.category}</span>
                        </div>
                        <div className="blog-content">
                            <span className="blog-date">{post.date}</span>
                            <h3>{post.title}</h3>
                            <p>{post.excerpt}</p>
                            <a href="#" className="read-more">Read Article</a>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default Blog;
