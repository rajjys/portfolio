export async function fetchProjectBySlug(slug) {
    const query = `
        query GetProjectBySlug($slug: String!) {
            project(where: { slug: $slug }) {
                id
                title
                fullDescription {
                    html // Use 'html' for rich text content
                }
                images {
                    url
                }
                technologies
                projectUrl
                githubUrl
            }
        }
    `;

    try {
        const response = await fetch(HYGRAPH_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: { slug: slug } // Pass the slug as a variable
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data.project;
    } catch (error) {
        console.error(`Error fetching project with slug ${slug}:`, error);
        return null;
    }
}
