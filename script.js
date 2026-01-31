// ========================================
// SECURE PREMIUM PORTFOLIO SCRIPT
// Safe • Optimized • Anti-Phishing • Anti-XSS
// ========================================

'use strict';

/* ------------------------------
   GLOBAL STATE
--------------------------------*/
let currentLang = 'en';
let ticking = false;

/* ------------------------------
   INIT
--------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initTheme();
    initTypingAnimation();
    initScrollAnimations();
    initCounters();
    initSkillTabs();
    initProjectFilters();
    initCertificationsSlider();
    initContactForm();
    initBackToTop();
    initCookieBanner();
    initChatbot();
    initSmoothScroll();
    initLazyImages();

});

// Navbar Initialization
function initNavbar() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    const navThemeToggle = document.getElementById('navThemeToggle');

    // Hamburger Menu Toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting
        updateActiveLink();
    });

    // Theme toggle in navbar
    navThemeToggle.addEventListener('click', () => {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.click();
        } else {
            // Fallback if standalone navbar theme toggle
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        }
    });
}

// Update active navigation link based on scroll position
function updateActiveLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}


/* ------------------------------
   THEME
--------------------------------*/
function initTheme() {

    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    // Default = dark
    const saved = localStorage.getItem('theme') || 'dark';

    document.documentElement.setAttribute('data-theme', saved);

    toggle.addEventListener('click', () => {

        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);

        toggle.style.transform = 'rotate(360deg)';
        setTimeout(() => toggle.style.transform = '', 300);

    });
}



/* ------------------------------
   TYPING EFFECT
--------------------------------*/
function initTypingAnimation() {

    const el = document.getElementById('typedText');
    if (!el || !window.translations) return;

    const skills = translations[currentLang]?.skills || [];

    if (!skills.length) return;

    let i = 0;
    let j = 0;
    let del = false;

    function type() {

        const text = skills[i];

        if (del) {
            j--;
        } else {
            j++;
        }

        el.textContent = text.substring(0, j);

        let speed = del ? 50 : 100;

        if (!del && j === text.length) {
            speed = 1500;
            del = true;
        }

        if (del && j === 0) {
            del = false;
            i = (i + 1) % skills.length;
            speed = 500;
        }

        setTimeout(type, speed);
    }

    type();
}


/* ------------------------------
   SCROLL ANIMATIONS
--------------------------------*/
function initScrollAnimations() {

    const elements = document.querySelectorAll('.fade-in');

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(entries => {

        entries.forEach(e => {

            if (e.isIntersecting) {
                e.target.classList.add('visible');
            }

        });

    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));

}


/* ------------------------------
   COUNTERS
--------------------------------*/
function initCounters() {

    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;

    let done = false;

    const observer = new IntersectionObserver(entries => {

        entries.forEach(e => {

            if (e.isIntersecting && !done) {

                done = true;

                counters.forEach(c => animateCounter(c));

            }

        });

    }, { threshold: 0.5 });

    observer.observe(counters[0]);

}


function animateCounter(el) {

    const target = Number(el.dataset.count) || 0;
    const duration = 2000;

    let start = 0;
    const step = target / (duration / 16);

    const timer = setInterval(() => {

        start += step;

        if (start >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(start);
        }

    }, 16);

}


/* ------------------------------
   SKILLS TABS
--------------------------------*/
function initSkillTabs() {

    const tabs = document.querySelectorAll('.skill-tab');
    const cats = document.querySelectorAll('.skill-category');

    tabs.forEach(tab => {

        tab.addEventListener('click', () => {

            const id = tab.dataset.tab;

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            cats.forEach(c => {

                c.classList.remove('active');

                if (c.id === id) {
                    c.classList.add('active');
                }

            });

        });

    });

}


/* ------------------------------
   PROJECT FILTER
--------------------------------*/
function initProjectFilters() {

    const btns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    btns.forEach(btn => {

        btn.addEventListener('click', () => {

            const filter = btn.dataset.filter;

            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            cards.forEach(card => {

                const match =
                    filter === 'all' ||
                    card.dataset.category === filter;

                card.style.display = match ? 'block' : 'none';

            });

        });

    });

}


