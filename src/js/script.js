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