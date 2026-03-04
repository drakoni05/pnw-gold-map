/**
 * Client-side heatmap rendering using Leaflet.heat.
 * Alternative to pre-rendered tiles - renders directly from GeoJSON points.
 * Used when tile pyramid hasn't been generated yet, or for quick previews.
 */

const HeatmapRenderer = {
    layers: {},

    /**
     * Load GeoJSON and create a Leaflet.heat layer.
     * @param {string} url - Path to GeoJSON file
     * @param {string} name - Layer name (lode/placer)
     * @param {object} options - Leaflet.heat options
     * @returns {Promise<L.heatLayer>}
     */
    loadHeatLayer: async function (url, name, options) {
        try {
            const response = await fetch(url);
            if (!response.ok) return null;

            const data = await response.json();
            const heatData = data.features.map(function (f) {
                return [
                    f.geometry.coordinates[1],  // lat
                    f.geometry.coordinates[0],  // lon
                    f.properties.weight || 1.0, // intensity
                ];
            });

            const defaults = {
                radius: 25,
                blur: 15,
                maxZoom: 10,
                max: 3.0,
                gradient: {
                    0.2: '#ffffcc',
                    0.4: '#ffff00',
                    0.6: '#ff8c00',
                    0.8: '#ff4500',
                    1.0: '#8b0000',
                },
            };

            const opts = Object.assign({}, defaults, options || {});

            // Check if Leaflet.heat is available
            if (typeof L.heatLayer === 'function') {
                const layer = L.heatLayer(heatData, opts);
                this.layers[name] = layer;
                return layer;
            } else {
                console.warn('Leaflet.heat not loaded. Using circle markers as fallback.');
                return this.createCircleFallback(data, name);
            }

        } catch (e) {
            console.warn('Could not load heatmap data from ' + url + ': ' + e.message);
            return null;
        }
    },

    /**
     * Fallback: render as circle markers if Leaflet.heat is not available.
     */
    createCircleFallback: function (geojson, name) {
        const color = name === 'lode' ? '#ff4500' : '#1e90ff';
        return L.geoJSON(geojson, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: Math.max(2, (feature.properties.weight || 1) * 1.5),
                    fillColor: color,
                    color: color,
                    weight: 0.5,
                    opacity: 0.5,
                    fillOpacity: 0.3,
                });
            },
        });
    },

    /**
     * Create a heatmap from gold geochemistry points.
     */
    loadGeochemHeat: async function (url, name) {
        try {
            const response = await fetch(url);
            if (!response.ok) return null;

            const data = await response.json();
            const heatData = data.features.map(function (f) {
                // Use log-scaled Au PPM as intensity
                var au = f.properties.au_ppm || 0;
                var intensity = au > 0 ? Math.log10(au) + 4 : 0; // shift to positive
                return [
                    f.geometry.coordinates[1],
                    f.geometry.coordinates[0],
                    Math.max(0, intensity),
                ];
            });

            if (typeof L.heatLayer === 'function') {
                return L.heatLayer(heatData, {
                    radius: 20,
                    blur: 12,
                    maxZoom: 10,
                    max: 5.0,
                    gradient: {
                        0.2: '#339900',
                        0.4: '#99cc00',
                        0.6: '#ffcc00',
                        0.8: '#ff6600',
                        1.0: '#ff0000',
                    },
                });
            }
            return null;
        } catch (e) {
            return null;
        }
    },
};
