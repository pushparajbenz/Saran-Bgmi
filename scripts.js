// ===== BMGI Live - Premium Streamer Website =====
// JavaScript for animations, particles, and functionality

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavigation();
    initScrollAnimations();
    initSmoothScroll();
    loadYouTubeVideos();
    initContactForm();
});

// ===== Particle System =====
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 80;
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.glitter = Math.random() > 0.7;
            this.glitterPhase = Math.random() * Math.PI * 2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.glitterPhase += 0.05;
            
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            let opacity = this.opacity;
            if (this.glitter) {
                opacity = this.opacity * (0.5 + 0.5 * Math.sin(this.glitterPhase));
            }
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 168, 89, ${opacity})`;
            ctx.fill();
            
            // Glow effect
            if (this.glitter && opacity > 0.4) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 168, 89, ${opacity * 0.3})`;
                ctx.fill();
            }
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 168, 89, ${0.1 * (1 - distance / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ===== Navigation =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Update active nav on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-slide-left, .animate-slide-right, .animate-fade-in-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== YouTube Videos =====
// Replace with your YouTube Data API key and Channel ID
const YOUTUBE_API_KEY = 'YOUR_API_KEY_HERE'; // Get from Google Cloud Console
const CHANNEL_ID = 'YOUR_CHANNEL_ID_HERE'; // Your YouTube Channel ID

async function loadYouTubeVideos() {
    const videosGrid = document.getElementById('videos-grid');
    if (!videosGrid) return;
    
    // Check if API key is configured
    if (YOUTUBE_API_KEY === 'YOUR_API_KEY_HERE') {
        // Load sample videos for demo
        loadSampleVideos(videosGrid);
        return;
    }
    
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=6&type=video`
        );
        
        if (!response.ok) throw new Error('API request failed');
        
        const data = await response.json();
        displayVideos(data.items, videosGrid);
    } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        loadSampleVideos(videosGrid);
    }
}

function displayVideos(videos, container) {
    container.innerHTML = '';
    
    videos.forEach(video => {
        const videoId = video.id.videoId || video.id;
        const snippet = video.snippet;
        
        const card = document.createElement('a');
        card.href = `https://www.youtube.com/watch?v=${videoId}`;
        card.target = '_blank';
        card.rel = 'noopener';
        card.className = 'video-card';
        
        card.innerHTML = `
            <div class="video-thumbnail">
                <img src="${snippet.thumbnails.high?.url || snippet.thumbnails.medium?.url}" alt="${snippet.title}">
                <div class="video-play">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </div>
            </div>
            <div class="video-info">
                <h3 class="video-title">${snippet.title}</h3>
                <p class="video-meta">${formatDate(snippet.publishedAt)}</p>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function loadSampleVideos(container) {
    const sampleVideos = [
        {
            id: 'sample1',
            snippet: {
                title: 'Epic Gaming Stream Highlights | Best Moments',
                publishedAt: new Date().toISOString(),
                thumbnails: { high: { url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' } }
            }
        },
        {
            id: 'sample2',
            snippet: {
                title: 'Community Game Night | Live Reactions',
                publishedAt: new Date(Date.now() - 86400000).toISOString(),
                thumbnails: { high: { url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' } }
            }
        },
        {
            id: 'sample3',
            snippet: {
                title: 'New Game Release | First Impressions',
                publishedAt: new Date(Date.now() - 172800000).toISOString(),
                thumbnails: { high: { url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' } }
            }
        },
        {
            id: 'sample4',
            snippet: {
                title: 'Behind the Scenes | Streaming Setup Tour',
                publishedAt: new Date(Date.now() - 259200000).toISOString(),
                thumbnails: { high: { url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' } }
            }
        },
        {
            id: 'sample5',
            snippet: {
                title: 'Subscriber Special | Q&A Session',
                publishedAt: new Date(Date.now() - 345600000).toISOString(),
                thumbnails: { high: { url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' } }
            }
        },
        {
            id: 'sample6',
            snippet: {
                title: 'Weekly Highlights | Top Plays Compilation',
                publishedAt: new Date(Date.now() - 432000000).toISOString(),
                thumbnails: { high: { url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' } }
            }
        }
    ];
    
    displayVideos(sampleVideos.map(v => ({ id: { videoId: v.id }, snippet: v.snippet })), container);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
}

// ===== Contact Form =====
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        
        button.innerHTML = '<span>Sending...</span>';
        button.disabled = true;
        
        // Simulate form submission (replace with actual backend)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        button.innerHTML = '<span>Message Sent!</span>';
        button.style.background = 'linear-gradient(135deg, #00C96A 0%, #00A859 100%)';
        
        form.reset();
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            button.style.background = '';
        }, 3000);
    });
}

// ===== Additional Glitter Effect on Headings =====
document.querySelectorAll('.glitter-text').forEach(el => {
    // Add multiple sparkle elements
    for (let i = 0; i < 3; i++) {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.style.cssText = `
            position: absolute;
            width: ${10 + Math.random() * 10}px;
            height: ${10 + Math.random() * 10}px;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2300A859'%3E%3Cpath d='M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z'/%3E%3C/svg%3E") no-repeat center;
            background-size: contain;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: twinkle ${1.5 + Math.random()}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            pointer-events: none;
        `;
        el.style.position = 'relative';
        el.appendChild(sparkle);
    }
});

// ===== Parallax Effect on Scroll =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroGlow = document.querySelector('.hero-glow');
    if (heroGlow) {
        heroGlow.style.transform = `translate(-50%, -50%) scale(${1 + scrolled * 0.0005})`;
    }
});