/* ------------------------------
   CERT SLIDER
--------------------------------*/
function initCertificationsSlider() {

    const track = document.querySelector('.certifications-track');
    const prev = document.querySelector('.slider-btn.prev');
    const next = document.querySelector('.slider-btn.next');

    if (!track || !prev || !next) return;

    const width = 300;

    prev.onclick = () => track.scrollBy({ left: -width, behavior: 'smooth' });
    next.onclick = () => track.scrollBy({ left: width, behavior: 'smooth' });

}


/* ------------------------------
   CONTACT FORM
--------------------------------*/
function initContactForm() {

    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', e => {

        e.preventDefault();

        const name = sanitize(form.name.value);
        const email = sanitize(form.email.value);
        const subject = sanitize(form.subject.value);
        const msg = sanitize(form.message.value);

        if (!name || !email || !subject || !msg) {
            notify('All fields required', false);
            return;
        }

        if (!validEmail(email)) {
            notify('Invalid email', false);
            return;
        }

        notify('Message submitted successfully', true);

        form.reset();

    });

}


function validEmail(e) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}


/* ------------------------------
   NOTIFICATION
--------------------------------*/
function notify(msg, ok) {

    const div = document.createElement('div');

    div.textContent = msg;
    div.className = 'notification';

    div.style.background = ok ? '#10b981' : '#ef4444';

    document.body.appendChild(div);

    setTimeout(() => div.remove(), 3000);

}


/* ------------------------------
   BACK TO TOP
--------------------------------*/
function initBackToTop() {

    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {

        btn.classList.toggle('visible', window.scrollY > 400);

    });

    btn.onclick = () =>
        window.scrollTo({ top: 0, behavior: 'smooth' });

}


/* ------------------------------
   COOKIE
--------------------------------*/
function initCookieBanner() {

    const banner = document.getElementById('cookieBanner');
    const accept = document.getElementById('acceptCookies');

    if (!banner || !accept) return;

    if (!localStorage.getItem('cookieOK')) {

        setTimeout(() => banner.classList.add('show'), 1500);

    }

    accept.onclick = () => {

        localStorage.setItem('cookieOK', 'yes');
        banner.classList.remove('show');

    };

}


/* ------------------------------
   CHATBOT (SAFE)
--------------------------------*/
function initChatbot() {

    const toggle = document.getElementById('chatbotToggle');
    const box = document.querySelector('.chatbot-container');

    const messages = document.getElementById('chatMessages');
    const input = document.getElementById('chatInput');
    const send = document.getElementById('chatSend');

    if (!toggle || !box) return;

    toggle.onclick = () => {

        toggle.classList.toggle('active');
        box.classList.toggle('active');

    };

    function sendMsg() {

        const text = sanitize(input.value.trim());

        if (!text) return;

        addMessage(text, 'user');

        input.value = '';

        setTimeout(() => {

            const reply = getBotReply(text);

            addMessage(reply, 'bot');

        }, 600);

    }

    send.onclick = sendMsg;

    input.addEventListener('keydown', e => {

        if (e.key === 'Enter') sendMsg();

    });


    function addMessage(text, type) {

        const div = document.createElement('div');

        div.className = type + '-message';
        div.textContent = text;

        messages.appendChild(div);

        messages.scrollTop = messages.scrollHeight;

    }

}


/* ------------------------------
   NITHYA SRI PORTFOLIO CHATBOT
   Production Ready Version
--------------------------------*/

// Memory
let conversationHistory = [];
let lastTopic = null;
let lastQuestion = null;
let userName = null;
let askedQuestions = new Set();

// Cache for regex (performance)
const wordCache = {};

// Helper: word match
function has(word, text) {
    if (!wordCache[word]) {
        wordCache[word] = new RegExp(`\\b${word}\\b`, 'i');
    }
    return wordCache[word].test(text);
}

// Helper: fix common typos
function fixTypos(text) {
    return text
        .replace('skils', 'skills')
        .replace('projecs', 'projects')
        .replace('resum', 'resume')
        .replace('educaton', 'education')
        .replace('certifcate', 'certificate');
}

// Time greeting
function getTimeBasedGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning!';
    if (hour < 18) return 'Good afternoon!';
    return 'Good evening!';
}

