///

import { fetchAbout } from "./hygraph/fetchAbout.js";
import { getLanguage, setLanguage } from "./utils/lang-utils.js";

// Function to fetch and render experiences
async function loadExperiences() {
    const response = await fetch('src/data/experiences.json');
    const experiences = await response.json();
    const container = document.getElementById('experiences-container');

    experiences.forEach(exp => {
        const expDiv = document.createElement('div');
        expDiv.classList.add('experience-item');
        expDiv.innerHTML = `
            <h3 class="experience-title">${exp.title}</h3>
            <a href="${exp.companyLink}" target="_blank" class="company-link">${exp.company}</a>
            <p class="experience-duration">${exp.duration}</p>
            <div class="experience-description">
                ${exp.description.map(desc => `<p>${desc}</p>`).join('')}
            </div>
            <div class="tech-stack">
                ${exp.techStack.map(tech => `<span class="tech-item">${tech}</span>`).join('')}
            </div>
        `;
        container.appendChild(expDiv);
    });
}

// Function to fetch and render projects
async function loadProjects() {
    const response = await fetch('src/data/projects.json');
    const projects = await response.json();
    const container = document.getElementById('projects-container');

    projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project-item');
        projectDiv.innerHTML = `
            <h3><a href="${project.link}" target="_blank" class="project-title">${project.title}</a></h3>
            <p class="project-description">${project.description}</p>
            <div class="tech-stack">
                ${project.techStack.map(tech => `<span class="tech-item">${tech}</span>`).join('')}
            </div>
        `;
        container.appendChild(projectDiv);
    });
}
async function loadAbout(locale) {
    try {
    const about = await fetchAbout(locale);
    //console.log(about)
    const container = document.getElementById('about-container');
        // Add the paragraphs
            const p = document.createElement('p');
            p.innerHTML = about.bio.html; // Use innerHTML to render links
            p.classList.add('about-paragraph');
            container.appendChild(p);
        
    } catch (error) {
        console.error('Error loading about data:', error);
        // Optionally, you can display an error message in the UI
        const container = document.getElementById('about-container');
        container.innerHTML = '<p>Error loading about information. Please try again later.</p>';
        return;
    }
    
    
}
// Load data on page load
document.addEventListener('DOMContentLoaded', () => {
    const currentLang = getLanguage();
    // Set initial language switcher state
    const langSwitcher = document.getElementById('lang-switcher'); // Your language toggle
    if (langSwitcher) {
        langSwitcher.value = currentLang; // Set dropdown value
    }
    loadAbout(currentLang);
    loadExperiences();
    loadProjects();
});

document.addEventListener('DOMContentLoaded', () => {
    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: [0.25, 0.75] });

    sections.forEach(section => observer.observe(section));

    // Fix hover effect for all siblings
    document.querySelectorAll('.experience-item, .project-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const parent = this.parentNode;
            parent.querySelectorAll('.experience-item, .project-item').forEach(sibling => {
                if (sibling !== this) sibling.style.opacity = '0.5';
            });
        });

        item.addEventListener('mouseleave', function() {
            const parent = this.parentNode;
            parent.querySelectorAll('.experience-item, .project-item').forEach(sibling => {
                sibling.style.opacity = '1';
            });
        });
    });
});

document.getElementById('lang-switcher').addEventListener('change', (event) => {
    setLanguage(event.target.value);
    console.log(`Language changed to: ${getLanguage()}`);
});