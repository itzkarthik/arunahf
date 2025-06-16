import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    category: '',
    quantity: '',
    message: '',
    inquiry_type: 'general'
  });

  // Hero images showcase traditional craftsmanship
  const heroImages = [
    {
      src: "https://images.pexels.com/photos/28613841/pexels-photo-28613841.jpeg",
      title: "Traditional Handloom Weaving",
      subtitle: "Master craftsmen preserving ancient techniques"
    },
    {
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3Cpattern id='wood' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Crect fill='%23D4A574' width='40' height='40'/%3E%3Cpath d='M0 20h40M20 0v40' stroke='%23B8935A' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23wood)' width='800' height='600'/%3E%3Cg transform='translate(200,150)'%3E%3Crect fill='%238B4513' width='80' height='120' rx='8'/%3E%3Cpath fill='%23654321' d='M10,20 Q40,10 70,20 Q40,30 10,20'/%3E%3Cpath fill='%23654321' d='M10,40 Q40,30 70,40 Q40,50 10,40'/%3E%3Cpath fill='%23654321' d='M10,60 Q40,50 70,60 Q40,70 10,60'/%3E%3Cpath fill='%23654321' d='M10,80 Q40,70 70,80 Q40,90 10,80'/%3E%3Cpath fill='%23654321' d='M10,100 Q40,90 70,100 Q40,110 10,100'/%3E%3C/g%3E%3Cg transform='translate(350,150)'%3E%3Crect fill='%238B4513' width='80' height='120' rx='8'/%3E%3Cpath fill='%23654321' d='M10,20 L70,20 L60,30 L20,30 Z'/%3E%3Cpath fill='%23654321' d='M10,50 L70,50 L60,60 L20,60 Z'/%3E%3Cpath fill='%23654321' d='M10,80 L70,80 L60,90 L20,90 Z'/%3E%3C/g%3E%3Ctext x='400' y='350' text-anchor='middle' fill='%23654321' font-size='24' font-weight='bold'%3EHand-Carved Printing Blocks%3C/text%3E%3C/svg%3E",
      title: "Hand-Carved Printing Blocks",
      subtitle: "Intricate patterns carved with precision"
    },
    {
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23E8D5B7'/%3E%3Cstop offset='100%25' stop-color='%23D4C2A5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23bg)' width='800' height='600'/%3E%3Cg transform='translate(150,100)'%3E%3Cellipse fill='%23DEB887' cx='250' cy='200' rx='200' ry='150'/%3E%3Crect fill='%2320B2AA' x='100' y='150' width='300' height='100' rx='10'/%3E%3Cpath fill='%23FF6347' d='M50,200 Q250,100 450,200 Q250,300 50,200'/%3E%3Ccircle fill='%23DAA520' cx='200' cy='180' r='15'/%3E%3Ccircle fill='%23DAA520' cx='300' cy='220' r='15'/%3E%3Ctext x='250' y='400' text-anchor='middle' fill='%23654321' font-size='20' font-weight='bold'%3EArtisan Block Printing%3C/text%3E%3C/g%3E%3C/svg%3E",
      title: "Artisan Block Printing",
      subtitle: "Each design hand-printed with care"
    },
    {
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3Cpattern id='fabric' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Crect fill='%23F4E4C1' width='60' height='60'/%3E%3Ccircle fill='%23C9A96E' cx='30' cy='30' r='20'/%3E%3Cpath fill='%238B7355' d='M15,15 Q30,5 45,15 Q30,25 15,15'/%3E%3Cpath fill='%238B7355' d='M15,45 Q30,35 45,45 Q30,55 15,45'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23fabric)' width='800' height='600'/%3E%3Cg transform='translate(200,200)'%3E%3Crect fill='%238B4513' x='0' y='0' width='400' height='200' rx='20'/%3E%3Cpath fill='%23DAA520' d='M50,50 Q200,20 350,50 Q200,80 50,50'/%3E%3Cpath fill='%23FF6347' d='M50,100 Q200,70 350,100 Q200,130 50,100'/%3E%3Cpath fill='%2320B2AA' d='M50,150 Q200,120 350,150 Q200,180 50,150'/%3E%3Ctext x='200' y='250' text-anchor='middle' fill='%23654321' font-size='20' font-weight='bold'%3ETraditional Pattern Display%3C/text%3E%3C/g%3E%3C/svg%3E",
      title: "Traditional Pattern Display",
      subtitle: "Showcasing generations of textile artistry"
    },
    {
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect fill='%23F5F5DC' width='800' height='600'/%3E%3Cg transform='translate(100,100)'%3E%3Crect fill='%23DEB887' x='0' y='0' width='600' height='400' rx='15'/%3E%3Cg transform='translate(50,50)'%3E%3Crect fill='%23CD853F' width='120' height='80' x='0' y='0'/%3E%3Crect fill='%23A0522D' width='120' height='80' x='140' y='0'/%3E%3Crect fill='%23D2691E' width='120' height='80' x='280' y='0'/%3E%3Crect fill='%23B22222' width='120' height='80' x='420' y='0'/%3E%3Crect fill='%23228B22' width='120' height='80' x='0' y='100'/%3E%3Crect fill='%234682B4' width='120' height='80' x='140' y='100'/%3E%3Crect fill='%239932CC' width='120' height='80' x='280' y='100'/%3E%3Crect fill='%23FF1493' width='120' height='80' x='420' y='100'/%3E%3Crect fill='%23FFD700' width='120' height='80' x='0' y='200'/%3E%3Crect fill='%23FF4500' width='120' height='80' x='140' y='200'/%3E%3Crect fill='%23008B8B' width='120' height='80' x='280' y='200'/%3E%3Crect fill='%23800080' width='120' height='80' x='420' y='200'/%3E%3C/g%3E%3Ctext x='300' y='450' text-anchor='middle' fill='%23654321' font-size='20' font-weight='bold'%3EFinished Textile Collection%3C/text%3E%3C/g%3E%3C/svg%3E",
      title: "Finished Textile Collection",
      subtitle: "Beautiful patterns ready for the world"
    },
    {
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect fill='%23F0E68C' width='800' height='600'/%3E%3Cg transform='translate(250,150)'%3E%3Cellipse fill='%23DEB887' cx='150' cy='150' rx='120' ry='100'/%3E%3Crect fill='%238B4513' x='50' y='100' width='200' height='100' rx='10'/%3E%3Ccircle fill='%23CD853F' cx='100' cy='150' r='30'/%3E%3Ccircle fill='%23A0522D' cx='200' cy='150' r='30'/%3E%3Cpath fill='%23654321' d='M80,130 Q150,110 220,130 Q150,150 80,130'/%3E%3Cpath fill='%23654321' d='M80,170 Q150,150 220,170 Q150,190 80,170'/%3E%3Ctext x='150' y='350' text-anchor='middle' fill='%23654321' font-size='18' font-weight='bold'%3EMasterful Craftsmanship%3C/text%3E%3C/g%3E%3C/svg%3E",
      title: "Masterful Craftsmanship",
      subtitle: "The delicate art of pattern creation"
    }
  ];

  // Fabric data with detailed information
  const fabricData = {
    kalamkari: {
      title: "Kalamkari",
      badge: "Traditional",
      description: "Ancient art of hand-painting and block-printing on cotton and silk, featuring mythological narratives and floral motifs.",
      detailedDescription: "Kalamkari is a traditional Indian art form that originated in Andhra Pradesh and Telangana. The word 'Kalamkari' is derived from 'kalam' (pen) and 'kari' (work), literally meaning 'pen work'. This ancient technique involves hand-painting or block-printing intricate designs using natural dyes on cotton or silk fabrics. The process includes multiple stages of treatment, painting, dyeing, and washing, creating stunning narratives from Hindu mythology, floral patterns, and nature-inspired motifs.",
      image: "https://images.pexels.com/photos/32500670/pexels-photo-32500670.jpeg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual Kalamkari making video
      process: [
        "Fabric preparation with cow dung and bleaching",
        "Sketching the design with charcoal",
        "Outlining with iron and jaggery solution",
        "Filling colors with natural dyes",
        "Multiple washing and treatment cycles",
        "Final finishing and quality check"
      ],
      colors: ["Natural Black", "Iron Red", "Madder Red", "Turmeric Yellow", "Indigo Blue"],
      applications: ["Sarees", "Dupattas", "Wall Hangings", "Bed Sheets", "Dress Materials"]
    },
    ikat: {
      title: "IKAT",
      badge: "Premium",
      description: "Intricate resist-dyeing technique creating geometric patterns with a distinctive feathered edge effect, showcasing master craftsmanship.",
      detailedDescription: "IKAT is a resist-dyeing technique where threads are dyed before weaving, creating distinctive geometric patterns with soft, feathered edges. The word 'IKAT' comes from the Malay-Indonesian word 'mengikat', meaning 'to tie or bind'. This ancient technique requires exceptional skill as the patterns are created by binding specific sections of threads before dyeing, then carefully aligning them during weaving to form the final design.",
      image: "https://images.unsplash.com/photo-1748141951488-9c9fb9603daf",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual IKAT making video
      process: [
        "Design planning and thread calculation",
        "Binding threads according to pattern",
        "Dyeing process with natural colors",
        "Careful unbinding and re-binding",
        "Multiple dyeing cycles for complex patterns",
        "Precise weaving to align patterns"
      ],
      colors: ["Deep Indigo", "Madder Red", "Natural Black", "Turmeric Yellow", "Pomegranate Pink"],
      applications: ["Pochampally Sarees", "Dupatta Sets", "Home Furnishing", "Stoles", "Dress Fabrics"]
    },
    yarndyed: {
      title: "Yarn Dyed",
      badge: "Exclusive",
      description: "Premium fabrics woven from pre-dyed yarns, creating vibrant, long-lasting colors and intricate check and stripe patterns.",
      detailedDescription: "Yarn-dyed fabrics are created by dyeing the individual yarns before weaving them into fabric. This process results in superior color fastness, vibrant hues, and the ability to create complex patterns like checks, plaids, and stripes. The technique allows for precise color placement and creates fabrics with exceptional durability and rich, saturated colors that maintain their brilliance even after multiple washes.",
      image: "https://images.unsplash.com/photo-1692365272628-530e24acc610",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual Yarn Dyed making video
      process: [
        "Yarn preparation and winding",
        "Color planning and dye preparation",
        "Yarn dyeing in controlled batches",
        "Drying and conditioning",
        "Warping according to pattern design",
        "Weaving with precise color placement"
      ],
      colors: ["Vibrant Reds", "Deep Blues", "Forest Greens", "Golden Yellows", "Rich Purples"],
      applications: ["Shirting Fabrics", "Check Patterns", "Stripe Designs", "Home Textiles", "Fashion Garments"]
    },
    batik: {
      title: "Batik",
      badge: "Artisan",
      description: "Traditional wax-resist dyeing technique creating beautiful, organic patterns with rich colors and cultural significance.",
      detailedDescription: "Batik is an ancient wax-resist dyeing technique that creates intricate patterns through the application of wax and successive dyeing processes. Originating in Indonesia but widely practiced in India, this art form involves applying hot wax to fabric areas that should remain undyed, then immersing the fabric in dye. The process can be repeated multiple times to create complex, layered designs with rich color combinations and organic, flowing patterns.",
      image: "https://images.unsplash.com/photo-1681003564665-62848f8d481e",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual Batik making video
      process: [
        "Fabric preparation and stretching",
        "Design sketching and planning",
        "Hot wax application using tjanting tools",
        "First dyeing with lightest color",
        "Additional wax application and dyeing",
        "Wax removal through boiling process"
      ],
      colors: ["Indigo Blue", "Deep Brown", "Rust Orange", "Natural Cream", "Maroon Red"],
      applications: ["Traditional Garments", "Art Pieces", "Scarves", "Table Runners", "Decorative Fabrics"]
    },
    patchwork: {
      title: "Patch Work Fabrics",
      badge: "Creative",
      description: "Artistically assembled fabric pieces creating unique patterns through careful stitching and creative combinations.",
      detailedDescription: "Patchwork fabric is the art of sewing together pieces of fabric into a larger design. This technique combines different colors, patterns, and textures to create visually stunning and unique textiles. Our skilled artisans carefully select and arrange fabric pieces to create harmonious designs that tell stories through color and pattern. Each patchwork piece is meticulously crafted, ensuring durability and aesthetic appeal.",
      image: "https://images.pexels.com/photos/6764690/pexels-photo-6764690.jpeg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual Patchwork making video
      process: [
        "Design planning and fabric selection",
        "Cutting fabric pieces to precise measurements",
        "Color coordination and pattern arrangement",
        "Hand or machine stitching of pieces",
        "Border application and finishing",
        "Quality control and final pressing"
      ],
      colors: ["Multi-colored", "Coordinated Palettes", "Contrasting Combinations", "Earth Tones", "Vibrant Mixes"],
      applications: ["Quilts", "Home Decor", "Fashion Accessories", "Bags & Purses", "Decorative Panels"]
    },
    rotaryprint: {
      title: "Rotary Print Garments",
      badge: "Modern",
      description: "High-quality machine-printed fabrics with consistent patterns and vibrant colors using advanced rotary printing technology.",
      detailedDescription: "Rotary printing is a modern textile printing method that uses cylindrical screens to apply designs to fabric continuously. This technique allows for high-speed, consistent printing of complex patterns with excellent color registration. Our rotary print fabrics combine traditional Indian motifs with contemporary designs, creating versatile textiles suitable for both traditional and modern garments.",
      image: "https://images.unsplash.com/photo-1701887875566-dec20a2ad137",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual Rotary Print making video
      process: [
        "Design digitization and screen preparation",
        "Color mixing and consistency testing",
        "Fabric preparation and alignment",
        "Continuous rotary printing process",
        "Heat setting and color fixation",
        "Quality inspection and finishing"
      ],
      colors: ["Bright Florals", "Geometric Patterns", "Traditional Motifs", "Contemporary Designs", "Fashion Colors"],
      applications: ["Ready-made Garments", "Kurtas & Kurtis", "Children's Wear", "Casual Clothing", "Fashion Apparel"]
    },
    pintuck: {
      title: "Pintuck Fabrics",
      badge: "Elegant",
      description: "Sophisticated fabrics featuring delicate pleated detailing that adds texture, dimension, and refined elegance to garments.",
      detailedDescription: "Pintuck fabrics are characterized by narrow, decorative pleats that are stitched into the fabric to create texture and visual interest. This technique adds dimension and sophistication to textiles, creating elegant surface patterns through the play of light and shadow. Our pintuck fabrics are carefully crafted to maintain consistency in pleat spacing and depth, resulting in luxurious textiles perfect for formal and semi-formal wear.",
      image: "https://images.unsplash.com/photo-1601232251778-81ba856938c8",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual Pintuck making video
      process: [
        "Fabric preparation and marking",
        "Precision pleating with specialized equipment",
        "Steam setting of pleats",
        "Careful stitching to secure pleats",
        "Final pressing and shaping",
        "Quality assessment and finishing"
      ],
      colors: ["Classic White", "Soft Pastels", "Rich Jewel Tones", "Elegant Neutrals", "Metallic Accents"],
      applications: ["Formal Shirts", "Blouses", "Wedding Wear", "Party Dresses", "Premium Garments"]
    },
    gray: {
      title: "Gray Fabrics",
      badge: "Versatile",
      description: "Timeless gray fabrics in various shades and textures, providing sophisticated neutrals for diverse applications and styling needs.",
      detailedDescription: "Gray fabrics represent the epitome of versatility and sophistication in textile design. Our collection includes various shades from light silver-gray to deep charcoal, each carefully woven or dyed to achieve the perfect tone and texture. Gray fabrics serve as excellent foundations for both traditional and contemporary designs, offering endless possibilities for coordination with other colors and patterns.",
      image: "https://images.unsplash.com/photo-1715867125247-120c0fc4593b",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual Gray Fabric making video
      process: [
        "Yarn selection and quality testing",
        "Precise dye formulation for desired shade",
        "Controlled dyeing process",
        "Weaving with attention to texture",
        "Finishing treatments for durability",
        "Color consistency verification"
      ],
      colors: ["Light Silver", "Medium Gray", "Charcoal", "Blue-Gray", "Warm Gray"],
      applications: ["Suiting", "Formal Wear", "Home Textiles", "Corporate Uniforms", "Contemporary Fashion"]
    }
  };

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

  const openModal = (fabricKey) => {
    setActiveModal(fabricKey);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = 'unset';
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will contact you soon.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      category: '',
      quantity: '',
      message: '',
      inquiry_type: 'general'
    });
  };

  const scrollToForm = () => {
    closeModal();
    setTimeout(() => {
      scrollToSection('inquiry-form');
    }, 300);
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
            <button onClick={() => scrollToSection('inquiry-form')} className="nav-link">
              <span>Inquiry</span>
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
                  src={fabricData.kalamkari.image}
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
                <div className="card-badge">{fabricData.kalamkari.badge}</div>
                <h3 className="card-title">{fabricData.kalamkari.title}</h3>
                <p className="card-description">
                  {fabricData.kalamkari.description}
                </p>
                <button className="card-btn" onClick={() => openModal('kalamkari')}>
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
                  src={fabricData.ikat.image}
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
                <div className="card-badge">{fabricData.ikat.badge}</div>
                <h3 className="card-title">{fabricData.ikat.title}</h3>
                <p className="card-description">
                  {fabricData.ikat.description}
                </p>
                <button className="card-btn" onClick={() => openModal('ikat')}>
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
                  src={fabricData.yarndyed.image}
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
                <div className="card-badge">{fabricData.yarndyed.badge}</div>
                <h3 className="card-title">{fabricData.yarndyed.title}</h3>
                <p className="card-description">
                  {fabricData.yarndyed.description}
                </p>
                <button className="card-btn" onClick={() => openModal('yarndyed')}>
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
                  src={fabricData.batik.image}
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
                <div className="card-badge">{fabricData.batik.badge}</div>
                <h3 className="card-title">{fabricData.batik.title}</h3>
                <p className="card-description">
                  {fabricData.batik.description}
                </p>
                <button className="card-btn" onClick={() => openModal('batik')}>
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
                  src={fabricData.patchwork.image}
                  alt="Patch Work Fabrics" 
                />
                <div className="card-overlay">
                  <div className="overlay-content">
                    <h4>Creative Assembly</h4>
                    <p>Artistic combinations</p>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="card-badge">{fabricData.patchwork.badge}</div>
                <h3 className="card-title">{fabricData.patchwork.title}</h3>
                <p className="card-description">
                  {fabricData.patchwork.description}
                </p>
                <button className="card-btn" onClick={() => openModal('patchwork')}>
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
                  src={fabricData.rotaryprint.image}
                  alt="Rotary Print Garments" 
                />
                <div className="card-overlay">
                  <div className="overlay-content">
                    <h4>Modern Printing</h4>
                    <p>Consistent patterns</p>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="card-badge">{fabricData.rotaryprint.badge}</div>
                <h3 className="card-title">{fabricData.rotaryprint.title}</h3>
                <p className="card-description">
                  {fabricData.rotaryprint.description}
                </p>
                <button className="card-btn" onClick={() => openModal('rotaryprint')}>
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
                  src={fabricData.pintuck.image}
                  alt="Pintuck Fabrics" 
                />
                <div className="card-overlay">
                  <div className="overlay-content">
                    <h4>Elegant Pleating</h4>
                    <p>Sophisticated texture</p>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="card-badge">{fabricData.pintuck.badge}</div>
                <h3 className="card-title">{fabricData.pintuck.title}</h3>
                <p className="card-description">
                  {fabricData.pintuck.description}
                </p>
                <button className="card-btn" onClick={() => openModal('pintuck')}>
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
                  src={fabricData.gray.image}
                  alt="Gray Fabrics" 
                />
                <div className="card-overlay">
                  <div className="overlay-content">
                    <h4>Timeless Neutrals</h4>
                    <p>Versatile sophistication</p>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="card-badge">{fabricData.gray.badge}</div>
                <h3 className="card-title">{fabricData.gray.title}</h3>
                <p className="card-description">
                  {fabricData.gray.description}
                </p>
                <button className="card-btn" onClick={() => openModal('gray')}>
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

      {/* New Inquiry Form Section */}
      <section id="inquiry-form" className="inquiry-section">
        <div className="container">
          <div className="section-header text-center animate-on-scroll">
            <span className="section-label">Get Started</span>
            <h2 className="section-title">Submit Your Inquiry</h2>
            <p className="section-description">
              Tell us about your textile needs and we'll provide personalized solutions
            </p>
          </div>

          <div className="form-container animate-on-scroll">
            <form onSubmit={handleFormSubmit} className="inquiry-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company / Organization</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleFormChange}
                    placeholder="Company name (optional)"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inquiry_type">Inquiry Type *</label>
                  <select
                    id="inquiry_type"
                    name="inquiry_type"
                    value={formData.inquiry_type}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="general">General Inquiry</option>
                    <option value="wholesale">Wholesale Orders</option>
                    <option value="custom">Custom Design</option>
                    <option value="sample">Sample Request</option>
                    <option value="collaboration">Business Collaboration</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="category">Fabric Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                  >
                    <option value="">Select a category</option>
                    <option value="kalamkari">Kalamkari</option>
                    <option value="ikat">IKAT</option>
                    <option value="yarndyed">Yarn Dyed</option>
                    <option value="batik">Batik</option>
                    <option value="mixed">Multiple Categories</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="quantity">Estimated Quantity</label>
                  <select
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleFormChange}
                  >
                    <option value="">Select quantity range</option>
                    <option value="1-10">1-10 meters</option>
                    <option value="10-50">10-50 meters</option>
                    <option value="50-100">50-100 meters</option>
                    <option value="100-500">100-500 meters</option>
                    <option value="500+">500+ meters</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Message / Requirements *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    rows="5"
                    placeholder="Please describe your requirements, preferred colors, delivery timeline, or any specific questions you have..."
                  ></textarea>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  <span>Submit Inquiry</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m22 2-7 20-4-9-9-4z"/>
                    <path d="m22 2-10 10"/>
                  </svg>
                </button>
                <p className="form-note">
                  We'll respond to your inquiry within 24 hours
                </p>
              </div>
            </form>
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

      {/* Fabric Detail Modal */}
      {activeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="modal-header">
              <div className="modal-badge">{fabricData[activeModal].badge}</div>
              <h2>{fabricData[activeModal].title}</h2>
              <p>{fabricData[activeModal].description}</p>
            </div>

            <div className="modal-body">
              <div className="modal-video">
                <iframe
                  src={fabricData[activeModal].videoUrl}
                  title={`${fabricData[activeModal].title} Making Process`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="modal-details">
                <div className="detail-section">
                  <h3>About {fabricData[activeModal].title}</h3>
                  <p>{fabricData[activeModal].detailedDescription}</p>
                </div>

                <div className="detail-section">
                  <h3>Manufacturing Process</h3>
                  <ul className="process-list">
                    {fabricData[activeModal].process.map((step, index) => (
                      <li key={index}>
                        <span className="step-number">{index + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="detail-grid">
                  <div className="detail-section">
                    <h3>Color Palette</h3>
                    <ul className="color-list">
                      {fabricData[activeModal].colors.map((color, index) => (
                        <li key={index}>{color}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="detail-section">
                    <h3>Applications</h3>
                    <ul className="application-list">
                      {fabricData[activeModal].applications.map((app, index) => (
                        <li key={index}>{app}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="modal-btn secondary" onClick={closeModal}>
                Close
              </button>
              <button className="modal-btn primary" onClick={scrollToForm}>
                Inquire Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default App;
