export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
               
            },
        ],
        // sitemap: "https://cheberel.kg/sitemap.xml",
        sitemap: "http://localhost:8000/sitemap.xml",
    };
}