/**
 * Main application for the PNW Mineral Prospectivity Map.
 * Dynamically builds UI from MineralConfig. Handles layer toggling.
 */

(function () {
    'use strict';

    // ---- Initialize layer config ----
    LayerConfig.init();

    // ---- Map initialization ----
    var map = L.map('map', {
        center: [45.5, -117.0],
        zoom: 6,
        minZoom: 4,
        maxZoom: 16,
    });

    var activeBasemap = LayerConfig.basemaps.osm;
    activeBasemap.addTo(map);

    // ---- State ----
    var activeTileLayers = {};
    var pointLayers = {};
    var activeMineral = null;

    // ---- Build sidebar dynamically ----
    var container = document.getElementById('mineral-layers');
    var groups = MineralConfig.groupOrder;

    groups.forEach(function (groupName) {
        var minerals = MineralConfig.groups[groupName];

        var groupDiv = document.createElement('div');
        groupDiv.className = 'mineral-group';

        var header = document.createElement('div');
        header.className = 'group-header';
        header.innerHTML = '<span class="group-arrow">&#9660;</span> ' + groupName;
        header.addEventListener('click', function () {
            var body = this.nextElementSibling;
            var arrow = this.querySelector('.group-arrow');
            if (body.style.display === 'none') {
                body.style.display = 'block';
                arrow.innerHTML = '&#9660;';
            } else {
                body.style.display = 'none';
                arrow.innerHTML = '&#9654;';
            }
        });
        groupDiv.appendChild(header);

        var body = document.createElement('div');
        body.className = 'group-body';

        minerals.forEach(function (key) {
            var m = MineralConfig.minerals[key];

            var row = document.createElement('label');
            row.className = 'layer-toggle';

            var cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.id = 'toggle-heat-' + key;
            if (key === 'gold_lode') cb.checked = true;

            var swatch = document.createElement('span');
            swatch.className = 'swatch';
            swatch.style.background = m.swatch;

            var labelSpan = document.createElement('span');
            labelSpan.className = 'layer-label';
            labelSpan.textContent = m.label;

            var ptsBtn = document.createElement('span');
            ptsBtn.className = 'pts-toggle';
            ptsBtn.title = 'Toggle indicator points';
            ptsBtn.dataset.mineral = key;
            ptsBtn.innerHTML = '&#9679;';
            ptsBtn.style.color = m.pointColor;

            row.appendChild(cb);
            row.appendChild(swatch);
            row.appendChild(labelSpan);
            row.appendChild(ptsBtn);
            body.appendChild(row);

            // Heatmap tile toggle
            cb.addEventListener('change', function () {
                var tileLayer = LayerConfig.heatmapTiles[key];
                if (this.checked) {
                    tileLayer.addTo(map);
                    activeTileLayers[key] = tileLayer;
                    activeMineral = key;
                    Legend.showMineralLegend(key);
                } else {
                    if (activeTileLayers[key]) {
                        map.removeLayer(activeTileLayers[key]);
                        delete activeTileLayers[key];
                    }
                }
            });

            // Points toggle
            ptsBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var k = this.dataset.mineral;
                var cfg = MineralConfig.minerals[k];

                if (pointLayers[k] && map.hasLayer(pointLayers[k])) {
                    map.removeLayer(pointLayers[k]);
                    this.classList.remove('active');
                    return;
                }

                if (pointLayers[k]) {
                    pointLayers[k].addTo(map);
                    this.classList.add('active');
                    return;
                }

                var btn = this;
                fetch(cfg.pointsUrl)
                    .then(function (r) { return r.json(); })
                    .then(function (data) {
                        var layer = L.geoJSON(data, {
                            pointToLayer: function (feature, latlng) {
                                var radius = LayerConfig.weightToRadius(
                                    feature.properties.weight || 1
                                );
                                return L.circleMarker(latlng, {
                                    radius: radius,
                                    fillColor: cfg.pointColor,
                                    color: cfg.pointStroke,
                                    weight: 1,
                                    opacity: 0.8,
                                    fillOpacity: 0.6,
                                });
                            },
                            onEachFeature: function (feature, layer) {
                                layer.on('click', function () {
                                    showInfo(feature.properties, k);
                                });
                            },
                        });
                        pointLayers[k] = layer;
                        layer.addTo(map);
                        btn.classList.add('active');
                    })
                    .catch(function (e) {
                        console.warn('Could not load ' + cfg.pointsUrl + ': ' + e.message);
                    });
            });
        });

        groupDiv.appendChild(body);
        container.appendChild(groupDiv);
    });

    // ---- Add default lode gold heatmap ----
    var lodeTiles = LayerConfig.heatmapTiles['gold_lode'];
    lodeTiles.addTo(map);
    activeTileLayers['gold_lode'] = lodeTiles;
    activeMineral = 'gold_lode';

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

    // ---- Opacity slider ----
    var opacitySlider = document.getElementById('opacity-slider');
    if (opacitySlider) {
        opacitySlider.addEventListener('input', function () {
            var val = parseFloat(this.value);
            for (var key in activeTileLayers) {
                activeTileLayers[key].setOpacity(val);
            }
        });
    }

    // ---- Info panel ----
    function showInfo(props, mineralKey) {
        var panel = document.getElementById('info-panel');
        var m = MineralConfig.minerals[mineralKey] || {};
        var html = '';

        if (props.name) {
            html += '<p class="popup-title">' + escapeHtml(props.name) + '</p>';
        }
        if (m.label) {
            html += '<p><span class="info-label">Mineral:</span> <span class="info-value">' +
                m.label + '</span></p>';
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
        if (props.value_ppm !== undefined) {
            html += '<p><span class="info-label">' + (m.symbol || '') + ':</span> <span class="info-value">' +
                props.value_ppm.toFixed(4) + ' ppm</span></p>';
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
