import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  // Hero images showcase traditional craftsmanship
  const heroImages = [
    {
      src: "https://images.pexels.com/photos/28613841/pexels-photo-28613841.jpeg",
      title: "Traditional Handloom Weaving",
      subtitle: "Master craftsmen preserving ancient techniques"
    },
    {
      src: "/api/placeholder/1920/1080", // Wooden printing blocks
      title: "Hand-Carved Printing Blocks",
      subtitle: "Intricate patterns carved with precision"
    },
    {
      src: "/api/placeholder/1920/1080", // Woman doing block printing
      title: "Artisan Block Printing",
      subtitle: "Each design hand-printed with care"
    },
    {
      src: "/api/placeholder/1920/1080", // Man with fabrics
      title: "Traditional Pattern Display",
      subtitle: "Showcasing generations of textile artistry"
    },
    {
      src: "/api/placeholder/1920/1080", // Stacked fabrics
      title: "Finished Textile Collection",
      subtitle: "Beautiful patterns ready for the world"
    },
    {
      src: "/api/placeholder/1920/1080", // Hands on printing block
      title: "Masterful Craftsmanship",
      subtitle: "The delicate art of pattern creation"
    }
  ];

  useEffect(() => {
    // Loader animation duration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Hero image carousel
    if (!isLoading) {
      const interval = setInterval(() => {
        setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isLoading, heroImages.length]);

  useEffect(() => {
    // Advanced Intersection Observer for staggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, index * 150); // Staggered animation delay
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

  const nextHeroImage = () => {
    setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
  };

  const prevHeroImage = () => {
    setCurrentHeroImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="weaving-animation">
          <div className="advanced-loom">
            <div className="loom-frame">
              <div className="thread-group">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`thread thread-${i + 1}`}></div>
                ))}
              </div>
              <div className="shuttle-container">
                <div className="shuttle"></div>
                <div className="shuttle-trail"></div>
              </div>
            </div>
            <div className="weaving-particles">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`particle particle-${i + 1}`}></div>
              ))}
            </div>
          </div>
          <h2 className="loader-text">
            <span>Weaving</span>
            <span>Excellence</span>
          </h2>
          <div className="loader-progress">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Enhanced Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h1>
              <span className="logo-main">ARUNA</span>
              <span className="logo-sub">HANDLOOM</span>
            </h1>
          </div>
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <button onClick={() => scrollToSection('home')} className="nav-link">
              <span>Home</span>
              <div className="nav-link-border"></div>
            </button>
            <button onClick={() => scrollToSection('heritage')} className="nav-link">
              <span>Heritage</span>
              <div className="nav-link-border"></div>
            </button>
            <button onClick={() => scrollToSection('collection')} className="nav-link">
              <span>Collection</span>
              <div className="nav-link-border"></div>
            </button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">
              <span>Contact</span>
              <div className="nav-link-border"></div>
            </button>
          </div>
          <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section with Carousel */}
      <section id="home" className="hero-section">
        <div className="hero-carousel">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentHeroImage ? 'active' : ''}`}
            >
              <div className="hero-background">
                <img 
                  src={image.src}
                  alt={image.title}
                  className="hero-bg-image"
                />
                <div className="hero-overlay"></div>
              </div>
              <div className="slide-content">
                <h3 className="slide-title">{image.title}</h3>
                <p className="slide-subtitle">{image.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="hero-content">
          <div className="hero-badge animate-on-scroll">
            <span>Since 1989</span>
          </div>
          <h1 className="hero-title animate-on-scroll">
            <span className="title-line">ARUNA</span>
            <span className="title-line">HANDLOOM</span>
            <span className="title-line title-accent">FABRICS</span>
          </h1>
          <p className="hero-subtitle animate-on-scroll">
            Preserving India's textile heritage through generations of master craftsmanship since 1989
          </p>
          <div className="hero-buttons animate-on-scroll">
            <button 
              className="hero-cta primary"
              onClick={() => scrollToSection('collection')}
            >
              <span>Discover Our Fabrics</span>
              <div className="button-shine"></div>
            </button>
            <button 
              className="hero-cta secondary"
              onClick={() => scrollToSection('heritage')}
            >
              <span>Our Story</span>
            </button>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="carousel-controls">
          <button className="carousel-btn prev" onClick={prevHeroImage}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>
          <div className="carousel-indicators">
            {heroImages.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentHeroImage ? 'active' : ''}`}
                onClick={() => setCurrentHeroImage(index)}
              ></button>
            ))}
          </div>
          <button className="carousel-btn next" onClick={nextHeroImage}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-text">Scroll to explore</div>
          <div className="scroll-dot"></div>
        </div>
      </section>

      {/* Enhanced Heritage Section */}
      <section id="heritage" className="heritage-section">
        <div className="container">
          <div className="heritage-content">
            <div className="heritage-text animate-on-scroll">
              <div className="section-header">
                <span className="section-label">Our Story</span>
                <h2 className="section-title">Our Heritage</h2>
              </div>
              <div className="heritage-story">
                <p className="heritage-paragraph featured">
                  Since <span className="highlight">1989</span>, Aruna Handloom Fabrics has been a beacon of traditional Indian textile artistry. Our journey began with a simple yet profound vision: to preserve and celebrate the rich heritage of handloom weaving that has been passed down through generations of master craftsmen.
                </p>
                <p className="heritage-paragraph">
                  Every thread tells a story, every pattern carries the wisdom of <span className="highlight">centuries-old techniques</span>. Our skilled artisans don't just create fabrics; they weave dreams, traditions, and cultural narratives into each piece. From the gentle rhythm of the loom to the careful selection of natural dyes, we honor the time-tested methods that make each creation truly <span className="highlight">extraordinary</span>.
                </p>
              </div>
              <div className="heritage-stats animate-on-scroll">
                <div className="stat-item">
                  <div className="stat-number">35+</div>
                  <div className="stat-label">Years of Excellence</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Master Artisans</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">1000+</div>
                  <div className="stat-label">Unique Patterns</div>
                </div>
              </div>
            </div>
            <div className="heritage-image animate-on-scroll">
              <div className="image-container">
                <img 
                  src="https://images.unsplash.com/photo-1626889268968-2280ec97c38b" 
                  alt="Artisan Textile Crafting" 
                  className="heritage-img"
                />
                <div className="image-frame"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Collection Section */}
      <section id="collection" className="collection-section">
        <div className="container">
          <div className="section-header text-center animate-on-scroll">
            <span className="section-label">Our Expertise</span>
            <h2 className="section-title">Fabric Collection</h2>
          </div>
          
          <div className="collection-grid">
            <div className="fabric-card animate-on-scroll">
              <div className="card-image">
                <img 
                  src="https://images.pexels.com/photos/32500670/pexels-photo-32500670.jpeg" 
                  alt="Kalamkari Fabric" 
                />
                <div className="card-overlay">
                  <div className="overlay-content">
                    <h4>Traditional Art</h4>
                    <p>Hand-painted masterpieces</p>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="card-badge">Traditional</div>
                <h3 className="card-title">Kalamkari</h3>
                <p className="card-description">
                  Ancient art of hand-painting and block-printing on cotton and silk, featuring mythological narratives and floral motifs.
                </p>
                <button className="card-btn">
                  <span>View Process</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="fabric-card animate-on-scroll">
              <div className="card-image">
                <img 
                  src="https://images.unsplash.com/photo-1748141951488-9c9fb9603daf" 
                  alt="IKAT Textile" 
                />
                <div className="card-overlay">
                  <div className="overlay-content">
                    <h4>Geometric Beauty</h4>
                    <p>Resist-dyeing mastery</p>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="card-badge">Premium</div>
                <h3 className="card-title">IKAT</h3>
                <p className="card-description">
                  Intricate resist-dyeing technique creating geometric patterns with a distinctive feathered edge effect, showcasing master craftsmanship.
                </p>
                <button className="card-btn">
                  <span>View Process</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="fabric-card animate-on-scroll">
              <div className="card-image">
                <img 
                  src="https://images.unsplash.com/photo-1692365272628-530e24acc610" 
                  alt="Yarn Dyed Fabric" 
                />
                <div className="card-overlay">
                  <div className="overlay-content">
                    <h4>Vibrant Colors</h4>
                    <p>Pre-dyed excellence</p>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="card-badge">Exclusive</div>
                <h3 className="card-title">Yarn Dyed</h3>
                <p className="card-description">
                  Premium fabrics woven from pre-dyed yarns, creating vibrant, long-lasting colors and intricate check and stripe patterns.
                </p>
                <button className="card-btn">
                  <span>View Process</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="fabric-card animate-on-scroll">
              <div className="card-image">
                <img 
                  src="https://images.unsplash.com/photo-1681003564665-62848f8d481e" 
                  alt="Batik Fabric" 
                />
                <div className="card-overlay">
                  <div className="overlay-content">
                    <h4>Organic Patterns</h4>
                    <p>Wax-resist artistry</p>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="card-badge">Artisan</div>
                <h3 className="card-title">Batik</h3>
                <p className="card-description">
                  Traditional wax-resist dyeing technique creating beautiful, organic patterns with rich colors and cultural significance.
                </p>
                <button className="card-btn">
                  <span>View Process</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header text-center animate-on-scroll">
            <span className="section-label">Get in Touch</span>
            <h2 className="section-title">Connect With Us</h2>
          </div>
          
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
              <div className="contact-action">
                <button className="contact-btn">Get Directions</button>
              </div>
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
              <div className="contact-action">
                <button className="contact-btn">Call Now</button>
              </div>
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
              <div className="contact-action">
                <button className="contact-btn">Send Email</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h2>ARUNA HANDLOOM FABRICS</h2>
              <p>Preserving heritage, weaving futures.</p>
            </div>
            <div className="footer-links">
              <div className="footer-social">
                <button className="social-btn">Facebook</button>
                <button className="social-btn">Instagram</button>
                <button className="social-btn">LinkedIn</button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright">
              © 2024 Aruna Handloom Fabrics. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;