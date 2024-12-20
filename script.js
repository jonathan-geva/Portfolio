document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    const particleSystem = new ParticleSystem();
    document.body.appendChild(particleSystem.canvas);

    // Initialize pages
    const pages = {
        'aboutme': document.getElementById('aboutme-page'),
        'projects': document.getElementById('projects-page'),
        'contact': document.getElementById('contact-page')
    };

    // Show page function
    const showPage = (pageId) => {
        // Get all pages
        const pages = {
            'aboutme': document.getElementById('aboutme-page'),
            'projects': document.getElementById('projects-page'),
            'contact': document.getElementById('contact-page')
        };

        // If it's a section within aboutme page
        if (['education', 'skills', 'languages', 'personal', 'charakter'].includes(pageId)) {
            // Show aboutme page
            Object.values(pages).forEach(page => {
                if (page) page.style.display = 'none';
            });
            pages['aboutme'].style.display = 'block';
            
            // Scroll to section
            setTimeout(() => {
                const section = document.querySelector(`#${pageId}`);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            // Show selected page
            Object.values(pages).forEach(page => {
                if (page) page.style.display = 'none';
            });
            
            if (pages[pageId]) {
                pages[pageId].style.display = 'block';
            }
        }

        // Update active state in menu
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Find and activate the correct menu item
        const menuItem = document.querySelector(`.menu-item a[href="#${pageId}"]`);
        if (menuItem) {
            menuItem.parentElement.classList.add('active');
        }
    };

    // Handle menu clicks
    document.querySelectorAll('.menu-item a, .dropdown-content a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            const pageId = href.substring(1);
            
            // If it's a section within aboutme page
            if (['education', 'skills', 'languages', 'personal', 'charakter'].includes(pageId)) {
                showPage('aboutme');
                setTimeout(() => {
                    const section = document.querySelector(href);
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            } else {
                showPage(pageId);
            }
        });
    });

    // Show about me page by default
    showPage('aboutme');

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('light-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
        localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light-mode' : 'dark-mode');
        particleSystem.setLightMode(document.body.classList.contains('light-mode'));
    });

    // Initialize theme from localStorage
    if (localStorage.getItem('theme') === 'light-mode') {
        themeToggle.click();
        particleSystem.setLightMode(true);
    }

    // Language toggle functionality
    const translations = {
        de: {
            // Menu items
            aboutMe: "Über mich",
            projects: "Projekte",
            contact: "Kontakt",
            
            // About me sections
            career: "Beruflicher Werdegang",
            skills: "Fähigkeiten",
            languages: "Sprachkenntnisse",
            interests: "Persönliche Interessen",
            characteristics: "Charaktereigenschaften",
            
            // Header content
            jobTitle: "Informatiker Applikationsentwickler @ Swisscom",
            description: "Ich bin ein lernfreudiger und engagierter ICT-Lernender mit ausgeprägtem Interesse an Naturwissenschaften und Informatik. Als gescoutetes ICT-Talent begeistere ich mich für die Suche nach Lösungen – sowohl eigenständig als auch im Team. Mein Wissen erweitere ich kontinuierlich durch eigene Recherchen, die Schule sowie Projekte bei der Swisscom. Als Informatiker Applikationsentwickler EFZ möchte ich mein Interesse und meine Fähigkeiten in neuen Projekten einbringen, vertiefen und aktiv zum Erfolg beitragen.",
            
            // Career items
            current: "Aktuell",
            bankAutomation: "A-Team (Bank Automation)",
            bankDescription: "Automatisierung von Bankprozessen mit UiPath, und mit Git gearbeitet.",
            firstSteps: "Erste Schritte",
            firstStepsDesc: "Lehrbeginn, neue Kontakte geknüpft, neues Wissen erworben (Tools etc.), Laptop und Handy eingerichtet, Spass gehabt.",
            
            // Skills
            photoEditing: "Fotos bearbeiten",
            videoEditing: "Videos schneiden",
            blenderBasics: "Blender Basics",
            creativity: "Kreativität",
            msOffice: "Microsoft Office Programme",
            
            // Languages
            german: "Deutsch",
            hebrew: "Hebräisch",
            english: "Englisch",
            french: "Französisch",
            
            // Interests
            chess: "Schach",
            sports: "Basketball/Fußball",
            robotics: "EV3 Legoroboter (World Robot Olympiad 2023 & 2024)",
            skiing: "Skifahren",
            programming: "Programmieren",
            fishing: "Fischen",
            
            // Characteristics
            creative: "Kreativ",
            social: "Sozial",
            teamPlayer: "Teamfähig",
            humorous: "Humorvoll",
            easygoing: "Umgänglich",
            quickLearner: "Schnelle Auffassungsgabe",
            helpful: "Hilfsbereit",
            independent: "Selbstständig",
            flexible: "Flexibel",
            
            // Projects
            projectsTitle: "Projekte",
            portfolioTitle: "Portfolio Website",
            portfolioDesc: "Eine moderne, responsive Portfolio-Website mit Hell/Dunkel-Modus, Sprachumschaltung und interaktiven 3D-Effekten. Entwickelt mit reinem HTML, CSS und JavaScript.",
            responsiveDesign: "Responsives Design",
            viewProject: "Projekt ansehen",
            
            // Contact form
            contactMe: "Kontaktiere mich",
            name: "Name",
            email: "E-Mail",
            message: "Nachricht",
            send: "Senden",
            
            // Additional translations
            viewMore: "Mehr anzeigen",
            viewLess: "Weniger anzeigen",
            technologiesUsed: "Verwendete Technologien",
            visitWebsite: "Website besuchen",
            
            // Updated interests
            football: "Fussball",
            gym: "Gym",
            chess: "Schach",
            jubla: "JuBla",
            fishing: "Fischen",
            friends: "Hinausgehen mit Freunden",
            gaming: "Gaming",
            programming: "Programmieren",
            scrollDown: "Nach unten scrollen",
            
            // Game UI translations
            effectStrength: "Effektstärke",
            reset: "Zurücksetzen",
            exit: "Beenden",
            gameHints: "R zum Zurücksetzen • ESC zum Beenden",
            grenade: "Granate",
            attractor: "Magnetfeld",
            repulsor: "Abstoßung"
        },
        en: {
            // Menu items
            aboutMe: "About Me",
            projects: "Projects",
            contact: "Contact",
            
            // About me sections
            career: "Career Path",
            skills: "Skills",
            languages: "Languages",
            interests: "Personal Interests",
            characteristics: "Characteristics",
            
            // Header content
            jobTitle: "Application Developer @ Swisscom",
            description: "I am an enthusiastic and dedicated ICT apprentice with a strong interest in natural sciences and computer science. As a scouted ICT talent, I am passionate about finding solutions - both independently and in teams. I continuously expand my knowledge through personal research, school, and projects at Swisscom. As an Application Developer EFZ, I want to contribute my interests and skills to new projects, deepen them, and actively contribute to success.",
            
            // Career items
            current: "Current",
            bankAutomation: "A-Team (Bank Automation)",
            bankDescription: "Automation of banking processes using UiPath, and worked with Git.",
            firstSteps: "First Steps",
            firstStepsDesc: "Started apprenticeship, made new connections, acquired new knowledge (tools etc.), set up laptop and phone, had fun.",
            
            // Skills
            photoEditing: "Photo Editing",
            videoEditing: "Video Editing",
            blenderBasics: "Blender Basics",
            creativity: "Creativity",
            msOffice: "Microsoft Office Suite",
            
            // Languages
            german: "German",
            hebrew: "Hebrew",
            english: "English",
            french: "French",
            
            // Interests
            chess: "Chess",
            sports: "Basketball/Football",
            robotics: "EV3 Lego Robotics (World Robot Olympiad 2023 & 2024)",
            skiing: "Skiing",
            programming: "Programming",
            fishing: "Fishing",
            
            // Characteristics
            creative: "Creative",
            social: "Social",
            teamPlayer: "Team Player",
            humorous: "Humorous",
            easygoing: "Easy-going",
            quickLearner: "Quick Learner",
            helpful: "Helpful",
            independent: "Independent",
            flexible: "Flexible",
            
            // Projects
            projectsTitle: "Projects",
            portfolioTitle: "Portfolio Website",
            portfolioDesc: "A modern, responsive portfolio website with dark/light mode, language switching, and interactive 3D effects. Built with pure HTML, CSS, and JavaScript.",
            responsiveDesign: "Responsive Design",
            viewProject: "View Project",
            
            // Contact form
            contactMe: "Contact Me",
            name: "Name",
            email: "Email",
            message: "Message",
            send: "Send",
            
            // Additional translations
            viewMore: "View More",
            viewLess: "View Less",
            technologiesUsed: "Technologies Used",
            visitWebsite: "Visit Website",
            
            // Updated interests in English
            football: "Football",
            gym: "Gym",
            chess: "Chess",
            jubla: "Youth Organization",
            fishing: "Fishing",
            friends: "Going out with Friends",
            gaming: "Gaming",
            programming: "Programming",
            scrollDown: "Scroll Down",
            
            // Game UI translations
            effectStrength: "Effect Strength",
            reset: "Reset",
            exit: "Exit",
            gameHints: "Press R to reset • ESC to exit",
            grenade: "Grenade",
            attractor: "Attractor",
            repulsor: "Repulsor"
        }
    };

    let currentLang = localStorage.getItem('language') || 'de';

    const updateContent = (lang) => {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
    };

    const languageToggle = document.getElementById('languageToggle');

    // Update the language toggle functionality
    const updateLanguageToggle = (lang) => {
        languageToggle.innerHTML = `<span class="lang-indicator">${lang.toUpperCase()}</span>`;
    };

    // Update the language toggle click handler
    languageToggle.addEventListener('click', () => {
        currentLang = currentLang === 'de' ? 'en' : 'de';
        localStorage.setItem('language', currentLang);
        updateContent(currentLang);
        updateLanguageToggle(currentLang);
    });

    // Initialize language toggle state
    updateLanguageToggle(currentLang);

    // Initialize scroll handling
    let lastScrollY = window.scrollY;
    const topMenu = document.querySelector('.top-menu');

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            topMenu.classList.add('hidden');
        } else {
            topMenu.classList.remove('hidden');
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });

    // Initialize Tilt
    $('section').tilt({
        maxTilt: 2,
        perspective: 2000,
        scale: 1.01,
        speed: 800,
        glare: true,
        maxGlare: 0.1,
        reset: true
    });

    // Add this to your existing JavaScript
    window.addEventListener('scroll', () => {
        const scrollButton = document.getElementById('scrollToTopBtn');
        if (window.scrollY > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    }, { passive: true });

    // Scroll to top functionality
    document.getElementById('scrollToTopBtn').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initialize EmailJS
    (function() {
        emailjs.init("14yz3PkbKIkqmF2j7"); // Your public key
    })();

    // Add form submission handler
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = currentLang === 'de' ? 'Senden...' : 'Sending...';
        submitButton.disabled = true;

        // Get form data
        const formData = {
            from_name: document.getElementById('name').value,
            reply_to: document.getElementById('email').value,
            message: document.getElementById('message').value,
        };

        // Send email using EmailJS
        emailjs.send(
            'service_0w6gwf4',     // Your service ID
            'template_gecbcbh',   // Your template ID
            formData
        )
        .then(function() {
            // Show success message
            alert(currentLang === 'de' ? 'Nachricht erfolgreich gesendet!' : 'Message sent successfully!');
            
            // Reset form
            document.getElementById('contactForm').reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        })
        .catch(function(error) {
            // Show error message
            alert(currentLang === 'de' ? 'Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.' : 'Failed to send message. Please try again.');
            console.error('EmailJS error:', error);
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    });

    // Mouse following gradient
    const handleMouseMove = (e) => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    // Only add mouse move handler on desktop
    if (window.matchMedia('(min-width: 769px)').matches) {
        document.addEventListener('mousemove', handleMouseMove);
    }

    // Scroll prompt functionality
    document.querySelector('.scroll-prompt')?.addEventListener('click', () => {
        const aboutSection = document.querySelector('#aboutme');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Add cursor gradient element
    const cursorGradient = document.createElement('div');
    cursorGradient.className = 'cursor-gradient';
    document.body.appendChild(cursorGradient);

    // Add after DOMContentLoaded event handler
    const gameToggle = document.getElementById('gameToggle');
    const gameUI = document.getElementById('gameUI');
    const inventorySlots = document.querySelectorAll('.inventory-slot');

    function enterGameMode() {
        document.body.classList.add('game-mode');
        gameUI.classList.remove('hidden');
        particleSystem.setGameMode(true);
        // Reset item selection
        inventorySlots.forEach(slot => slot.classList.remove('selected'));
        document.body.removeAttribute('data-selected-item');
        customCursor.querySelector('i').className = 'fas fa-crosshairs';
        // Reset particles to initial state
        particleSystem.resetParticles();
        
        // Reset strength slider to default
        strengthSlider.value = 1;
        sliderValue.textContent = '1.0x';
        particleSystem.setEffectStrength(1);
    }

    function exitGameMode() {
        document.body.classList.remove('game-mode');
        gameUI.classList.add('hidden');
        particleSystem.setGameMode(false);
        document.body.removeAttribute('data-selected-item');
        inventorySlots.forEach(slot => slot.classList.remove('selected'));
        
        // Reset cursor behavior
        customCursor.style.display = 'none';
        document.body.style.cursor = 'default';
        
        // Reset custom cursor icon
        customCursor.querySelector('i').className = 'fas fa-crosshairs';
    }

    gameToggle.addEventListener('click', () => {
        if (document.body.classList.contains('game-mode')) {
            exitGameMode();
        } else {
            enterGameMode();
        }
    });

    // Handle ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.body.classList.contains('game-mode')) {
            exitGameMode();
        }
    });

    // Update the inventory slot click handler
    inventorySlots.forEach(slot => {
        slot.addEventListener('click', () => {
            if (!document.body.classList.contains('game-mode')) return;
            
            inventorySlots.forEach(s => s.classList.remove('selected'));
            slot.classList.add('selected');
            document.body.setAttribute('data-selected-item', slot.dataset.item);
            particleSystem.setSelectedItem(slot.dataset.item);
            
            // Update custom cursor icon
            const cursorIcon = customCursor.querySelector('i');
            switch (slot.dataset.item) {
                case 'grenade':
                    cursorIcon.className = 'fas fa-bomb';
                    break;
                case 'attractor':
                    cursorIcon.className = 'fas fa-magnet';
                    break;
                case 'repulsor':
                    cursorIcon.className = 'fas fa-expand-arrows-alt';
                    break;
                default:
                    cursorIcon.className = 'fas fa-crosshairs';
                    break;
            }
            
            // Ensure cursor is visible and following mouse
            customCursor.style.display = 'flex';
            document.body.style.cursor = 'none';
        });
    });

    // Add to your DOMContentLoaded event handler
    const customCursor = document.querySelector('.custom-cursor');

    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        if (document.body.classList.contains('game-mode') && !particleSystem.isUIHovered) {
            customCursor.style.display = 'flex';
            customCursor.style.left = `${e.clientX}px`;
            customCursor.style.top = `${e.clientY}px`;
        }
    });

    // Add these after your existing game mode setup
    const resetButton = document.getElementById('resetButton');
    const escapeButton = document.getElementById('escapeButton');

    // Reset button click handler
    resetButton.addEventListener('click', () => {
        particleSystem.resetParticles();
    });

    // Escape button click handler
    escapeButton.addEventListener('click', () => {
        exitGameMode();
    });

    // Update keyboard controls
    document.addEventListener('keydown', (e) => {
        if (document.body.classList.contains('game-mode')) {
            if (e.key === 'Escape') {
                exitGameMode();
            } else if (e.key.toLowerCase() === 'r') {
                particleSystem.resetParticles();
            }
        }
    });

    // Add hover handlers for the game UI
    gameUI.addEventListener('mouseenter', () => {
        particleSystem.setUIHovered(true);
        customCursor.style.display = 'none';
        document.body.style.cursor = 'default';
    });

    gameUI.addEventListener('mouseleave', () => {
        particleSystem.setUIHovered(false);
        if (document.body.classList.contains('game-mode')) {
            customCursor.style.display = 'flex';
            document.body.style.cursor = 'none';
        }
    });

    // Add after your other game UI setup
    const strengthSlider = document.getElementById('strengthSlider');
    const sliderValue = document.querySelector('.slider-value');

    // Update slider value display and particle system
    strengthSlider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        sliderValue.textContent = value.toFixed(1) + 'x';
        particleSystem.setEffectStrength(value);
    });
});