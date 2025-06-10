const HYGRAPH_API_ENDPOINT = "https://ap-south-1.cdn.hygraph.com/content/cmbngxq2801xv08w296eg7spf/master";

export async function fetchAbout(locale = "fr") { // locale is now a parameter
    // The GraphQL query should accept a variable for locale
    const query = `
        query GetAbout($locale: Locale!) { # 1. Define a variable named $locale of type Locale!
            abouts(locales: [$locale]) { # 2. Use the $locale variable here
                bio {
                    html
                }
                profilePicture {
                    url(transformation: {image: {resize: {height: 280, width: 280}}})
                }
                resumeLink {
                    url
                }
            }
        }
    `;

    try {
        const response = await fetch(HYGRAPH_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${process.env.HYGRAPH_API_TOKEN}` // Only if you have a private API token
            },
            body: JSON.stringify({
                query,
                variables: { // 3. Pass the actual locale value in the 'variables' object
                    locale: locale
                }
            })
        });

        if (!response.ok) {
            // Include response body in error for easier debugging
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        //console.log("Fetched About Data:", data);

        // Check if data.data.abouts exists and has elements
        if (data.data && data.data.abouts && data.data.abouts.length > 0) {
            return data.data.abouts[0];
        } else {
            console.warn("No 'abouts' data found for locale:", locale, data);
            return null; // Return null or an empty object if no data
        }
    } catch (error) {
        console.error("Error fetching About:", error);
        return null; // Return null or an empty object on error
    }
}

// Example usage elsewhere in your code:
// import { fetchAbout } from './api.js'; // Assuming this is in api.js

// async function loadAboutContent() {
//     const currentLang = localStorage.getItem('portfolioLang') || 'fr'; // Get desired locale
//     const aboutData = await fetchAbout(currentLang);
//     if (aboutData) {
//         // Render your data
//         console.log("About content:", aboutData.bio.html);
//     } else {
//         console.log("Failed to load about content.");
//     }
// }

// loadAboutContent();