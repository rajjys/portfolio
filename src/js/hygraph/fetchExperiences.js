export async function fetchExperiences() {
    
    try {
        const response = await fetch(process.env.HYGRAPH_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${process.env.HYGRAPH_API_TOKEN}` // Only if you have a private API token
            },
            body: JSON.stringify({ query })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data.experiences; // Access the 'data' property and then 'experiences'
    } catch (error) {
        console.error("Error fetching Experiences:", error);
        return [];
    }
}