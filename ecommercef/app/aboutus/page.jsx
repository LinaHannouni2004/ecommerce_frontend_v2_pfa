import React from 'react';
import './AboutUs.css';
import NavigBare from '../components/NavigBare';


const AboutUs = () => {
  return (
    
    <div className="about-us-container">
      <header className="about-us-header">
        <h1>About Our Company</h1>
        <p className="header-subtitle">Our commitment to excellence and innovation</p>
      </header>
      
      <main className="about-us-content">
        <section className="intro-section">
          <h2>Who We Are</h2>
          <p>
            We are a team of passionate innovators dedicated to creating products that enhance people's lives. 
            Our mission is to deliver exceptional quality while maintaining the highest standards of integrity.
          </p>
        </section>
        
        <section className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Innovation</h3>
              <p>We constantly push boundaries to create groundbreaking solutions.</p>
            </div>
            <div className="value-card">
              <h3>Quality</h3>
              <p>Every product undergoes rigorous testing to meet our high standards.</p>
            </div>
            <div className="value-card">
              <h3>Sustainability</h3>
              <p>We're committed to reducing our environmental impact at every stage.</p>
            </div>
            <div className="value-card">
              <h3>Privacy</h3>
              <p>Protecting user data is fundamental to everything we do.</p>
            </div>
          </div>
        </section>
        
        <section className="compliance-section">
          <h2>Compliance & Ethics</h2>
          <p>
            We adhere to the highest standards of legal and ethical compliance across all our operations. 
            Our comprehensive compliance program ensures we meet all regulatory requirements while maintaining 
            our commitment to corporate responsibility.
          </p>
          <div className="compliance-links">
            <a href="/compliance" className="compliance-link">View Our Compliance Policy</a>
            <a href="/ethics" className="compliance-link">Read Our Code of Ethics</a>
          </div>
        </section>
        
        <section className="leadership-section">
          <h2>Leadership</h2>
          <p>
            Our executive team brings decades of experience across technology, design, and business operations, 
            guiding our company with vision and expertise.
          </p>
          <a href="/leadership" className="cta-button">Meet Our Team</a>
        </section>
      </main>
      
      <footer className="about-us-footer">
        <p>Have questions about our company or policies?</p>
        <a href="/contact" className="contact-link">Contact Us</a>
      </footer>
    </div>
  );
};

export default AboutUs;