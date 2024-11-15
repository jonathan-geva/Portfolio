// script.js
const menuLinks = document.querySelectorAll('.menu a');

menuLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('href');
    const section = document.querySelector(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
  });
});

const hamburgerIcon = document.getElementById('hamburger-icon');
const menu = document.getElementById('menu');

hamburgerIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('show-menu');
    const icon = hamburgerIcon.querySelector('i');
    if (menu.classList.contains('show-menu')) {
        icon.classList.replace('fa-bars', 'fa-times');
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
    }
});

document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !hamburgerIcon.contains(e.target)) {
        menu.classList.remove('show-menu');
        const icon = hamburgerIcon.querySelector('i');
        icon.classList.replace('fa-times', 'fa-bars');
    }
});

const scrollButton = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

scrollButton.onclick = () => {
    const scrollToTop = () => {
        const position = window.scrollY;
        if (position > 0) {
            const speed = Math.max(position / 12, Math.min(15, position / 2));
            window.scrollTo(0, position - speed);
            requestAnimationFrame(scrollToTop);
        }
    };
    
    requestAnimationFrame(scrollToTop);
};

document.addEventListener('DOMContentLoaded', () => {
    // Check if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Add touch ripple effect to sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.addEventListener('touchstart', createRipple);
        });
        
        // Add swipe to dismiss menu
        let touchStartX = 0;
        menu.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
        });
        
        menu.addEventListener('touchmove', e => {
            const touchEndX = e.touches[0].clientX;
            const diff = touchStartX - touchEndX;
            
            if (diff > 50) { // Swipe left
                menu.classList.remove('show-menu');
            }
        });
        
        // Double tap top of screen to scroll to top
        let lastTap = 0;
        document.addEventListener('touchend', e => {
            const currentTime = new Date().getTime();
            const tapPosition = e.changedTouches[0].clientY;
            
            if (tapPosition < 50) { // Top of screen
                const timeDiff = currentTime - lastTap;
                if (timeDiff < 300 && timeDiff > 0) {
                    // Double tap detected
                    const scrollToTop = () => {
                        const position = window.scrollY;
                        if (position > 0) {
                            const speed = Math.max(position / 12, Math.min(15, position / 2));
                            window.scrollTo(0, position - speed);
                            requestAnimationFrame(scrollToTop);
                        }
                    };
                    requestAnimationFrame(scrollToTop);
                }
                lastTap = currentTime;
            }
        });
    }
});

// Ripple effect function
function createRipple(event) {
    const section = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = section.getBoundingClientRect();
    
    ripple.className = 'ripple';
    ripple.style.left = `${event.touches[0].clientX - rect.left}px`;
    ripple.style.top = `${event.touches[0].clientY - rect.top}px`;
    
    section.appendChild(ripple);
    
    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
}

const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    if (savedTheme === 'light-mode') {
        icon.classList.replace('fa-moon', 'fa-sun');
    }
}

themeToggle.addEventListener('click', () => {
    // Toggle theme
    body.classList.toggle('light-mode');
    
    // Toggle icon
    if (body.classList.contains('light-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light-mode');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark-mode');
    }
});

const languageToggle = document.getElementById('languageToggle');

