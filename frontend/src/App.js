import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Loader animation duration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [isLoading]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="weaving-animation">
          <div className="loom">
            <div className="thread thread-1"></div>
            <div className="thread thread-2"></div>
            <div className="thread thread-3"></div>
            <div className="thread thread-4"></div>
            <div className="shuttle"></div>
          </div>
          <h2 className="loader-text">Weaving Excellence</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h1>ARUNA</h1>
          </div>
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <button onClick={() => scrollToSection('home')} className="nav-link">Home</button>
            <button onClick={() => scrollToSection('heritage')} className="nav-link">Heritage</button>
            <button onClick={() => scrollToSection('collection')} className="nav-link">Collection</button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
          </div>
          <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-background">
          <img 
            src="https://images.pexels.com/photos/28613841/pexels-photo-28613841.jpeg" 
            alt="Traditional Indian Handloom Weaving" 
            className="hero-bg-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title animate-on-scroll">
            ARUNA HANDLOOM FABRICS
          </h1>
          <p className="hero-subtitle animate-on-scroll">
            Preserving India's textile heritage through generations of master craftsmanship since 1989
          </p>
          <button 
            className="hero-cta animate-on-scroll"
            onClick={() => scrollToSection('collection')}
          >
            Discover Our Fabrics
          </button>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-dot"></div>
        </div>
      </section>

      {/* Heritage Section */}
      <section id="heritage" className="heritage-section">
        <div className="container">
          <div className="heritage-content">
            <div className="heritage-text animate-on-scroll">
              <h2 className="section-title">Our Heritage</h2>
              <p className="heritage-paragraph">
                Since <span className="highlight">1989</span>, Aruna Handloom Fabrics has been a beacon of traditional Indian textile artistry. Our journey began with a simple yet profound vision: to preserve and celebrate the rich heritage of handloom weaving that has been passed down through generations of master craftsmen.
              </p>
              <p className="heritage-paragraph">
                Every thread tells a story, every pattern carries the wisdom of <span className="highlight">centuries-old techniques</span>. Our skilled artisans don't just create fabrics; they weave dreams, traditions, and cultural narratives into each piece. From the gentle rhythm of the loom to the careful selection of natural dyes, we honor the time-tested methods that make each creation truly <span className="highlight">extraordinary</span>.
              </p>
            </div>
            <div className="heritage-image animate-on-scroll">
              <img 
                src="https://images.unsplash.com/photo-1626889268968-2280ec97c38b" 
                alt="Artisan Textile Crafting" 
                className="heritage-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Collection Section */}
      <section id="collection" className="collection-section">
        <div className="container">
          <h2 className="section-title text-center animate-on-scroll">Our Fabric Collection</h2>
          <div className="collection-grid">
            <div className="fabric-card animate-on-scroll">
              <div className="card-image">
                <img 
                  src="https://images.pexels.com/photos/32500670/pexels-photo-32500670.jpeg" 
                  alt="Kalamkari Fabric" 
                />
              </div>
              <div className="card-content">
                <h3 className="card-title">Kalamkari</h3>
                <p className="card-description">
                  Ancient art of hand-painting and block-printing on cotton and silk, featuring mythological narratives and floral motifs.
                </p>
                <button className="card-btn">View Process</button>
              </div>
            </div>

            <div className="fabric-card animate-on-scroll">
              <div className="card-image">
                <img 
                  src="https://images.unsplash.com/photo-1748141951488-9c9fb9603daf" 
                  alt="IKAT Textile" 
                />
              </div>
              <div className="card-content">
                <h3 className="card-title">IKAT</h3>
                <p className="card-description">
                  Intricate resist-dyeing technique creating geometric patterns with a distinctive feathered edge effect, showcasing master craftsmanship.
                </p>
                <button className="card-btn">View Process</button>
              </div>
            </div>

            <div className="fabric-card animate-on-scroll">
              <div className="card-image">
                <img 
                  src="https://images.unsplash.com/photo-1692365272628-530e24acc610" 
                  alt="Yarn Dyed Fabric" 
                />
              </div>
              <div className="card-content">
                <h3 className="card-title">Yarn Dyed</h3>
                <p className="card-description">
                  Premium fabrics woven from pre-dyed yarns, creating vibrant, long-lasting colors and intricate check and stripe patterns.
                </p>
                <button className="card-btn">View Process</button>
              </div>
            </div>

            <div className="fabric-card animate-on-scroll">
              <div className="card-image">
                <img 
                  src="https://images.unsplash.com/photo-1681003564665-62848f8d481e" 
                  alt="Batik Fabric" 
                />
              </div>
              <div className="card-content">
                <h3 className="card-title">Batik</h3>
                <p className="card-description">
                  Traditional wax-resist dyeing technique creating beautiful, organic patterns with rich colors and cultural significance.
                </p>
                <button className="card-btn">View Process</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title text-center animate-on-scroll">Connect With Us</h2>
          <div className="contact-grid">
            <div className="contact-card animate-on-scroll">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9,22 9,12 15,12 15,22"></polyline>
                </svg>
              </div>
              <h3>Corporate Address</h3>
              <p>
                Aruna Handloom Fabrics<br />
                Traditional Textile District<br />
                Heritage Lane, Craft Quarter<br />
                Mumbai, Maharashtra 400001
              </p>
            </div>

            <div className="contact-card animate-on-scroll">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <h3>Phone & Consultation</h3>
              <p>
                +91 98765 43210<br />
                +91 87654 32109<br />
                <strong>Consultation Hours:</strong><br />
                Mon-Sat: 10:00 AM - 6:00 PM
              </p>
            </div>

            <div className="contact-card animate-on-scroll">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <h3>Email</h3>
              <p>
                <strong>General Inquiries:</strong><br />
                info@arunahandloom.com<br />
                <strong>Wholesale Orders:</strong><br />
                wholesale@arunahandloom.com<br />
                <strong>Custom Designs:</strong><br />
                custom@arunahandloom.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <h2 className="footer-brand">ARUNA HANDLOOM FABRICS</h2>
            <p className="footer-copyright">
              © 2024 Aruna Handloom Fabrics. Preserving heritage, weaving futures.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;