const DATA = {
  about: 'src/data/about.json',
  experiences: 'src/data/experiences.json',
  caseStudies: 'src/data/case_studies.json'
};

async function fetchJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(res.status + ' ' + path);
    return await res.json();
  } catch (e) {
    console.error('fetchJSON error', path, e);
    return null;
  }
}

function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

// Load landing page (/) — fill section containers
async function loadLanding() {
  setYear();
  const about = await fetchJSON(DATA.about);
  const experiences = await fetchJSON(DATA.experiences) || [];
  const caseStudies = await fetchJSON(DATA.caseStudies) || [];

  // Fill About
  const aboutContainer = document.getElementById('about-container');
  if (aboutContainer) {
    aboutContainer.innerHTML = '';
    if (about && Array.isArray(about.paragraphs)) {
      about.paragraphs.forEach(p => {
        const el = document.createElement('p');
        el.className = 'about-paragraph';
        el.innerHTML = p;
        aboutContainer.appendChild(el);
      });
    }
  }

  // Fill Experiences
  const expContainer = document.getElementById('experiences-container');
  if (expContainer) {
    expContainer.innerHTML = '';
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
      expContainer.appendChild(expDiv);
    });
  }

  // Fill Case Studies (top 3 featured or first 3)
  const csContainer = document.getElementById('case-studies-container');
  if (csContainer) {
    csContainer.innerHTML = '';
    const top = caseStudies.filter(s => s.featured).slice(0, 3);
    const shown = top.length ? top : caseStudies.slice(0, 3);
    shown.forEach(cs => {
      const item = document.createElement('article');
      item.className = 'case-item';
      item.innerHTML = `
        <a class="case-link" href="/case-study/${cs.id}">
          <div class="case-image"><img src="${cs.image}" alt="${cs.title}"></div>
          <div class="case-body">
            <h3>${cs.title}</h3>
            <p class="excerpt">${cs.excerpt}</p>
            <div class="tech">${(cs.techStack || []).map(t => `<span class="tech-item">${t}</span>`).join('')}</div>
          </div>
        </a>
      `;
      csContainer.appendChild(item);
    });
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  setYear();
  const path = location.pathname.replace(/\/+$/, '');
  
  // Only load landing page content on / route
  if (path === '' || path === '/') {
    loadLanding();
  }
  // For /case-study and /case-study/:id, they should be served as separate static pages
  // The JS here won't handle them; the server will serve case-study/index.html or case-study/:id/index.html
});