// Define translations
const translations = {
    de: {
        aboutMe: "About me",
        contact: "Kontakt",
        career: "Beruflicher Werdegang",
        skills: "Fähigkeiten",
        languages: "Sprachkenntnisse",
        interests: "Persönliche Interessen",
        traits: "Charaktereigenschaften",
        jobTitle: "Informatiker Applikationsentwickler @ Swisscom",
        description: "Lernfreudiger und engagierter Schüler mit ausgeprägtem Interesse an Naturwissenschaften, insbesondere Informatik. Wurde als ICT-Talent gescoutet und begeistere mich für die Suche nach Lösungen – sowohl eigenständig als auch im Team. Ich eigne mir mein Wissen durch eigene Recherchen in meiner Freizeit an. Als Informatiker Applikationsentwickler EFZ in der Swisscom möchte ich mein Interesse und meine Fähigkeiten in neuen Projekten einbringen und weiterentwickeln.",
        phone: "Telefon",
        email: "Email",
        currentJob: "A-Team (Bank Automation)",
        jobDescription: "Automatisierung von Bankprozessen mit UiPath zur Steigerung von Effizienz und Genauigkeit.",
        firstSteps: "Erste Schritte",
        firstStepsDesc: "Lehrbeginn, neue Kontakte geknüpft, neues Wissen erworben (Tools etc.), Laptop und Handy eingerichtet, Spass gehabt.",
        german: "Deutsch",
        hebrew: "Hebräisch",
        english: "Englisch",
        french: "Französisch",
        photoEditing: "Fotos bearbeiten",
        videoEditing: "Videos schneiden",
        blenderBasics: "Blender Basics",
        creativity: "Kreativität",
        msOffice: "Microsoft Office Programme",
        chess: "Schach",
        basketball: "Basketball/Fußball",
        robotics: "EV3 Legoroboter (World Robot Olympiad 2023 & 2024)",
        skiing: "Skifahren",
        programming: "Programmieren",
        fishing: "Fischen",
        creative: "Kreativ",
        social: "Sozial",
        teamPlayer: "Teamfähig",
        humorous: "Humorvoll",
        easygoing: "Umgänglich",
        quickLearner: "Schnelle Auffassungsgabe",
        helpful: "Hilfsbereit",
        independent: "Selbstständig",
        flexible: "Flexibel",
        current: "Aktuell"
    },
    en: {
        aboutMe: "About me",
        contact: "Contact",
        career: "Career Path",
        skills: "Skills",
        languages: "Languages",
        interests: "Personal Interests",
        traits: "Character Traits",
        jobTitle: "Application Developer @ Swisscom",
        description: "Enthusiastic and dedicated student with a strong interest in natural sciences, particularly computer science. Scouted as an ICT talent and passionate about finding solutions - both independently and in teams. I acquire my knowledge through personal research in my free time. As an Application Developer at Swisscom, I aim to contribute and develop my interests and abilities in new projects.",
        phone: "Phone",
        email: "Email",
        currentJob: "A-Team (Bank Automation)",
        jobDescription: "Automation of banking processes using UiPath to increase efficiency and accuracy.",
        firstSteps: "First Steps",
        firstStepsDesc: "Started apprenticeship, made new connections, acquired new knowledge (tools etc.), set up laptop and phone, had fun.",
        german: "German",
        hebrew: "Hebrew",
        english: "English",
        french: "French",
        photoEditing: "Photo Editing",
        videoEditing: "Video Editing",
        blenderBasics: "Blender Basics",
        creativity: "Creativity",
        msOffice: "Microsoft Office Suite",
        chess: "Chess",
        basketball: "Basketball/Football",
        robotics: "EV3 Lego Robotics (World Robot Olympiad 2023 & 2024)",
        skiing: "Skiing",
        programming: "Programming",
        fishing: "Fishing",
        creative: "Creative",
        social: "Social",
        teamPlayer: "Team Player",
        humorous: "Humorous",
        easygoing: "Easy-going",
        quickLearner: "Quick Learner",
        helpful: "Helpful",
        independent: "Independent",
        flexible: "Flexible",
        current: "Current"
    }
};

// Check for saved language preference
let currentLang = localStorage.getItem('language') || 'de';

