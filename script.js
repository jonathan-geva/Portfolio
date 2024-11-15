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

hamburgerIcon.addEventListener('click', () => {
    menu.classList.toggle('show-menu');
});

menu.addEventListener('click', (e) => {
    if (e.target.classList.contains('menu')) {
        menu.classList.remove('show-menu');
    }
});

const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
});