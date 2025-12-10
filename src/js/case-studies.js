const DATA_PATH = '/src/data/case_studies.json';

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

async function loadCaseStudiesList() {
  const caseStudies = await fetchJSON(DATA_PATH) || [];
  const listContainer = document.getElementById('case-studies-list');

  if (!listContainer) return;

  listContainer.innerHTML = '';
  caseStudies.forEach(cs => {
    const item = document.createElement('article');
    item.className = 'case-item';
    item.innerHTML = `
      <a class="case-link" href="/case-study/${cs.id}">
        <div class="case-image"><img src="${cs.image}" alt="${cs.title}"></div>
        <div class="case-body">
          <h2>${cs.title}</h2>
          <p class="excerpt">${cs.excerpt}</p>
          <div class="meta">${cs.date || ''}</div>
          <div class="tech">${(cs.techStack || []).map(t => `<span class="tech-item">${t}</span>`).join('')}</div>
        </div>
      </a>
    `;
    listContainer.appendChild(item);
  });
}

document.addEventListener('DOMContentLoaded', loadCaseStudiesList);
