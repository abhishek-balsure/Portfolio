// ===================================
//   ABHISHEK BALSURE PORTFOLIO - JS
//   Interactive Functionality
// ===================================

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initThemeToggle();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initBackToTop();
    initProjectModals();
});

// ========== Navigation ==========
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const sections = document.querySelectorAll('section');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveLink();
    });
    
    // Mobile menu toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
    
    // Update active link based on scroll position
    function updateActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
}

// ========== Theme Toggle ==========
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        
        const isDark = body.classList.contains('dark-theme');
        themeToggle.innerHTML = isDark ? 
            '<i class="fas fa-sun"></i>' : 
            '<i class="fas fa-moon"></i>';
        
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// ========== Scroll Animations ==========
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const animateElements = document.querySelectorAll(
        '.section, .skill-category, .project-card, .cert-card, .about-highlights, .contact-card'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========== Skill Bars Animation ==========
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ========== Contact Form ==========
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// ========== Back to Top Button ==========
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ========== Project Modals ==========
function initProjectModals() {
    // Project data based on resume
    window.projectsData = [
        {
            title: 'AI-Based Smart Traffic Management System',
            type: 'Hackathon Project',
            description: 'Developed an intelligent traffic management solution using Python and web technologies during the Smart India Hackathon 2025. The system integrates a basic AI prediction model for traffic flow analysis and congestion detection. Collaborated with team members to design system architecture and implement core functionalities.',
            technologies: ['Python', 'AI/ML', 'Web Technologies', 'Data Analysis'],
            achievements: [
                'Secured 3rd Place at Internal Smart India Hackathon 2025',
                'Implemented AI prediction model for traffic flow analysis',
                'Designed comprehensive system architecture',
                'Developed congestion detection algorithms'
            ],
            learnings: [
                'Team collaboration in high-pressure hackathon environment',
                'Integration of AI/ML models with web applications',
                'System design and architecture planning',
                'Problem-solving for real-world traffic challenges'
            ]
        },
        {
            title: 'Tourism Management Website',
            type: 'Web Development Project',
            description: 'Built a comprehensive full-stack web application for managing tourism packages and bookings. The website features a responsive user interface compatible with both mobile and desktop devices. Implemented backend form handling with database integration for efficient user data management and learned server deployment basics.',
            technologies: ['HTML', 'CSS', 'PHP', 'Database (SQL)', 'Responsive Design'],
            achievements: [
                'Created fully responsive design for all devices',
                'Implemented secure form handling and validation',
                'Integrated database for user data management',
                'Learned and applied server deployment workflows'
            ],
            learnings: [
                'Full-stack web development with PHP',
                'Database design and integration',
                'Responsive web design principles',
                'Server deployment and hosting basics'
            ]
        },
        {
            title: 'Cybersecurity Learning & Research',
            type: 'Self-Learning Project',
            description: 'Set up virtualized security testing environments using Kali Linux and Parrot OS in VirtualBox. Performed basic network reconnaissance and vulnerability scanning using industry-standard tools like Nmap and OSINT tools. Explored various ethical hacking tools from GitHub to build a strong foundation in cybersecurity principles, attack methodologies, and defense strategies.',
            technologies: ['Kali Linux', 'Parrot OS', 'VirtualBox', 'Nmap', 'OSINT Tools', 'Penetration Testing Tools'],
            achievements: [
                'Successfully configured multiple security testing VMs',
                'Performed network reconnaissance and scanning',
                'Gained hands-on experience with ethical hacking tools',
                'Built strong foundation in cybersecurity concepts'
            ],
            learnings: [
                'Virtualization and VM management',
                'Network scanning and reconnaissance techniques',
                'OSINT (Open Source Intelligence) gathering',
                'Ethical hacking principles and methodologies',
                'Security testing environment setup'
            ]
        }
    ];
}

// Open project modal
window.openProjectModal = function(projectIndex) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const project = window.projectsData[projectIndex];
    
    if (!project) return;
    
    modalBody.innerHTML = `
        <h2 style="font-size: 28px; font-weight: 700; margin-bottom: 10px; color: var(--text-primary);">
            ${project.title}
        </h2>
        <p style="font-size: 14px; color: var(--primary); font-weight: 500; margin-bottom: 20px;">
            ${project.type}
        </p>
        
        <div style="margin-bottom: 25px;">
            <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 12px; color: var(--text-primary);">
                Project Overview
            </h3>
            <p style="font-size: 15px; line-height: 1.7; color: var(--text-secondary);">
                ${project.description}
            </p>
        </div>
        
        <div style="margin-bottom: 25px;">
            <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 12px; color: var(--text-primary);">
                Technologies Used
            </h3>
            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                ${project.technologies.map(tech => `
                    <span style="padding: 8px 16px; background: linear-gradient(135deg, var(--primary), var(--accent)); 
                                 color: white; border-radius: 20px; font-size: 14px; font-weight: 500;">
                        ${tech}
                    </span>
                `).join('')}
            </div>
        </div>
        
        <div style="margin-bottom: 25px;">
            <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 12px; color: var(--text-primary);">
                Key Achievements
            </h3>
            <ul style="list-style: none; padding: 0;">
                ${project.achievements.map(achievement => `
                    <li style="padding: 8px 0; color: var(--text-secondary); display: flex; align-items: start; gap: 10px;">
                        <i class="fas fa-check-circle" style="color: var(--secondary); margin-top: 4px; font-size: 16px;"></i>
                        <span style="flex: 1;">${achievement}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
        
        <div style="padding: 20px; background: var(--bg-gray); border-radius: 12px; border-left: 4px solid var(--primary);">
            <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px; color: var(--text-primary);">
                <i class="fas fa-lightbulb" style="color: var(--primary);"></i> What I Learned
            </h4>
            <ul style="list-style: none; padding: 0;">
                ${project.learnings.map(learning => `
                    <li style="padding: 6px 0; color: var(--text-secondary); display: flex; align-items: start; gap: 10px;">
                        <i class="fas fa-arrow-right" style="color: var(--primary); margin-top: 4px; font-size: 12px;"></i>
                        <span style="flex: 1;">${learning}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

// Close project modal
window.closeProjectModal = function() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
};

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

// ========== Copy to Clipboard ==========
window.copyToClipboard = function(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copied to clipboard!', 'success');
        }).catch(() => {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
};

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Copied to clipboard!', 'success');
    } catch (err) {
        showNotification('Failed to copy', 'error');
    }
    
    document.body.removeChild(textarea);
}

// ========== Notification System ==========
function showNotification(message, type = 'success') {
    const container = document.getElementById('notificationContainer');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'error' ? 'fa-exclamation-circle' : 
                 'fa-info-circle';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            if (notification.parentNode === container) {
                container.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ========== Smooth Scroll ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========== Console Message ==========
console.log('%c👋 Hello, Developer!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #64748b;');
console.log('%c📧 balsureabhishek@gmail.com', 'font-size: 14px; color: #10b981;');
console.log('%c💼 Open for internship opportunities!', 'font-size: 14px; color: #6366f1;');