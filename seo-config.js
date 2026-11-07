/**
 * OKB-1 Central SEO, Favicon & Randomized Search Image Snippet Dynamic Loader
 */

// 1. Calculate relative path to root assets based on script location
const scriptUrl = new URL(import.meta.url);
const rootPath = scriptUrl.pathname.substring(0, scriptUrl.pathname.lastIndexOf('/') + 1);
const faviconUrl = `${scriptUrl.origin}${rootPath}favicon.png`;

// 2. Determine Preview Image (Supports explicit per-page override OR random rotation pool)
const customPageImage = document.body.getAttribute('data-preview-image');

let selectedImageName = '';

if (customPageImage) {
    // If the page specifies an exact preview image, use it
    selectedImageName = customPageImage;
} else {
    // RANDOM IMAGE POOL: Add all your key showcase screenshots here!
    const bannerPool = [
        'Screenshot%202026-11-06%20170055.png',
        // Add more image filenames here as you upload them to your root folder:
        // 'berlin_tempelhof_preview.png',
        // 'vladivostok_preview.png',
        // 'rumpin_airfield_preview.png'
    ];
    
    // Pick a random integer based on the array length
    const randomIndex = Math.floor(Math.random() * bannerPool.length);
    selectedImageName = bannerPool[randomIndex];
}

const defaultImage = selectedImageName.startsWith('http') 
    ? selectedImageName 
    : `${scriptUrl.origin}${rootPath}${selectedImageName}`;

// 3. Define Metadata & Image Preview Tags
const pageTitle = document.title || 'OKB-1 Creative Design Bureau';
const pageDescription = document.querySelector('meta[name="description"]')?.content || 
    'Independent digital design bureau specializing in custom X-Plane 12 sceneries, WED PBR ground materials, and precision aircraft assets.';

const metaTags = [
    { name: 'robots', content: 'index, follow' },
    { name: 'theme-color', content: '#0b0f19' },

    // Open Graph (Used by Google, Discord, Facebook)
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: window.location.href },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:image', content: defaultImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },

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

// 5. Inject Google PageMap Data (Forces Google Search Image Snippets)
if (!document.querySelector('meta[name="thumbnail"]')) {
    const thumbMeta = document.createElement('meta');
    thumbMeta.name = 'thumbnail';
    thumbMeta.content = defaultImage;
    document.head.appendChild(thumbMeta);
}

// 6. Inject Multi-size Favicons (for Google Favicon display)
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

// 7. Inject Google WebSite Schema (Fixes Site Title snippet)
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
