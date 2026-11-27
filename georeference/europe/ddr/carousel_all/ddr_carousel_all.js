// georeference/europe/ddr/carousel_all/ddr_carousel_all.js
// Metadata & Carousel Roll for KH-9 HEXAGON (Entity ID: D3C1215-100217F017, Captured 10 Apr 1979)

export const ddr_swath_meta = {
    entityId: "D3C1215-100217F017",
    sensor: "KH-9 HEXAGON",
    captureDate: "1979-04-10",
    corridor: "Celle-Gifhorn-Uelzen Border (BRD) -> Greater Berlin / DDR -> Swiebodzin / Lake Lubinieckie (Poland)",
    crs: "EPSG:25833 / EPSG:4326",
    creator: "OKB-1 Creative Design Bureau",
    source: "USGS Declassified Intelligence Satellite Photography"
};

const FRAME_PAIRS = [
    { code: "a", sectorLabel: "Bad Bodenteich Reconnaissance Sector (Frame A)" },
    { code: "b", sectorLabel: "Salzwedel-Ost - Osterburg-West Reconnaissance Sector (Frame B)" },
    { code: "c", sectorLabel: "Arneburg Reconnaissance Sector (Frame C)" },
    { code: "d", sectorLabel: "Rathenow - Westhaveland Reconnaissance Sector (Frame D)" },
    { code: "e", sectorLabel: "Nauen - Falkensee Reconnaissance Sector (Frame E)" },
    { code: "f", sectorLabel: "Greater Berlin & Tegel Reconnaissance Sector (Frame F)" },
    { code: "g", sectorLabel: "Eastern Berlin - Schöneiche bei Berlin Reconnaissance Sector (Frame G)" },
    { code: "h", sectorLabel: "Oder-Neisse Border / Western Poland Sector (Frame H)" },
    { code: "i", sectorLabel: "Lubusz Voivodeship / Rzepin Corridor (Frame I)" },
    { code: "j", sectorLabel: "Eastern Swath Extension / Swiebodzin Corridor Sector (Frame J)" }
];

const buildFrameEntry = (fileSuffix, displayCode, sectorLabel, isVariantB = false) => {
    const filename = `HEXAGON KH-9_1979_USGS_DDR_${fileSuffix}.jpg`;
    const encodedUrl = `./${encodeURIComponent(filename)}`;
    const variantText = isVariantB ? "Secondary Rectified Variant" : "Primary Rectified Frame";

    return {
        id: `kh9-1979-d3c1215-100217f017-${fileSuffix}`,
        name: `KH-9 HEXAGON (10 Apr 1979) — ${displayCode} (${variantText})`,
        url: encodedUrl,
        alt: `Declassified KH-9 HEXAGON satellite imagery captured 10 April 1979 (Entity ID D3C1215-100217F017) showing ${sectorLabel}, ${variantText.toLowerCase()}, georeferenced by OKB-1 Creative Design Bureau.`,
        caption: `Entity ID D3C1215-100217F017 | Captured 10 Apr 1979 | ${sectorLabel} | ${variantText}`,
        title: `KH-9 HEXAGON 1979 (${displayCode}) - D3C1215-100217F017`,
        keywords: [
            "KH-9 HEXAGON",
            "D3C1215-100217F017",
            "1979 satellite imagery",
            "declassified USGS imagery",
            "Cold War reconnaissance",
            "DDR georeferenced GeoTIFF",
            "Berlin Cold War history",
            "OKB-1 Creative Design Bureau"
        ],
        schema: {
            "@context": "https://schema.org",
            "@type": "ImageObject",
            "name": `KH-9 HEXAGON 1979 ${displayCode} — D3C1215-100217F017`,
            "description": `Manually georeferenced USGS declassified KH-9 HEXAGON reconnaissance imagery captured April 10, 1979 along the Germany-Berlin-Poland corridor (${sectorLabel}).`,
            "contentUrl": `https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/georeference/europe/ddr/carousel_all/${encodeURIComponent(filename)}`,
            "dateCreated": "1979-04-10",
            "creator": {
                "@type": "Organization",
                "name": "OKB-1 Creative Design Bureau"
            },
            "copyrightNotice": "Declassified USGS Satellite Source; Georeferenced Raster by OKB-1 Creative Design Bureau"
        }
    };
};

export const ddr_swath_carousel = [
    ...FRAME_PAIRS.flatMap(({ code, sectorLabel }) => [
        buildFrameEntry(code, `Frame ${code.toUpperCase()}`, sectorLabel, false),
        buildFrameEntry(`${code}_b`, `Frame ${code.toUpperCase()}_b`, sectorLabel, true)
    ]),
    buildFrameEntry(
        "all",
        "Full Swath Composite (ALL)",
        "Celle-Gifhorn-Uelzen to Berlin & Swiebodzin / Lake Lubinieckie",
        false
    ),
    buildFrameEntry(
        "all_b",
        "Full Swath Composite Variant (ALL_b)",
        "Celle-Gifhorn-Uelzen to Berlin & Swiebodzin / Lake Lubinieckie",
        true
    )
];

export const ddr_image_gallery_jsonld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "KH-9 HEXAGON D3C1215-100217F017 (10 Apr 1979) Georeferenced Swath Previews",
    "numberOfItems": ddr_swath_carousel.length,
    "itemListElement": ddr_swath_carousel.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": item.schema
    }))
};
