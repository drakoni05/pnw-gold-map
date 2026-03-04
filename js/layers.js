/**
 * Layer definitions for the Gold Prospectivity Map.
 * Defines basemaps, heatmap tile layers, and GeoJSON point layers.
 * On static hosting (GitHub Pages), errorTileUrl points to blank.png for missing tiles.
 */

const LayerConfig = {
    // Basemaps
    basemaps: {
        osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19,
        }),
        topo: L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'USGS The National Map',
            maxZoom: 16,
        }),
        satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Esri, Maxar, Earthstar Geographics',
            maxZoom: 18,
        }),
    },

    // Heatmap tile layers (pre-rendered from GeoTIFFs)
    // Tiles generated for zoom 5-10; server returns transparent PNG for missing tiles
    heatmapTiles: {
        lode: L.tileLayer('data/tiles/lode/{z}/{x}/{y}.png', {
            opacity: 0.65,
            maxNativeZoom: 10,
            maxZoom: 16,
            minZoom: 5,
            tms: false,
            attribution: 'Lode Gold Heatmap',
            errorTileUrl: 'data/tiles/blank.png',
        }),
        placer: L.tileLayer('data/tiles/placer/{z}/{x}/{y}.png', {
            opacity: 0.65,
            maxNativeZoom: 10,
            maxZoom: 16,
            minZoom: 5,
            tms: false,
            attribution: 'Placer Gold Heatmap',
            errorTileUrl: 'data/tiles/blank.png',
        }),
    },

    // Point layer styles
    pointStyles: {
        lode: {
            radius: 4,
            fillColor: '#ff6347',
            color: '#cc3300',
            weight: 1,
            opacity: 0.8,
            fillOpacity: 0.6,
        },
        placer: {
            radius: 4,
            fillColor: '#4169e1',
            color: '#1a3cb0',
            weight: 1,
            opacity: 0.8,
            fillOpacity: 0.6,
        },
        soil_au: {
            radius: 3,
            fillColor: '#ffd700',
            color: '#b8860b',
            weight: 1,
            opacity: 0.7,
            fillOpacity: 0.5,
        },
        sed_au: {
            radius: 3,
            fillColor: '#32cd32',
            color: '#228b22',
            weight: 1,
            opacity: 0.7,
            fillOpacity: 0.5,
        },
    },

    // GeoJSON data files
    dataFiles: {
        lode_points: 'data/lode_points.geojson',
        placer_points: 'data/placer_points.geojson',
        soil_gold: 'data/soil_gold.geojson',
        sediment_gold: 'data/sediment_gold.geojson',
    },

    // Weight-based size scaling for point layers
    weightToRadius: function (weight) {
        return Math.max(2, Math.min(8, weight * 2));
    },

    // Au PPM to color for geochemistry points
    auToColor: function (au_ppm) {
        if (au_ppm >= 1.0) return '#ff0000';
        if (au_ppm >= 0.1) return '#ff6600';
        if (au_ppm >= 0.01) return '#ffcc00';
        if (au_ppm >= 0.001) return '#99cc00';
        return '#339900';
    },
};
