/**
 * Layer definitions for the Mineral Prospectivity Map.
 * Dynamically creates tile layers from MineralConfig.
 * Missing tiles are served as transparent PNGs by the server (no 404s).
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

    // Build heatmap tile layers dynamically from MineralConfig
    heatmapTiles: {},

    init: function () {
        var minerals = MineralConfig.minerals;
        for (var key in minerals) {
            var m = minerals[key];
            if (!m.tileUrl) continue;  // skip point-only layers
            this.heatmapTiles[key] = L.tileLayer(m.tileUrl, {
                opacity: 0.65,
                maxNativeZoom: 10,
                maxZoom: 16,
                minZoom: 5,
                tms: false,
                attribution: m.label + ' Heatmap',
                errorTileUrl: 'data/tiles/blank.png',
            });
        }
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
