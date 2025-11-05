// Counter Animation for Stats
function animateCounter(element, target, duration = 2000, suffix = '+') {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + suffix;
        }
    }, 16);
}

// Intersection Observer for counter animation
const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const statNumbers = entry.target.querySelectorAll('.stat-number');

            // Animate each counter
            statNumbers.forEach((stat, index) => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/[0-9]/g, '');

                // Stagger the animations
                setTimeout(() => {
                    animateCounter(stat, number, 2000, suffix);
                }, index * 150);
            });

            // Stop observing after animation starts (prevents re-triggering)
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

// Observe stats section
const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navClose = document.querySelector('.nav-close');

function resetHamburger() {
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
}

function animateHamburger(isActive) {
    const spans = hamburger.querySelectorAll('span');
    if (isActive) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        resetHamburger();
    }
}

function closeMenu() {
    navMenu.classList.remove('active');
    resetHamburger();
}

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    animateHamburger(navMenu.classList.contains('active'));
});

// Close button for mobile menu
if (navClose) {
    navClose.addEventListener('click', closeMenu);
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Navbar scroll effect - Always sticky
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)';
    }

    // Always keep navbar visible
    navbar.style.transform = 'translateY(0)';
});

// Enhanced Intersection Observer for fade-in animations with stagger effect
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe section titles with slide-in animation
const sectionTitles = document.querySelectorAll('.section-title, .section-subtitle');
sectionTitles.forEach(title => {
    title.classList.add('animate-on-scroll');
    fadeInObserver.observe(title);
});

// Observe and stagger cards and feature items
const cardContainers = document.querySelectorAll('.services-grid, .features-grid, .use-cases-grid');
cardContainers.forEach(container => {
    const cards = container.querySelectorAll('.service-card, .feature-item, .use-case-card');
    cards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.transitionDelay = `${index * 0.1}s`;
        fadeInObserver.observe(card);
    });
});

// Observe about section with special animation
const aboutContent = document.querySelector('.about-content');
if (aboutContent) {
    const aboutText = aboutContent.querySelector('.about-text');
    const aboutImage = aboutContent.querySelector('.about-image');

    if (aboutText) {
        aboutText.classList.add('animate-on-scroll', 'slide-in-left');
        fadeInObserver.observe(aboutText);
    }
    if (aboutImage) {
        aboutImage.classList.add('animate-on-scroll', 'slide-in-right');
        fadeInObserver.observe(aboutImage);
    }
}

// Observe contact section
const contactContent = document.querySelector('.contact-content');
if (contactContent) {
    contactContent.classList.add('animate-on-scroll');
    fadeInObserver.observe(contactContent);
}

// Observe highlight items in about section
const highlightItems = document.querySelectorAll('.highlight-item');
highlightItems.forEach((item, index) => {
    item.classList.add('animate-on-scroll');
    item.style.transitionDelay = `${index * 0.15}s`;
    fadeInObserver.observe(item);
});


// Smooth scroll offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--primary-color)';
    });

    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('featured')) {
            this.style.borderColor = 'transparent';
        }
    });
});

// Removed parallax effect for better performance

// Simplified loading - no animation to prevent layout shift
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Function to update active nav link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let current = 'home'; // Default to home

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// Add active state to nav links based on scroll position
window.addEventListener('scroll', updateActiveNavLink);

// Set initial active state on page load
window.addEventListener('load', () => {
    updateActiveNavLink();
});

// Add active state styling
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--accent-light);
        position: relative;
        font-weight: 500;
    }
    .nav-menu a.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 3px;
        background: var(--accent-light);
        box-shadow: 0 0 8px rgba(56, 189, 248, 0.6);
    }
