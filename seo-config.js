/**
 * OKB-1 Central SEO & Favicon Dynamic Loader
 * Dynamically builds and injects metadata, favicons, and Google Site Schema into <head> for all subpages.
 */

// 1. Calculate relative path to root assets based on script location
const scriptUrl = new URL(import.meta.url);
const rootPath = scriptUrl.pathname.substring(0, scriptUrl.pathname.lastIndexOf('/') + 1);
const faviconUrl = `${scriptUrl.origin}${rootPath}favicon.png`;

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

// 5. Inject Favicons automatically (Multi-size support for Google Crawler & Browsers)
const iconSizes = ['48x48', '96x96', '192x192'];
iconSizes.forEach(size => {
    if (!document.querySelector(`link[rel="icon"][sizes="${size}"]`)) {
        const icon = document.createElement('link');
        icon.rel = 'icon';
        icon.type = 'image/png';
        icon.sizes = size;
        icon.href = faviconUrl;
        document.head.appendChild(icon);
    }
});

if (!document.querySelector('link[rel="icon"]:not([sizes])')) {
    const defaultFavicon = document.createElement('link');
    defaultFavicon.rel = 'icon';
    defaultFavicon.type = 'image/png';
    defaultFavicon.href = faviconUrl;
    document.head.appendChild(defaultFavicon);
}

if (!document.querySelector('link[rel="apple-touch-icon"]')) {
    const appleIcon = document.createElement('link');
    appleIcon.rel = 'apple-touch-icon';
    appleIcon.href = faviconUrl;
    document.head.appendChild(appleIcon);
}

// 6. Inject Google WebSite Schema (Replaces "GitHub Pages documentation" title in search snippets)
if (!document.querySelector('script[type="application/ld+json"]')) {
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "OKB-1 Creative Design Bureau",
        "alternateName": ["OKB-1 Design Bureau", "OKB1 Bureau"],
        "url": "https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/"
    });
    document.head.appendChild(schemaScript);
}