// Function to update text content
function updateContent(lang) {
    // Menu items
    document.querySelector('a[href="#aboutme"]').textContent = translations[lang].aboutMe;
    document.querySelector('a[href="#Kontakt"]').textContent = translations[lang].contact;
    document.querySelector('a[href="#education"]').textContent = translations[lang].career;
    document.querySelector('a[href="#skills"]').textContent = translations[lang].skills;
    document.querySelector('a[href="#languages"]').textContent = translations[lang].languages;
    document.querySelector('a[href="#personal"]').textContent = translations[lang].interests;
    document.querySelector('a[href="#charakter"]').textContent = translations[lang].traits;

    // Header content
    document.querySelector('.profile-info p[style*="color: #4a90e2"]').textContent = translations[lang].jobTitle;
    document.querySelector('.profile-info p:not([style])').textContent = translations[lang].description;

    // Contact section
    document.querySelector('#Kontakt h2').textContent = translations[lang].contact;
    const contactText = document.querySelectorAll('#Kontakt p');
    contactText[0].textContent = `${translations[lang].phone}: 076 773 30 78`;
    contactText[1].innerHTML = `${translations[lang].email}: <a class="email" href="mailto:jonathangeva@gmail.com">jonathangeva@gmail.com</a>`;

    // Career section
    document.querySelector('#education h2').textContent = translations[lang].career;
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // First timeline item (current position)
    const firstItem = timelineItems[0].querySelector('p:not(.description)');
    firstItem.innerHTML = `<strong>August 2024 - ${translations[lang].current}:</strong> ${translations[lang].currentJob}`;
    timelineItems[0].querySelector('.description').textContent = translations[lang].jobDescription;
    
    // Second timeline item (first steps)
    const secondItem = timelineItems[1].querySelector('p:not(.description)');
    if (secondItem.textContent.includes('Firs Steps') || secondItem.textContent.includes('Erste Schritte')) {
        secondItem.innerHTML = `<strong>02.08.2024 - 09.08.2024:</strong> ${translations[lang].firstSteps}`;
    }
    timelineItems[1].querySelector('.description').textContent = translations[lang].firstStepsDesc;

    // Languages section
    document.querySelector('#languages h2').textContent = translations[lang].languages;
    
    // Update language names
    const languageNames = document.querySelectorAll('.language-name');
    languageNames[0].textContent = translations[lang].german;
    languageNames[1].textContent = translations[lang].hebrew;
    languageNames[2].textContent = translations[lang].english;
    languageNames[3].textContent = translations[lang].french;

    // Update skills
    const skillsSpans = document.querySelectorAll('.skills .skills-pool span');
    skillsSpans[0].textContent = "Scratch";           // Keep as is
    skillsSpans[1].textContent = "HTML";              // Keep as is
    skillsSpans[2].textContent = "CSS";               // Keep as is
    skillsSpans[3].textContent = "JavaScript Basics"; // Keep as is
    skillsSpans[4].textContent = "Java Basics";       // Keep as is
    skillsSpans[5].textContent = translations[lang].photoEditing;
    skillsSpans[6].textContent = translations[lang].videoEditing;
    skillsSpans[7].textContent = translations[lang].blenderBasics;
    skillsSpans[8].textContent = translations[lang].creativity;
    skillsSpans[9].textContent = "Mindnode";          // Keep as is
    skillsSpans[10].textContent = translations[lang].msOffice;

    // Update interests
    const interestsTitle = document.querySelector('.interests h2');
    interestsTitle.textContent = translations[lang].interests;
    const interestsItems = document.querySelectorAll('.interests li');
    interestsItems[0].innerHTML = `<i class="fas fa-chess"></i> ${translations[lang].chess}`;
    interestsItems[1].innerHTML = `<i class="fas fa-basketball-ball"></i> ${translations[lang].basketball}`;
    interestsItems[2].innerHTML = `<i class="fas fa-robot"></i> ${translations[lang].robotics}`;
    interestsItems[3].innerHTML = `<i class="fas fa-skiing"></i> ${translations[lang].skiing}`;
    interestsItems[4].innerHTML = `<i class="fas fa-code"></i> ${translations[lang].programming}`;
    interestsItems[5].innerHTML = `<i class="fas fa-fish"></i> ${translations[lang].fishing}`;

    // Update character traits
    const traitsTitle = document.querySelector('.traits h2');
    traitsTitle.textContent = translations[lang].traits;
    const traitsSpans = document.querySelectorAll('.traits .skills-pool span');
    traitsSpans[0].textContent = translations[lang].creative;
    traitsSpans[1].textContent = translations[lang].social;
    traitsSpans[2].textContent = translations[lang].teamPlayer;
    traitsSpans[3].textContent = translations[lang].humorous;
    traitsSpans[4].textContent = translations[lang].easygoing;
    traitsSpans[5].textContent = translations[lang].quickLearner;
    traitsSpans[6].textContent = translations[lang].helpful;
    traitsSpans[7].textContent = translations[lang].independent;
    traitsSpans[8].textContent = translations[lang].flexible;

    // Fix the skills section title translation
    document.querySelector('.skills h2').textContent = translations[lang].skills;
}

// Initialize with saved language
updateContent(currentLang);

// Toggle language on click
languageToggle.addEventListener('click', () => {
    currentLang = currentLang === 'de' ? 'en' : 'de';
    localStorage.setItem('language', currentLang);
    updateContent(currentLang);
    
    // Add a subtle animation to the icon
    const icon = languageToggle.querySelector('i');
    icon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        icon.style.transform = 'scale(1)';
    }, 200);
});