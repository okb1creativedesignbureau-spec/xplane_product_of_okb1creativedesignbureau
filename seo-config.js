/**
 * OKB-1 Central SEO & Favicon Dynamic Loader
 * Dynamically builds and injects metadata into <head> for all subpages.
 */

// 1. Calculate relative path to root assets based on script location
const scriptUrl = new URL(import.meta.url);
const rootPath = scriptUrl.pathname.substring(0, scriptUrl.pathname.lastIndexOf('/') + 1);

// 2. Define standard metadata fallback values
const pageTitle = document.title || 'OKB-1 Creative Design Bureau';
const pageDescription = document.querySelector('meta[name="description"]')?.content || 
    'Independent digital design bureau specializing in custom X-Plane 12 sceneries, WED PBR ground materials, and precision aircraft assets.';
const defaultImage = `${scriptUrl.origin}${rootPath}Screenshot%202026-11-06%20170055.png`;

// 3. Metadata map to inject
const metaTags = [
    // Standard Directives
    { name: 'robots', content: 'index, follow' },
    { name: 'theme-color', content: '#0b0f19' },

    // Open Graph (Facebook / Discord / Link Previews)
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: window.location.href },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:image', content: defaultImage },

    // Twitter / X Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: defaultImage }
];

// 4. Inject Meta Tags into <head>
metaTags.forEach(attr => {
    const selector = attr.name ? `meta[name="${attr.name}"]` : `meta[property="${attr.property}"]`;
    if (!document.querySelector(selector)) {
        const meta = document.createElement('meta');
        Object.keys(attr).forEach(key => meta.setAttribute(key, attr[key]));
        document.head.appendChild(meta);
    }
});

// 5. Inject Favicon Link automatically if missing
if (!document.querySelector('link[rel="icon"]')) {
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = `${rootPath}Screenshot%202026-11-06%20170055.png`;
    document.head.appendChild(favicon);
}
