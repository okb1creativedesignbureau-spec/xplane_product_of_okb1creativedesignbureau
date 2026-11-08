/**
 * OKB-1 Central SEO, Favicon & Open Graph Loader
 */

// 1. Calculate relative path to root assets
const scriptUrl = new URL(import.meta.url);
const rootPath = scriptUrl.pathname.substring(0, scriptUrl.pathname.lastIndexOf('/') + 1);
const faviconUrl = `${scriptUrl.origin}${rootPath}favicon.png`;

// 2. Check if the HTML page ALREADY has an og:image tag defined in <head>
let existingOgImage = document.querySelector('meta[property="og:image"]')?.content;
const pagePath = window.location.pathname.toLowerCase();

let finalPreviewImage = '';

if (existingOgImage) {
    // Priority 1: Respect the page's hand-crafted og:image!
    finalPreviewImage = existingOgImage;
} else if (pagePath.includes('post_ussr')) {
    // Priority 2: Fallback category banner for USSR branch
    finalPreviewImage = `${scriptUrl.origin}${rootPath}vladivostok_preview.png`;
} else if (pagePath.includes('german_lost_airport')) {
    // Fallback category banner for German branch
    finalPreviewImage = `${scriptUrl.origin}${rootPath}tempelhof_preview.png`;
} else if (pagePath.includes('indonesia_dlc')) {
    // Fallback category banner for Indonesia branch
    finalPreviewImage = `${scriptUrl.origin}${rootPath}rumpin_preview.png`;
} else {
    // Default fallback banner
    finalPreviewImage = `${scriptUrl.origin}${rootPath}Screenshot%202026-11-06%20170055.png`;
}

// 3. Ensure full metadata suite matches the final preview image
const pageTitle = document.title || 'OKB-1 Creative Design Bureau';
const pageDescription = document.querySelector('meta[name="description"]')?.content || 
    'Independent digital design bureau specializing in custom X-Plane 12 sceneries, WED PBR ground materials, and precision aircraft assets.';

const metaTags = [
    { name: 'robots', content: 'index, follow' },
    { name: 'theme-color', content: '#0b0f19' },

    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: window.location.href },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:image', content: finalPreviewImage },

    // Twitter Card
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

// 5. Inject Favicons & Schema...
