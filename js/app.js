/**
 * Main application for the PNW Gold Prospectivity Map.
 * Initializes map, loads layers, handles user interaction.
 */

(function () {
    'use strict';

    // ---- Map initialization ----
    var map = L.map('map', {
        center: [45.5, -117.0],  // Center of PNW
        zoom: 6,
        minZoom: 4,
        maxZoom: 16,
    });

    // Add default basemap
    var activeBasemap = LayerConfig.basemaps.osm;
    activeBasemap.addTo(map);

    // ---- State ----
    var activeLayers = {};
    var pointLayers = {};

    // ---- Basemap switching ----
    var basemapRadios = document.querySelectorAll('input[name="basemap"]');
    basemapRadios.forEach(function (radio) {
        radio.addEventListener('change', function () {
            map.removeLayer(activeBasemap);
            activeBasemap = LayerConfig.basemaps[this.value];
            activeBasemap.addTo(map);
            activeBasemap.bringToBack();
        });
    });

    // ---- Heatmap tile layers ----
    var lodeHeatTiles = LayerConfig.heatmapTiles.lode;
    var placerHeatTiles = LayerConfig.heatmapTiles.placer;

    // Add lode heatmap by default
    lodeHeatTiles.addTo(map);
    activeLayers['lode-heat'] = lodeHeatTiles;

    // Lode heatmap toggle
    document.getElementById('toggle-lode').addEventListener('change', function () {
        if (this.checked) {
            lodeHeatTiles.addTo(map);
            activeLayers['lode-heat'] = lodeHeatTiles;
            Legend.showHeatmapLegend();
        } else {
            if (activeLayers['lode-heat']) {
                map.removeLayer(activeLayers['lode-heat']);
                delete activeLayers['lode-heat'];
            }
        }
    });

    // Placer heatmap toggle
    document.getElementById('toggle-placer').addEventListener('change', function () {
        if (this.checked) {
            placerHeatTiles.addTo(map);
            activeLayers['placer-heat'] = placerHeatTiles;
            Legend.showHeatmapLegend();
        } else {
            if (activeLayers['placer-heat']) {
                map.removeLayer(activeLayers['placer-heat']);
                delete activeLayers['placer-heat'];
            }
        }
    });

    // ---- Opacity slider ----
    var opacitySlider = document.getElementById('opacity-slider');
    if (opacitySlider) {
        opacitySlider.addEventListener('input', function () {
            var val = parseFloat(this.value);
            lodeHeatTiles.setOpacity(val);
            placerHeatTiles.setOpacity(val);
        });
    }

    // ---- Point layer loading ----
    function loadPointLayer(url, styleName, toggleId, legendType) {
        var toggle = document.getElementById(toggleId);
        toggle.addEventListener('change', function () {
            if (this.checked) {
                if (pointLayers[styleName]) {
                    pointLayers[styleName].addTo(map);
                } else {
                    fetch(url)
                        .then(function (r) { return r.json(); })
                        .then(function (data) {
                            var style = LayerConfig.pointStyles[styleName];
                            var layer = L.geoJSON(data, {
                                pointToLayer: function (feature, latlng) {
                                    var s = Object.assign({}, style);
                                    if (feature.properties.weight) {
                                        s.radius = LayerConfig.weightToRadius(feature.properties.weight);
                                    }
                                    if (feature.properties.au_ppm) {
                                        s.fillColor = LayerConfig.auToColor(feature.properties.au_ppm);
                                    }
                                    return L.circleMarker(latlng, s);
                                },
                                onEachFeature: function (feature, layer) {
                                    layer.on('click', function () {
                                        showInfo(feature.properties, styleName);
                                    });
                                },
                            });
                            pointLayers[styleName] = layer;
                            layer.addTo(map);
                        })
                        .catch(function (e) {
                            console.warn('Could not load ' + url + ': ' + e.message);
                        });
                }
                Legend.showPointLegend(legendType);
            } else {
                if (pointLayers[styleName]) {
                    map.removeLayer(pointLayers[styleName]);
                }
            }
        });
    }

    loadPointLayer(LayerConfig.dataFiles.lode_points, 'lode', 'toggle-lode-pts', 'lode');
    loadPointLayer(LayerConfig.dataFiles.placer_points, 'placer', 'toggle-placer-pts', 'placer');
    loadPointLayer(LayerConfig.dataFiles.soil_gold, 'soil_au', 'toggle-soil-au', 'geochem');
    loadPointLayer(LayerConfig.dataFiles.sediment_gold, 'sed_au', 'toggle-sed-au', 'geochem');

    // ---- Info panel ----
    function showInfo(props, type) {
        var panel = document.getElementById('info-panel');
        var html = '';

        if (props.name) {
            html += '<p class="popup-title">' + escapeHtml(props.name) + '</p>';
        }
        if (props.source) {
            html += '<p><span class="info-label">Source:</span> <span class="info-value">' +
                escapeHtml(props.source.toUpperCase()) + '</span></p>';
        }
        if (props.type) {
            html += '<p><span class="info-label">Type:</span> ' + escapeHtml(props.type) + '</p>';
        }
        if (props.weight) {
            html += '<p><span class="info-label">Weight:</span> <span class="info-value">' +
                props.weight + '</span></p>';
        }
        if (props.au_ppm !== undefined) {
            html += '<p><span class="info-label">Gold (Au):</span> <span class="info-value">' +
                props.au_ppm.toFixed(4) + ' ppm</span></p>';
        }

        panel.innerHTML = html || '<p>Click a point for details.</p>';
    }

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // ---- Legend initialization ----
    Legend.init();

    // ---- Scale bar ----
    L.control.scale({ imperial: true, metric: true }).addTo(map);

})();
