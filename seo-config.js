/**
 * OKB-1 Central SEO, Favicon & Open Graph Loader
 */
const BASE_URL = 'https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/';
const FAVICON_URL = `${BASE_URL}favicon.png`;

// 1. Inject Favicon Tags Automatically if missing
if (!document.querySelector("link[rel*='icon']")) {
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = FAVICON_URL;
    document.head.appendChild(favicon);

    const appleIcon = document.createElement('link');
    appleIcon.rel = 'apple-touch-icon';
    appleIcon.href = FAVICON_URL;
    document.head.appendChild(appleIcon);
}

// 2. Check for explicit og:image tag on page, otherwise use category fallback
const existingOgImage = document.querySelector('meta[property="og:image"]')?.content;
const pagePath = window.location.pathname.toLowerCase();

let finalPreviewImage = '';

if (existingOgImage) {
    finalPreviewImage = existingOgImage;
} else if (pagePath.includes('post_ussr')) {
    finalPreviewImage = `${BASE_URL}vladivostok_preview.png`;
} else if (pagePath.includes('german_lost_airport')) {
    finalPreviewImage = `${BASE_URL}tempelhof_preview.png`;
} else if (pagePath.includes('indonesia_dlc')) {
    finalPreviewImage = `${BASE_URL}rumpin_preview.png`;
} else {
    finalPreviewImage = `${BASE_URL}Screenshot%202026-11-06%20170055.png`;
}

// 3. Inject Metadata & Social Open Graph Tags
const pageTitle = document.title || 'OKB-1 Creative Design Bureau';
const pageDescription = document.querySelector('meta[name="description"]')?.content || 
    'Independent digital design bureau specializing in custom X-Plane 12 sceneries, WED PBR ground materials, and precision aircraft assets.';

const metaTags = [
    { name: 'robots', content: 'index, follow' },
    { name: 'theme-color', content: '#0b0f19' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: window.location.href },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:image', content: finalPreviewImage },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: finalPreviewImage }
];

metaTags.forEach(attr => {
    const selector = attr.name ? `meta[name="${attr.name}"]` : `meta[property="${attr.property}"]`;
    let meta = document.querySelector(selector);
    if (!meta) {
        meta = document.createElement('meta');
        Object.keys(attr).forEach(key => meta.setAttribute(key, attr[key]));
        document.head.appendChild(meta);
    } else if (attr.property === 'og:image' || attr.name === 'twitter:image') {
        meta.setAttribute('content', finalPreviewImage);
    }
});

// 4. Inject Google Search PageMap Thumbnail
if (!document.querySelector('meta[name="thumbnail"]')) {
    const thumbMeta = document.createElement('meta');
    thumbMeta.name = 'thumbnail';
    thumbMeta.content = finalPreviewImage;
    document.head.appendChild(thumbMeta);
}