`;
document.head.appendChild(style);

// Language Switcher Functionality
// Clear any old language settings and default to Portuguese
let currentLanguage = 'pt';
const savedLang = localStorage.getItem('language');
if (savedLang === 'pt' || savedLang === 'en') {
    currentLanguage = savedLang;
} else {
    localStorage.setItem('language', 'pt');
}
console.log('Current language:', currentLanguage);

const translations = {
    pt: {
        // Navigation
        navHome: 'Início',
        navServices: 'Serviços',
        navChatbot: 'Chatbot',
        navUseCases: 'Casos de Uso',
        navAbout: 'Sobre Nós',
        navContacts: 'Contactos',

        // Hero Section
        heroTitle: 'Transforme o Seu Negócio Online',
        heroSubtitle: 'Soluções digitais inteligentes que fazem crescer o seu negócio',
        heroCTA: 'Começar Agora',
        heroCTA2: 'Saber Mais',

        // Stats Section
        stat1Number: '24',
        stat1Label: 'Horas de Tempo de Resposta',
        stat2Number: '100',
        stat2Label: '% Compromisso com Qualidade',
        stat3Number: '3',
        stat3Label: 'Pacotes de Serviços',
        stat4Number: '7',
        stat4Label: 'Dias de Entrega Rápida',

        // Services Section
        servicesTitle: 'Os Nossos Serviços',
        servicesSubtitle: 'Soluções à medida para automatizar e fazer crescer o seu negócio',
        serviceBadge: 'Mais Popular',
        service1Title: 'Websites à Medida',
        service1Desc: 'Websites personalizados e desenvolvidos especificamente para o seu negócio. Design único, funcionalidades específicas e totalmente otimizado.',
        service1Feature1: 'Desenvolvimento personalizado',
        service1Feature2: 'Design único',
        service1Feature3: 'Otimizado para conversão',
        service1Feature4: 'Tecnologia moderna',
        service2Title: 'Agentes de IA',
        service2Desc: 'Agentes de inteligência artificial personalizados que automatizam tarefas, atendem clientes e integram com os seus sistemas.',
        service2Feature1: 'IA treinada para o seu negócio',
        service2Feature2: 'Integração WhatsApp e sistemas',
        service2Feature3: 'Automatização inteligente',
        service2Feature4: 'Aprendizagem contínua',
        service3Title: 'Suporte e Evolução',
        service3Desc: 'Acompanhamento contínuo, atualizações e evolução das suas soluções digitais. Garantimos que está sempre um passo à frente.',
        service3Feature1: 'Suporte dedicado',
        service3Feature2: 'Atualizações contínuas',
        service3Feature3: 'Monitorização proativa',
        service3Feature4: 'Evolução constante',
        serviceUrgency1: 'Entrega em 7 dias',
        serviceUrgency2: 'Vagas limitadas este mês',
        serviceUrgency3: 'Resposta garantida em 24h',
        servicePrice1: 'A partir de',
        servicePrice2: 'A partir de',
        servicePrice3: 'A partir de',
        serviceButton1: 'Pedir Orçamento',
        serviceButton2: 'Começar',
        serviceButton3: 'Saber Mais',

        // About Section
        aboutLabel: 'A NOSSA HISTÓRIA',
        aboutTitle1: 'O que nos define é',
        aboutTitle2: 'Excelência.',
        aboutSubtitle1: 'Entregamos',
        aboutSubtitle2: 'resultados.',
        aboutTagline: 'Transformando negócios desde 2022',
        aboutDesc1: 'A Closet Domain é uma empresa portuguesa especializada em desenvolvimento web à medida e implementação de agentes de IA. Criamos websites personalizados e agentes inteligentes que automatizam processos e aumentam a eficiência do seu negócio.',
        aboutDesc2: 'Trabalhamos com empresas de diversos setores que procuram soluções digitais verdadeiramente personalizadas. Cada projeto é desenvolvido especificamente para as necessidades do cliente, desde o design até à integração com sistemas existentes. Os nossos agentes de IA são treinados com os dados do seu negócio para entregar resultados precisos e relevantes.',
        aboutQuote: '"A Closet Domain combina desenvolvimento personalizado com inteligência artificial avançada para criar soluções que realmente transformam negócios."',
        aboutQuoteAuthor: '— Miguel Marçal, Co-Fundador',
        aboutCTA: 'Saber Mais',
        aboutHighlight1Title: 'Entrega Rápida',
        aboutHighlight1Desc: 'Projetos concluídos entre 7-14 dias',
        aboutHighlight2Title: 'Qualidade Garantida',
        aboutHighlight2Desc: '100% satisfação ou devolução do dinheiro',
        aboutHighlight3Title: 'Suporte Dedicado',
        aboutHighlight3Desc: 'Assistência personalizada durante todo o projeto',

        // Chatbot Section
        chatbotTitle: 'Capacidades dos Agentes de IA',
        chatbotSubtitle: 'Inteligência artificial que trabalha para o seu negócio 24/7',
        chatFeature1Title: 'Integração Multi-Plataforma',
        chatFeature1Desc: 'Integração com WhatsApp, website, sistemas internos e outras plataformas onde os seus clientes estão.',
        chatFeature2Title: 'Automatização Inteligente',
        chatFeature2Desc: 'Automatize atendimento, reservas, vendas e processos internos com inteligência artificial avançada.',
        chatFeature3Title: 'Compreensão Natural',
        chatFeature3Desc: 'Processamento de linguagem natural que entende contexto, intenções e responde de forma humanizada.',
        chatFeature4Title: 'Totalmente Personalizado',
        chatFeature4Desc: 'Cada agente é treinado especificamente com os dados, processos e conhecimento do seu negócio.',
        chatFeature5Title: 'Analytics e Insights',
        chatFeature5Desc: 'Dashboard completo com métricas, conversas, padrões e insights para otimizar continuamente.',
        chatFeature6Title: 'Evolução Contínua',
        chatFeature6Desc: 'O agente aprende com cada interação e é constantemente otimizado para melhor performance.',

        // Use Cases Section
        useCasesTitle: 'Perfeito Para',
        useCasesSubtitle: 'As nossas soluções funcionam perfeitamente para estes negócios',
        useCase1Title: 'Restaurantes',
        useCase1Desc: 'Reservas de mesa automatizadas, consultas de menu e atendimento ao cliente via WhatsApp.',
        useCase2Title: 'Salões & Spas',
        useCase2Desc: 'Marcação de consultas, informação sobre serviços e gestão de horários.',
        useCase3Title: 'Clínicas Médicas',
        useCase3Desc: 'Agendamento de consultas de pacientes, lembretes e consultas básicas.',
        useCase4Title: 'Espaços para Eventos',
        useCase4Desc: 'Gestão de reservas, verificação de disponibilidade e coordenação de eventos.',
        useCase5Title: 'Lojas de Retalho',
        useCase5Desc: 'Consultas sobre produtos, horários da loja e automação de atendimento ao cliente.',
        useCase6Title: 'Prestadores de Serviços',
        useCase6Desc: 'Marcação de consultas, informação sobre serviços e comunicação com clientes.',

        // Contact Section
        contactTitle: 'Fale Connosco',
        contactSubtitle: 'Pronto para transformar o seu negócio? Vamos conversar.',
        contactInfoDesc: 'Gostaríamos de conhecer o seu projeto e discutir como podemos ajudar o seu negócio a crescer.',
        contactEmail: 'Email',
        contactPhone: 'Telefone',
        contactLocation: 'Localização',
        contactLocationValue: 'Portugal',

        // Footer
        footerTagline: 'Transformando negócios com soluções digitais inteligentes',
        footerQuickLinks: 'Links Rápidos',
        footerHome: 'Início',
        footerServices: 'Serviços',
        footerChatbot: 'Chatbot',
        footerContact: 'Contactos',
        footerContactTitle: 'Contacto',
        footerFollowUs: 'Siga-nos',
        footerRights: '© 2025 Closet Domain - Unipessoal Lda. Todos os direitos reservados.'
    },
    en: {
        // Navigation
        navHome: 'Home',
        navServices: 'Services',
        navChatbot: 'Chatbot',
        navUseCases: 'Use Cases',
        navAbout: 'About',
        navContacts: 'Contact',

        // Hero Section
        heroTitle: 'Transform Your Business Online',
        heroSubtitle: 'Smart digital solutions that grow your business',
        heroCTA: 'Get Started',
        heroCTA2: 'Learn More',

        // Stats Section
        stat1Number: '24',
        stat1Label: 'Hour Response Time',
        stat2Number: '100',
        stat2Label: '% Commitment to Quality',
        stat3Number: '3',
        stat3Label: 'Service Packages',
        stat4Number: '7',
        stat4Label: 'Day Fast Delivery',

        // Services Section
        servicesTitle: 'Our Services',
        servicesSubtitle: 'Custom solutions to automate and grow your business',
        serviceBadge: 'Most Popular',
        service1Title: 'Custom Websites',
        service1Desc: 'Tailored websites developed specifically for your business. Unique design, custom features, and fully optimized.',
        service1Feature1: 'Custom development',
        service1Feature2: 'Unique design',
        service1Feature3: 'Conversion optimized',
        service1Feature4: 'Modern technology',
        service2Title: 'AI Agents',
        service2Desc: 'Custom artificial intelligence agents that automate tasks, serve customers, and integrate with your systems.',
        service2Feature1: 'AI trained for your business',
        service2Feature2: 'WhatsApp and system integration',
        service2Feature3: 'Intelligent automation',
        service2Feature4: 'Continuous learning',
        service3Title: 'Support & Evolution',
        service3Desc: 'Continuous monitoring, updates, and evolution of your digital solutions. We ensure you stay ahead.',
        service3Feature1: 'Dedicated support',
        service3Feature2: 'Continuous updates',
        service3Feature3: 'Proactive monitoring',
        service3Feature4: 'Constant evolution',
        serviceUrgency1: '7-day delivery',
        serviceUrgency2: 'Limited slots this month',
        serviceUrgency3: '24h response guarantee',
        servicePrice1: 'Starting from',
        servicePrice2: 'Starting from',
        servicePrice3: 'From',
        serviceButton1: 'Get Quote',
        serviceButton2: 'Get Started',
        serviceButton3: 'Learn More',

        // About Section
        aboutLabel: 'OUR STORY',
        aboutTitle1: 'What defines us is',
        aboutTitle2: 'Excellence.',
        aboutSubtitle1: 'We deliver',
        aboutSubtitle2: 'results.',
        aboutTagline: 'Transforming businesses since 2022',
        aboutDesc1: 'Closet Domain is a Portuguese company specializing in custom web development and AI agent implementation. We create tailored websites and intelligent agents that automate processes and increase your business efficiency.',
        aboutDesc2: 'We work with companies across various sectors looking for truly personalized digital solutions. Each project is developed specifically for the client\'s needs, from design to integration with existing systems. Our AI agents are trained with your business data to deliver accurate and relevant results.',
        aboutQuote: '"Closet Domain combines custom development with advanced artificial intelligence to create solutions that truly transform businesses."',
        aboutQuoteAuthor: '— Miguel Marçal, Co-Founder',
        aboutCTA: 'Learn More',
        aboutHighlight1Title: 'Fast Delivery',
        aboutHighlight1Desc: 'Projects completed within 7-14 days',
        aboutHighlight2Title: 'Quality Guaranteed',
        aboutHighlight2Desc: '100% satisfaction or money back',
        aboutHighlight3Title: 'Dedicated Support',
        aboutHighlight3Desc: 'Personal assistance throughout your project',

        // Chatbot Section
        chatbotTitle: 'AI Agent Capabilities',
        chatbotSubtitle: 'Artificial intelligence working for your business 24/7',
        chatFeature1Title: 'Multi-Platform Integration',
        chatFeature1Desc: 'Integration with WhatsApp, website, internal systems, and other platforms where your customers are.',
        chatFeature2Title: 'Intelligent Automation',
        chatFeature2Desc: 'Automate customer service, bookings, sales, and internal processes with advanced AI.',
        chatFeature3Title: 'Natural Understanding',
        chatFeature3Desc: 'Natural language processing that understands context, intent, and responds in a human-like manner.',
        chatFeature4Title: 'Fully Customized',
        chatFeature4Desc: 'Each agent is trained specifically with your business data, processes, and knowledge.',
        chatFeature5Title: 'Analytics & Insights',
        chatFeature5Desc: 'Complete dashboard with metrics, conversations, patterns, and insights for continuous optimization.',
        chatFeature6Title: 'Continuous Evolution',
        chatFeature6Desc: 'The agent learns from every interaction and is constantly optimized for better performance.',

        // Use Cases Section
        useCasesTitle: 'Perfect For',
        useCasesSubtitle: 'Our solutions work great for these businesses',
        useCase1Title: 'Restaurants',
        useCase1Desc: 'Automated table reservations, menu inquiries, and customer service via WhatsApp.',
        useCase2Title: 'Salons & Spas',
        useCase2Desc: 'Appointment booking, service information, and schedule management.',
        useCase3Title: 'Medical Clinics',
        useCase3Desc: 'Patient appointment scheduling, reminders, and basic inquiries.',
        useCase4Title: 'Event Venues',
        useCase4Desc: 'Booking management, availability checking, and event coordination.',
        useCase5Title: 'Retail Stores',
        useCase5Desc: 'Product inquiries, store hours, and customer support automation.',
        useCase6Title: 'Service Providers',
        useCase6Desc: 'Consultation booking, service information, and client communication.',

        // Contact Section
        contactTitle: 'Get In Touch',
        contactSubtitle: 'Ready to transform your business? Let\'s talk.',
        contactInfoDesc: 'We\'d love to learn about your project and discuss how we can help your business grow.',
        contactEmail: 'Email',
        contactPhone: 'Phone',
        contactLocation: 'Location',
        contactLocationValue: 'Portugal',

        // Footer
        footerTagline: 'Transforming businesses with smart digital solutions',
        footerQuickLinks: 'Quick Links',
        footerHome: 'Home',
        footerServices: 'Services',
        footerChatbot: 'Chatbot',
        footerContact: 'Contact',
        footerContactTitle: 'Contact',
        footerFollowUs: 'Follow Us',
        footerRights: '© 2025 Closet Domain - Unipessoal Lda. All rights reserved.'
    }
};

function updateLanguage(lang) {
    console.log('updateLanguage called with:', lang);
    currentLanguage = lang;
    localStorage.setItem('language', lang);

    const t = translations[lang];
    console.log('Translations object:', t ? 'found' : 'missing');

    // Update language button text
    const langButton = document.querySelector('.language-text');
    if (langButton) {
        langButton.textContent = lang.toUpperCase();
        console.log('Language button updated to:', lang.toUpperCase());
    } else {
        console.log('Language button not found');
    }

    // Update navigation
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const href = link.getAttribute('href').slice(1);
        const key = 'nav' + href.charAt(0).toUpperCase() + href.slice(1).replace(/-./g, x => x[1].toUpperCase());
        if (t[key]) link.textContent = t[key];
    });

    // Update hero section
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero .hero-subtitle');
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    if (heroTitle) heroTitle.textContent = t.heroTitle;
    if (heroSubtitle) heroSubtitle.textContent = t.heroSubtitle;
    if (heroButtons.length >= 2) {
        heroButtons[0].textContent = t.heroCTA;
        heroButtons[1].textContent = t.heroCTA2;
    }

    // Update stats section
    const stats = document.querySelectorAll('.stat-item');
    if (stats.length >= 4) {
        stats[0].querySelector('.stat-number').textContent = t.stat1Number;
        stats[0].querySelector('.stat-label').textContent = t.stat1Label;
        stats[1].querySelector('.stat-number').textContent = t.stat2Number;
        stats[1].querySelector('.stat-label').textContent = t.stat2Label;
        stats[2].querySelector('.stat-number').textContent = t.stat3Number;
        stats[2].querySelector('.stat-label').textContent = t.stat3Label;
        stats[3].querySelector('.stat-number').textContent = t.stat4Number;
        stats[3].querySelector('.stat-label').textContent = t.stat4Label;
    }

    // Update services section
    const servicesTitle = document.querySelector('#services .section-title');
    const servicesSubtitle = document.querySelector('#services .section-subtitle');
    if (servicesTitle) servicesTitle.textContent = t.servicesTitle;
    if (servicesSubtitle) servicesSubtitle.textContent = t.servicesSubtitle;

    const serviceBadge = document.querySelector('.service-badge');
    if (serviceBadge) serviceBadge.textContent = t.serviceBadge;

    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length >= 3) {
        // Service 1
        const s1Title = serviceCards[0].querySelector('h3');
        const s1Desc = serviceCards[0].querySelector('p');
        const s1Features = serviceCards[0].querySelectorAll('.service-features li');
        if (s1Title) s1Title.textContent = t.service1Title;
        if (s1Desc) s1Desc.textContent = t.service1Desc;
        if (s1Features.length >= 4) {
            s1Features[0].textContent = t.service1Feature1;
            s1Features[1].textContent = t.service1Feature2;
            s1Features[2].textContent = t.service1Feature3;
            s1Features[3].textContent = t.service1Feature4;
        }

        // Service 2
        const s2Title = serviceCards[1].querySelector('h3');
        const s2Desc = serviceCards[1].querySelector('p');
        const s2Features = serviceCards[1].querySelectorAll('.service-features li');
        if (s2Title) s2Title.textContent = t.service2Title;
        if (s2Desc) s2Desc.textContent = t.service2Desc;
        if (s2Features.length >= 4) {
            s2Features[0].textContent = t.service2Feature1;
            s2Features[1].textContent = t.service2Feature2;
            s2Features[2].textContent = t.service2Feature3;
            s2Features[3].textContent = t.service2Feature4;
        }

        // Service 3
        const s3Title = serviceCards[2].querySelector('h3');
        const s3Desc = serviceCards[2].querySelector('p');
        const s3Features = serviceCards[2].querySelectorAll('.service-features li');
        if (s3Title) s3Title.textContent = t.service3Title;
        if (s3Desc) s3Desc.textContent = t.service3Desc;
        if (s3Features.length >= 4) {
            s3Features[0].textContent = t.service3Feature1;
            s3Features[1].textContent = t.service3Feature2;
            s3Features[2].textContent = t.service3Feature3;
            s3Features[3].textContent = t.service3Feature4;
        }

        // Update urgency badges
        const urgencyBadges = document.querySelectorAll('.service-urgency span');
        if (urgencyBadges.length >= 3) {
            urgencyBadges[0].textContent = t.serviceUrgency1;
            urgencyBadges[1].textContent = t.serviceUrgency2;
            urgencyBadges[2].textContent = t.serviceUrgency3;
        }

        // Update pricing text
        const servicePrices = document.querySelectorAll('.service-price');
        if (servicePrices.length >= 3) {
            servicePrices[0].textContent = `${t.servicePrice1} €500`;
            servicePrices[1].textContent = `${t.servicePrice2} €800`;
            const monthText = lang === 'pt' ? 'mês' : 'month';
            servicePrices[2].textContent = `${t.servicePrice3} €50/${monthText}`;
        }

        // Update CTA buttons
        const serviceButtons = document.querySelectorAll('.service-cta .btn');
        if (serviceButtons.length >= 3) {
            serviceButtons[0].textContent = t.serviceButton1;
            serviceButtons[1].textContent = t.serviceButton2;
            serviceButtons[2].textContent = t.serviceButton3;
        }
    }

    // Update about section
    const aboutLabel = document.querySelector('.about-label');
    const aboutTitle = document.querySelector('.about-title');
    const aboutSubtitle = document.querySelector('.about-subtitle');
    const aboutTagline = document.querySelector('.about-tagline');
    const aboutDescriptions = document.querySelectorAll('.about-description');
    const aboutQuote = document.querySelector('.about-quote p');
    const aboutQuoteAuthor = document.querySelector('.about-quote cite');
    const aboutCTA = document.querySelector('.about-text .btn-text');

    if (aboutLabel) aboutLabel.textContent = t.aboutLabel;
    if (aboutTitle) {
        aboutTitle.innerHTML = `${t.aboutTitle1} <span class="highlight-orange">${t.aboutTitle2}</span>`;
    }
    if (aboutSubtitle) {
        aboutSubtitle.innerHTML = `${t.aboutSubtitle1} <span class="highlight-orange">${t.aboutSubtitle2}</span>`;
    }
    if (aboutTagline) aboutTagline.textContent = t.aboutTagline;
    if (aboutDescriptions.length >= 2) {
        aboutDescriptions[0].textContent = t.aboutDesc1;
        aboutDescriptions[1].textContent = t.aboutDesc2;
    }
    if (aboutQuote) aboutQuote.textContent = t.aboutQuote;
    if (aboutQuoteAuthor) aboutQuoteAuthor.textContent = t.aboutQuoteAuthor;
    if (aboutCTA) aboutCTA.textContent = t.aboutCTA;

    // Update highlight items
    const highlightItems = document.querySelectorAll('.highlight-item');
    if (highlightItems.length >= 3) {
        highlightItems[0].querySelector('h4').textContent = t.aboutHighlight1Title;
        highlightItems[0].querySelector('p').textContent = t.aboutHighlight1Desc;
        highlightItems[1].querySelector('h4').textContent = t.aboutHighlight2Title;
        highlightItems[1].querySelector('p').textContent = t.aboutHighlight2Desc;
        highlightItems[2].querySelector('h4').textContent = t.aboutHighlight3Title;
        highlightItems[2].querySelector('p').textContent = t.aboutHighlight3Desc;
    }

    // Update chatbot section
    const chatbotTitle = document.querySelector('#chatbot .section-title');
    const chatbotSubtitle = document.querySelector('#chatbot .section-subtitle');
    if (chatbotTitle) chatbotTitle.textContent = t.chatbotTitle;
    if (chatbotSubtitle) chatbotSubtitle.textContent = t.chatbotSubtitle;

    const features = document.querySelectorAll('.feature-item');
    if (features.length >= 6) {
        features[0].querySelector('h3').textContent = t.chatFeature1Title;
        features[0].querySelector('p').textContent = t.chatFeature1Desc;
        features[1].querySelector('h3').textContent = t.chatFeature2Title;
        features[1].querySelector('p').textContent = t.chatFeature2Desc;
        features[2].querySelector('h3').textContent = t.chatFeature3Title;
        features[2].querySelector('p').textContent = t.chatFeature3Desc;
        features[3].querySelector('h3').textContent = t.chatFeature4Title;
        features[3].querySelector('p').textContent = t.chatFeature4Desc;
        features[4].querySelector('h3').textContent = t.chatFeature5Title;
        features[4].querySelector('p').textContent = t.chatFeature5Desc;
        features[5].querySelector('h3').textContent = t.chatFeature6Title;
        features[5].querySelector('p').textContent = t.chatFeature6Desc;
    }

    // Update use cases section
    const useCasesTitle = document.querySelector('#use-cases .section-title');
    const useCasesSubtitle = document.querySelector('#use-cases .section-subtitle');
    if (useCasesTitle) useCasesTitle.textContent = t.useCasesTitle;
    if (useCasesSubtitle) useCasesSubtitle.textContent = t.useCasesSubtitle;

    const useCaseCards = document.querySelectorAll('.use-case-card');
    if (useCaseCards.length >= 6) {
        useCaseCards[0].querySelector('h3').textContent = t.useCase1Title;
        useCaseCards[0].querySelector('p').textContent = t.useCase1Desc;
        useCaseCards[1].querySelector('h3').textContent = t.useCase2Title;
        useCaseCards[1].querySelector('p').textContent = t.useCase2Desc;
        useCaseCards[2].querySelector('h3').textContent = t.useCase3Title;
        useCaseCards[2].querySelector('p').textContent = t.useCase3Desc;
        useCaseCards[3].querySelector('h3').textContent = t.useCase4Title;
        useCaseCards[3].querySelector('p').textContent = t.useCase4Desc;
        useCaseCards[4].querySelector('h3').textContent = t.useCase5Title;
        useCaseCards[4].querySelector('p').textContent = t.useCase5Desc;
        useCaseCards[5].querySelector('h3').textContent = t.useCase6Title;
        useCaseCards[5].querySelector('p').textContent = t.useCase6Desc;
    }

    // Update contact section
    const contactTitle = document.querySelector('#contacts .section-title');
    const contactSubtitle = document.querySelector('#contacts .section-subtitle');
    const contactInfoDesc = document.querySelector('.contact-description');

    if (contactTitle) contactTitle.textContent = t.contactTitle;
    if (contactSubtitle) contactSubtitle.textContent = t.contactSubtitle;
    if (contactInfoDesc) contactInfoDesc.textContent = t.contactInfoDesc;

    const contactItems = document.querySelectorAll('.contact-item');
    if (contactItems.length >= 3) {
        contactItems[0].querySelector('strong').textContent = t.contactEmail;
        contactItems[1].querySelector('strong').textContent = t.contactPhone;
        contactItems[2].querySelector('strong').textContent = t.contactLocation;
        const locationText = contactItems[2].querySelector('p');
        if (locationText && !locationText.querySelector('a')) {
            locationText.textContent = t.contactLocationValue;
        }
    }

    // Update footer
    const footerTagline = document.querySelector('.footer-tagline');
    if (footerTagline) footerTagline.textContent = t.footerTagline;

    const footerQuickLinksTitle = document.querySelector('.footer-links h4');
    if (footerQuickLinksTitle) footerQuickLinksTitle.textContent = t.footerQuickLinks;

    const footerContactTitle = document.querySelector('.footer-contact h4');
    if (footerContactTitle) footerContactTitle.textContent = t.footerContactTitle;

    const footerSocialTitle = document.querySelector('.footer-social h4');
    if (footerSocialTitle) footerSocialTitle.textContent = t.footerFollowUs;

    const quickLinks = document.querySelectorAll('.footer-links a');
    if (quickLinks.length >= 4) {
        quickLinks[0].textContent = t.footerHome;
        quickLinks[1].textContent = t.footerServices;
        quickLinks[2].textContent = t.footerChatbot;
        quickLinks[3].textContent = t.footerContact;
    }

    const footerBottom = document.querySelector('.footer-bottom p');
    if (footerBottom) footerBottom.textContent = t.footerRights;
}

// Language switcher button click event
const languageSwitcher = document.getElementById('languageSwitcher');
if (languageSwitcher) {
    languageSwitcher.addEventListener('click', () => {
        const newLang = currentLanguage === 'pt' ? 'en' : 'pt';
        updateLanguage(newLang);
    });
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired, initializing language to:', currentLanguage);
    updateLanguage(currentLanguage);
});

// Also try to update immediately in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
    console.log('Document still loading, waiting for DOMContentLoaded');
} else {
    console.log('Document already loaded, updating language immediately');
    updateLanguage(currentLanguage);
}

// Cookie Consent Banner
const cookieConsent = document.getElementById('cookieConsent');
const cookieAccept = document.getElementById('cookieAccept');
const cookieReject = document.getElementById('cookieReject');

// Check if user has already made a choice
const cookieChoice = localStorage.getItem('cookieConsent');

if (!cookieChoice) {
    // Show banner after 1 second if no choice was made
    setTimeout(() => {
        cookieConsent.style.display = 'block';
    }, 1000);
}

// Accept cookies
if (cookieAccept) {
    cookieAccept.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.style.animation = 'slideDown 0.5s ease-out';
        setTimeout(() => {
            cookieConsent.style.display = 'none';
        }, 500);

        // Enable analytics if accepted
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    });
}

// Reject cookies
if (cookieReject) {
    cookieReject.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'rejected');
        cookieConsent.style.animation = 'slideDown 0.5s ease-out';
        setTimeout(() => {
            cookieConsent.style.display = 'none';
        }, 500);

        // Disable analytics if rejected
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    });
}

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

console.log('Closet Domain website loaded successfully!');
