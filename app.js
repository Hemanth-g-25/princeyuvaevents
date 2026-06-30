/* ==========================================================================
   Prince Yuva Events - Interactive Logic Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. Header Scroll Effect
       ========================================== */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================
       2. Mobile Menu Toggle
       ========================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('open')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars-staggered';
        }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            mobileToggle.querySelector('i').className = 'fa-solid fa-bars-staggered';
            
            // Update active link styling
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    /* ==========================================
       3. Intersection Observer for Scroll Reveals
       ========================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================
       4. Stats Counters Animation
       ========================================== */
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let current = 0;
            const duration = 2000; // ms
            const stepTime = Math.max(Math.floor(duration / target), 15);
            
            const timer = setInterval(() => {
                current += Math.ceil(target / (duration / stepTime));
                if (current >= target) {
                    stat.innerText = target + (target === 100 || target === 12 || target === 25 ? '+' : '+');
                    clearInterval(timer);
                } else {
                    stat.innerText = current;
                }
            }, stepTime);
        });
    };

    const statsSection = document.querySelector('.stats-section');
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !statsAnimated) {
            animateStats();
            statsAnimated = true;
        }
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    /* ==========================================
       5. Service Packages Modal Data & Logic
       ========================================== */
    const serviceData = {
        wedding: {
            title: 'Royal Wedding Planning',
            category: 'Premium Weddings',
            img: 'assets/wedding.png',
            desc: 'We transform your wedding vision into a majestic royal affair. Our expert planners coordinate every element to ensure seamless execution, elegant setups, and an unforgettable celebration.',
            features: [
                'Bespoke royal stage design and theme backdrop installation',
                'Elite floral decoration (mandap, entrance pathways, tables)',
                'Coordination of professional sound, stage lighting, and SFX',
                'Pre-wedding engagement planning & sangeet stage execution',
                'Dedicated on-site bridal managers and guest relations support',
                'Silver service catering coordination with multi-cuisine menus'
            ],
            duration: 'Full Wedding (2-3 days)'
        },
        birthday: {
            title: 'Birthday & Party Management',
            category: 'Private Parties',
            img: 'assets/birthday.png',
            desc: 'Celebrate milestones in grand style. From kids theme birthdays to adult jubilee parties, we handle the color coordination, visual designs, entertainment setups, and dining catering.',
            features: [
                'Creative balloon arches & customized backdrop panels',
                'Customized dessert styling tables and themed cake placement',
                'Magic shows, interactive game hosts, and sound system setup',
                'Kids zone creation (bouncy house, painting booths, popcorn)',
                'Professional photography & cinematic birthday video coverage',
                'Party snack counters and custom dinner buffets'
            ],
            duration: 'Single day celebration'
        },
        corporate: {
            title: 'Corporate Conferences & Galas',
            category: 'Corporate Events',
            img: 'assets/corporate.png',
            desc: 'Clean, brand-aligned execution for annual meetups, award ceremonies, and product launches. We deliver high-fidelity logistics, premium audio-visual screens, and formal gala decorations.',
            features: [
                'Professional LED wall backdrop and customized banner prints',
                'Sleek speaker podium, modern stage seating, and lighting',
                'Premium line array audio systems and corporate sound mixers',
                'VIP guest registry desks, hostesses, and queue barriers',
                'Multi-camera video recording and livestream broadcasting setup',
                'Elegant high-tea spreads and multi-cuisine corporate lunch'
            ],
            duration: 'Conferences & Galas'
        },
        ceremony: {
            title: 'Engagements & Baby Showers',
            category: 'Intimate Ceremonies',
            img: 'assets/decor.png',
            desc: 'Cherish delicate moments with loved ones. We create intimate setups focusing on traditional themes, soft pastel color palettes, and cozy seating arrangements for family milestones.',
            features: [
                'Traditional swing (jhoola) decoration with natural floral design',
                'Elegant pastel backdrop panels or customized neon signs',
                'Varanasi silk background drapes and brass light props',
                'Mehndi artists coordination and live background instrumental music',
                'Premium sweets presentation displays and return-gift stalls',
                'Authentic traditional vegetarian catering packages'
            ],
            duration: 'Intimate Ceremonies'
        },
        decor: {
            title: 'Bespoke Theme Decorations',
            category: 'Design & Fabrication',
            img: 'assets/decor.png',
            desc: 'High-concept design fabrications for venues of all scales. We turn empty banquet halls and outdoor lawns into magical settings using bespoke lighting, drapery, and floral sculptures.',
            features: [
                'Exquisite tablescapes with custom linen, gold candelabras, and floral centers',
                'Pathways flanked by fairy lights, lanterns, and rose petals arches',
                'Ceiling canopy drapery with crystal chandeliers installation',
                'Custom photo booth corners with thematic props and neon lighting',
                'Traditional marigold temple setups or modern minimal glass arches',
                'Intelligent stage lighting program and dry-ice mist machines'
            ],
            duration: 'Venue Makeover'
        },
        catering: {
            title: 'Gourmet Catering & Dining Styles',
            category: 'Premium Catering',
            img: 'assets/catering.png',
            desc: 'Delight your guests with culinary experiences that look as good as they taste. We offer multi-cuisine catering spreads, interactive live food styling counters, and highly trained hospitality teams.',
            features: [
                'Menus featuring Royal Indian, Pan-Asian, Italian, and Continental cuisines',
                'Interactive live food styling stalls (tandoori, mocktails, chaat counters)',
                'Luxurious copper, brass, or silver buffet chafing dish presentation',
                'Curated mocktail bars and dessert displays with dry ice smoke effects',
                'Trained hospitality servers in matching thematic uniform attire',
                'Food tasting consultations prior to confirming final menu details'
            ],
            duration: 'Dining Curation'
        }
    };

    const modal = document.getElementById('service-modal');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body-content');
    const openModalButtons = document.querySelectorAll('.open-service-modal');

    const openServiceModal = (serviceKey) => {
        const data = serviceData[serviceKey];
        if (!data) return;

        let featuresHtml = '';
        data.features.forEach(feat => {
            featuresHtml += `<li><i class="fa-solid fa-circle-check text-gold"></i> ${feat}</li>`;
        });

        modalBody.innerHTML = `
            <div class="modal-heading">
                <span>${data.category}</span>
                <h3>${data.title}</h3>
            </div>
            <div class="modal-img">
                <img src="${data.img}" alt="${data.title}">
            </div>
            <p style="color: var(--text-dark); margin-bottom: 1.5rem; font-size: 0.95rem; line-height: 1.6;">${data.desc}</p>
            <div style="margin-bottom: 1.8rem;">
                <h5 style="color: var(--primary-deep); font-size: 1.05rem; margin-bottom: 0.8rem; font-weight: 600;">Key Inclusions:</h5>
                <ul class="modal-features-list" style="list-style: none; padding: 0;">
                    ${featuresHtml}
                </ul>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(15, 44, 89, 0.1); padding-top: 1.5rem;">
                <div>
                    <span style="font-size: 0.75rem; color: var(--text-muted); display: block; text-transform: uppercase; font-weight: 500;">Duration</span>
                    <strong style="color: var(--primary-blue); font-size: 0.95rem;">${data.duration}</strong>
                </div>
                <a href="#booking" class="btn btn-gold btn-sm modal-cta-btn">Enquire Package</a>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Bind modal CTA button to close and navigate
        const ctaBtn = modalBody.querySelector('.modal-cta-btn');
        ctaBtn.addEventListener('click', () => {
            closeServiceModal();
            // Pre-select category in booking wizard
            const bookingSelect = document.getElementById('book-event-type');
            if (bookingSelect) {
                // Match option names roughly
                const categoryMapping = {
                    'wedding': 'Wedding',
                    'birthday': 'Birthday',
                    'corporate': 'Corporate',
                    'ceremony': 'Engagement',
                    'decor': 'Custom Decoration',
                    'catering': 'Custom Decoration'
                };
                bookingSelect.value = categoryMapping[serviceKey] || '';
            }
        });
    };

    const closeServiceModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const serviceKey = button.getAttribute('data-service');
            openServiceModal(serviceKey);
        });
    });

    modalClose.addEventListener('click', closeServiceModal);
    modalOverlay.addEventListener('click', closeServiceModal);

    /* ==========================================
       6. Filterable Portfolio Gallery
       ========================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                // Animate filter change
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8) translateY(20px)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        item.style.display = 'block';
                        // Re-animate in
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1) translateY(0)';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    /* ==========================================
       7. Portfolio Lightbox Viewer
       ========================================== */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const galleryViewButtons = document.querySelectorAll('.gallery-view-btn');

    let activeItems = [];
    let currentLightboxIndex = 0;

    const updateActiveItems = () => {
        // Collect currently visible gallery items
        activeItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
    };

    const openLightbox = (index) => {
        updateActiveItems();
        currentLightboxIndex = index;
        const targetItem = activeItems[currentLightboxIndex];
        if (!targetItem) return;

        const imgSource = targetItem.querySelector('img').getAttribute('src');
        const captionText = targetItem.querySelector('.gallery-title').innerText;

        lightboxImg.setAttribute('src', imgSource);
        lightboxCaption.innerText = captionText;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    const showPrevImage = () => {
        currentLightboxIndex = (currentLightboxIndex - 1 + activeItems.length) % activeItems.length;
        openLightbox(currentLightboxIndex);
    };

    const showNextImage = () => {
        currentLightboxIndex = (currentLightboxIndex + 1) % activeItems.length;
        openLightbox(currentLightboxIndex);
    };

    galleryItems.forEach((item, index) => {
        // Double binding: clicking overlay or view button triggers lightbox
        const viewBtn = item.querySelector('.gallery-view-btn');
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            updateActiveItems();
            const activeIndex = activeItems.indexOf(item);
            openLightbox(activeIndex);
        });

        item.addEventListener('click', () => {
            updateActiveItems();
            const activeIndex = activeItems.indexOf(item);
            openLightbox(activeIndex);
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);

    // Close lightbox on overlay click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });



    /* ==========================================
       9. Testimonials Card Slider
       ========================================== */
    const slides = document.querySelectorAll('.testimonial-slide');
    const btnPrev = document.getElementById('slide-prev');
    const btnNext = document.getElementById('slide-next');
    const dotsContainer = document.getElementById('slider-dots');
    
    let currentSlideIndex = 0;
    let slideTimer;

    // Create Navigation dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    const updateSlider = () => {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            dots[index].classList.remove('active');
        });
        slides[currentSlideIndex].classList.add('active');
        dots[currentSlideIndex].classList.add('active');
    };

    const goToSlide = (index) => {
        currentSlideIndex = index;
        updateSlider();
        resetAutoplay();
    };

    const nextSlide = () => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateSlider();
    };

    const prevSlide = () => {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateSlider();
        resetAutoplay();
    };

    const startAutoplay = () => {
        slideTimer = setInterval(nextSlide, 6000);
    };

    const resetAutoplay = () => {
        clearInterval(slideTimer);
        startAutoplay();
    };

    btnNext.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });
    btnPrev.addEventListener('click', prevSlide);

    startAutoplay();

    /* ==========================================
       10. Step Booking Wizard (Multi-step)
       ========================================== */
    const stepContents = document.querySelectorAll('.form-step-content');
    const stepSteps = document.querySelectorAll('.progress-step');
    const btnNexts = document.querySelectorAll('.next-step');
    const btnPrevs = document.querySelectorAll('.prev-step');
    const bookingForm = document.getElementById('booking-wizard-form');

    let currentFormStepIndex = 1;

    const validateStep = (stepIndex) => {
        const stepPane = document.querySelector(`.form-step-content[data-step="${stepIndex}"]`);
        const inputs = stepPane.querySelectorAll('input[required], select[required]');
        
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'red';
                // Reset border color on input
                input.addEventListener('input', function resetBorder() {
                    input.style.borderColor = '';
                    input.removeEventListener('input', resetBorder);
                });
            } else if (input.type === 'tel') {
                // simple 10 digit validation
                const phoneReg = /^[0-9]{10}$/;
                if (!phoneReg.test(input.value.replace(/\s+/g, ''))) {
                    isValid = false;
                    input.style.borderColor = 'red';
                    alert('Please enter a valid 10-digit phone number.');
                }
            } else if (input.type === 'email') {
                const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailReg.test(input.value)) {
                    isValid = false;
                    input.style.borderColor = 'red';
                }
            }
        });

        return isValid;
    };

    const goToFormStep = (stepNumber) => {
        // Toggle Active pane
        stepContents.forEach(content => {
            content.classList.remove('active');
            if (parseInt(content.getAttribute('data-step')) === stepNumber) {
                content.classList.add('active');
            }
        });

        // Toggle Active progress bar nodes
        stepSteps.forEach(step => {
            const stepVal = parseInt(step.getAttribute('data-step'));
            step.classList.remove('active', 'completed');
            
            if (stepVal === stepNumber) {
                step.classList.add('active');
            } else if (stepVal < stepNumber) {
                step.classList.add('completed');
            }
        });

        currentFormStepIndex = stepNumber;
    };

    btnNexts.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentFormStepIndex)) {
                goToFormStep(currentFormStepIndex + 1);
            }
        });
    });

    btnPrevs.forEach(btn => {
        btn.addEventListener('click', () => {
            goToFormStep(currentFormStepIndex - 1);
        });
    });

    // Form submission -> Generate WhatsApp message redirection
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Capture all values
        const eventType = document.getElementById('book-event-type').value;
        const eventDate = document.getElementById('book-event-date').value;
        const guestCount = document.getElementById('book-guests').value;
        const fullName = document.getElementById('book-name').value;
        const phoneNum = document.getElementById('book-phone').value;
        const emailAddress = document.getElementById('book-email').value;
        const cateringPref = document.getElementById('book-catering').value;
        const decorPref = document.getElementById('book-decor').value;
        const customNotes = document.getElementById('book-notes').value || 'No special requirements specified.';

        // Build elegant WhatsApp message
        const whatsappNumber = '918867138478'; // Client booking handle number
        
        const messageText = `Hello Prince Yuva Events! I would like to book a luxury consultation:
        
👑 *EVENT DETAILS*
• Celebration Category: ${eventType}
• Proposed Date: ${eventDate}
• Guest Count: ${guestCount} Guests
        
👤 *CLIENT INFO*
• Name: ${fullName}
• Mobile: ${phoneNum}
• Email: ${emailAddress}
        
✨ *BESPOKE SELECTIONS*
• Catering Service: ${cateringPref}
• Decoration style: ${decorPref}
• Special Requests: ${customNotes}
        
Please let me know your availability for a creative consultation call. Thank you!`;

        // URL encode the message text
        const encodedText = encodeURIComponent(messageText);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

        // Redirect to WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Show success confirmation modal/state
        alert('Form completed! We are now redirecting you to WhatsApp to directly connect with Prince Yuva Events planning studio.');
        
        // Reset wizard form back to step 1
        bookingForm.reset();
        goToFormStep(1);
    });

    /* ==========================================
       11. Newsletter Form Mock Submission
       ========================================== */
    const newsletterForm = document.getElementById('newsletter-form');
    const newsSuccess = document.getElementById('news-success');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            newsletterForm.querySelector('input').value = '';
            newsSuccess.style.display = 'block';
            setTimeout(() => {
                newsSuccess.style.display = 'none';
            }, 5000);
        });
    }
});
