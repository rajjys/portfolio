const DATA_PATH = '/src/data/case_studies.json';

async function fetchJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(res.status);
    return await res.json();
  } catch (e) {
    console.error('fetchJSON error', e);
    return [];
  }
}

function getCaseIdFromPath() {
  const parts = location.pathname.split('/').filter(Boolean);
  // e.g. ['case-study', 'lebourgeois'] → id = 'lebourgeois'
  return parts[1] || null;
}

async function loadCaseDetail() {
  const caseStudies = await fetchJSON(DATA_PATH);
  const caseId = getCaseIdFromPath();
  const cs = caseStudies.find(c => c.id === caseId);

  const container = document.getElementById('case-detail-container');
  if (!container) return;

  if (!cs) {
    container.innerHTML = `<p>Case study not found. <a href="/case-study">View all case studies</a></p>`;
    return;
  }

  const template = document.getElementById('case-detail-template');
  const clone = template.content.cloneNode(true);

  // Title & hero image
  clone.querySelector('.case-title').textContent = cs.title;
  const heroImg = clone.querySelector('.case-hero');
  heroImg.src = cs.image;
  heroImg.alt = cs.title;

  // Intro + date
  clone.querySelector('.intro').textContent = cs.intro || '';
  clone.querySelector('.date').textContent = cs.date || '';

  // Render paragraphs for problem, process, solution, lessons
  const sections = [
    { key: 'problem', target: '.problem-content' },
    { key: 'process', target: '.process-content' },
    { key: 'solution', target: '.solution-content' },
    { key: 'lessons', target: '.lessons-content' }
  ];

  sections.forEach(sec => {
    const arr = cs[sec.key];
    const containerEl = clone.querySelector(sec.target);
    if (Array.isArray(arr)) {
      arr.forEach(p => {
        const pEl = document.createElement('p');
        pEl.textContent = p;
        containerEl.appendChild(pEl);
      });
    }
  });

  // Result (single string)
  if (cs.result) {
    clone.querySelector('.result-content').textContent = cs.result;
  }

  // Tech stack tags
  const techContainer = clone.querySelector('.tech');
  if (Array.isArray(cs.techStack)) {
    cs.techStack.forEach(t => {
      const span = document.createElement('span');
      span.className = 'tech-item';
      span.textContent = t;
      techContainer.appendChild(span);
    });
  }

  // Append to DOM
  container.appendChild(clone);
}

document.addEventListener('DOMContentLoaded', loadCaseDetail);