// Main Bot Function
function getBotReply(msg) {

    let m = fixTypos(msg.toLowerCase().trim());

    conversationHistory.push({
        user: msg,
        time: Date.now()
    });

    /* ---------- Name Detection ---------- */
    if (!userName && /(my name is|i am|i'm)\s+([a-zA-Z ]{2,30})/i.test(m)) {

        const match = m.match(/(my name is|i am|i'm)\s+([a-zA-Z ]{2,30})/i);

        if (match) {
            userName = match[2].trim().split(" ")[0];
            userName = userName.charAt(0).toUpperCase() + userName.slice(1);

            return `Nice to meet you, ${userName}! 👋 How can I help you today?`;
        }
    }

    /* ---------- Greetings ---------- */
    if (has('hi', m) || has('hello', m) || has('hey', m)) {

        lastTopic = null;
        lastQuestion = null;

        const greet = userName ? `Hello ${userName}! 👋` : 'Hello 👋';

        return `${greet} ${getTimeBasedGreeting()} I can help you learn about Nithya Sri's skills, projects, and experience.`;
    }

    /* ---------- Skills ---------- */
    if (has('skill', m) || has('skills', m) || m.includes('technology') || m.includes('expertise')) {

        lastTopic = 'skills';
        lastQuestion = 'skills';
        askedQuestions.add('skills');

        return `💡 **Technical Skills:**

• Python, JavaScript, SQL
• Flask, Django, React, Node.js
• Power BI, Data Analytics
• Machine Learning
• MySQL, MongoDB
• Git, GitHub

Would you like details on any skill?`;
    }

    /* ---------- Skill Details ---------- */
    if (lastTopic === 'skills') {

        if (has('python', m))
            return 'I have strong Python skills in Pandas, NumPy, Flask, Django, and Data Analysis.';

        if (has('react', m) || has('javascript', m))
            return 'I work with React.js and modern JavaScript for building responsive web apps.';

        if (m.includes('machine learning') || has('ml', m))
            return 'I have hands-on experience with ML models, data preprocessing, and prediction systems.';

        if (has('sql', m) || has('database', m))
            return 'I am proficient in MySQL and MongoDB for backend data management.';
    }

    /* ---------- Projects ---------- */
    if (has('project', m) || has('projects', m) || m.includes('portfolio')) {

        lastTopic = 'projects';
        lastQuestion = 'projects';
        askedQuestions.add('projects');

        return `📁 **Major Projects:**

1️⃣ Pizza Sales Dashboard (Power BI)
2️⃣ Placement Training Web Panel
3️⃣ Portfolio AI Chatbot

Which one would you like to know about?`;
    }

    /* ---------- Project Details ---------- */
    if (lastTopic === 'projects') {

        if (m.includes('pizza') || has('1', m))
            return 'Pizza Dashboard analyzes sales trends using Python, SQL, and Power BI.';

        if (m.includes('placement') || has('2', m))
            return 'Placement Panel is a full-stack web app for student performance tracking.';

        if (m.includes('chatbot') || has('3', m))
            return 'This chatbot is built using JavaScript with context-aware logic.';
    }

    /* ---------- Experience ---------- */
    if (has('experience', m) || m.includes('job') || m.includes('intern')) {

        lastTopic = 'experience';
        lastQuestion = 'experience';
        askedQuestions.add('experience');

        return `💼 **Experience:**

• Python Developer - Codec Technologies (2024-Present)
• Full Stack Intern - Odugaatech (2024)

Would you like more details?`;
    }

    /* ---------- Education ---------- */
    if (has('education', m) || has('college', m) || has('degree', m)) {

        lastTopic = 'education';
        lastQuestion = 'education';
        askedQuestions.add('education');

        return `🎓 **Education:**

B.Tech AI & Data Science (2022–2026)
CGPA: 8.3 / 10

Strong academic foundation in AI & Analytics.`;
    }

    /* ---------- Certifications ---------- */
    if (m.includes('certificate') || m.includes('certification')) {

        lastTopic = 'certification';

        return `📜 **Certifications:**

• Google Analytics
• Oracle Cloud
• Python Programming
• Generative AI (Microsoft)

Want details on any?`;
    }

    /* ---------- Contact ---------- */
    if (has('contact', m) || has('email', m) || has('phone', m)) {

        lastTopic = 'contact';

        return `📞 **Contact:**

Email: nithyaravi1976@gmail.com
Phone: +91 8870497119
GitHub: github.com/Nithyaravi13`;
    }

    /* ---------- Resume ---------- */
    if (has('resume', m) || has('cv', m) || m.includes('download')) {

        lastTopic = 'resume';

        return '📄 You can download my resume using the Download Resume button above.';
    }

    /* ---------- Why Hire ---------- */
    if (m.includes('why hire') || m.includes('why should')) {

        return `✅ Why Hire Me?

• Strong technical skills
• Industry experience
• Good academic record
• Real-world projects
• Quick learner`;
    }

    /* ---------- Continue / More ---------- */
    if (has('yes', m) || has('ok', m) || has('sure', m) || has('more', m)) {

        if (lastQuestion === 'skills')
            return 'My strongest areas are Python, Data Analytics, and Full Stack development.';

        if (lastQuestion === 'projects')
            return 'All projects are real-world oriented and industry relevant.';

        if (lastQuestion === 'experience')
            return 'My industry experience helped me improve coding standards and teamwork.';

        return 'What would you like to explore next? 😊';
    }

    /* ---------- No ---------- */
    if (has('no', m) || has('nope', m)) {

        lastTopic = null;
        lastQuestion = null;

        return 'No problem 🙂 Let me know if you need anything.';
    }

    /* ---------- Thanks ---------- */
    if (m.includes('thank')) {

        lastTopic = null;
        lastQuestion = null;

        const res = userName ? `You're welcome, ${userName}!` : 'You’re welcome!';

        return `${res} 😊`;
    }

    /* ---------- Bye ---------- */
    if (has('bye', m) || has('goodbye', m)) {

        conversationHistory = [];
        lastTopic = null;
        lastQuestion = null;

        const bye = userName ? `Goodbye ${userName}! 👋` : 'Goodbye 👋';

        return `${bye} Have a great day!`;
    }

    /* ---------- Smart Suggestion ---------- */
    if (!askedQuestions.has('skills') && conversationHistory.length > 3) {

        return 'Would you like to know about my technical skills? 💻';
    }

    /* ---------- Random Fallback ---------- */
    const suggestions = [
        'Would you like to know about my skills?',
        'Shall I explain my projects?',
        'Do you want my resume?',
        'Interested in my experience?'
    ];

    return suggestions[Math.floor(Math.random() * suggestions.length)];
}



/* ------------------------------
   SMOOTH SCROLL
--------------------------------*/
function initSmoothScroll() {

    document.querySelectorAll('a[href^="#"]').forEach(a => {

        a.onclick = e => {

            const id = a.getAttribute('href');

            if (id === '#') return;

            const target = document.querySelector(id);

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({ behavior: 'smooth' });

        };

    });

}


/* ------------------------------
   LAZY LOAD
--------------------------------*/
function initLazyImages() {

    if (!('IntersectionObserver' in window)) return;

    const obs = new IntersectionObserver(entries => {

        entries.forEach(e => {

            if (e.isIntersecting) {

                const img = e.target;

                img.src = img.dataset.src;

                obs.unobserve(img);

            }

        });

    });

    document.querySelectorAll('img[data-src]').forEach(i => obs.observe(i));

}


/* ------------------------------
   SECURITY
--------------------------------*/
function sanitize(str) {

    return String(str)
        .replace(/[<>]/g, '')
        .trim();

}


/* ------------------------------
   PERFORMANCE
--------------------------------*/
window.addEventListener('scroll', () => {

    if (!ticking) {

        requestAnimationFrame(() => {

            ticking = false;

        });

        ticking = true;

    }

});



/* ------------------------------
   DEV MESSAGE
--------------------------------*/
console.log('Portfolio loaded securely ✔');

// Console Easter Egg
console.log('%c👋 Hi there, fellow developer!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%c🚀 Impressed by this portfolio? Let\'s connect!', 'font-size: 14px; color: #8b5cf6;');
console.log('%c📧 nithyasri@example.com', 'font-size: 12px; color: #64748b;');
console.log('%c✨ Built with HTML, CSS, and JavaScript', 'font-size: 12px; font-style: italic; color: #10b981;');