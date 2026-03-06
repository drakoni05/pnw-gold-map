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
        preferCanvas: true,
    });

    var activeBasemap = LayerConfig.basemaps.osm;
    activeBasemap.addTo(map);

    // ---- State ----
    var activeTileLayers = {};
    var pointLayers = {};
    var activeMineral = null;
    var activeFgbLayers = {};
    var fgbLoadSeq = {};

    // ---- Load point layer helper ----
    function loadPointLayer(k, cfg, onDone) {
        if (pointLayers[k] && map.hasLayer(pointLayers[k])) {
            if (onDone) onDone();
            return;
        }
        if (pointLayers[k]) {
            pointLayers[k].addTo(map);
            if (onDone) onDone();
            return;
        }
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
                if (onDone) onDone();
            })
            .catch(function (e) {
                console.warn('Could not load ' + cfg.pointsUrl + ': ' + e.message);
            });
    }

    // ---- FlatGeobuf loader: stream full file, cache features, viewport-filter on pan ----
    var fgbCache = {};       // k -> [{lat, lng, props}, ...]
    var fgbLoading = {};     // k -> true while loading

    async function loadFgbData(k, cfg) {
        if (fgbCache[k]) { renderFgbLayer(k, cfg); return; }
        if (fgbLoading[k]) return;
        fgbLoading[k] = true;
        var features = [];
        try {
            var response = await fetch(cfg.fgbUrl);
            var iter = flatgeobuf.deserialize(response.body);
            for await (var feature of iter) {
                var c = feature.geometry.coordinates;
                features.push({ lat: c[1], lng: c[0], props: feature.properties });
            }
        } catch (e) {
            console.warn('FGB load error for ' + k + ': ' + e.message);
            fgbLoading[k] = false;
            return;
        }
        fgbCache[k] = features;
        fgbLoading[k] = false;
        if (activeFgbLayers[k]) renderFgbLayer(k, cfg);
    }

    function renderFgbLayer(k, cfg) {
        var features = fgbCache[k];
        if (!features) return;
        var bounds = map.getBounds().pad(0.1);
        var s = bounds.getSouth(), n = bounds.getNorth();
        var w = bounds.getWest(), e = bounds.getEast();
        var newLayer = L.layerGroup();
        for (var i = 0; i < features.length; i++) {
            var f = features[i];
            if (f.lat < s || f.lat > n || f.lng < w || f.lng > e) continue;
            var marker = L.circleMarker([f.lat, f.lng], {
                radius: 3,
                fillColor: cfg.pointColor,
                color: cfg.pointStroke,
                weight: 1,
                opacity: 0.8,
                fillOpacity: 0.6,
            });
            (function (props) {
                marker.on('click', function () { showInfo(props, k); });
            })(f.props);
            newLayer.addLayer(marker);
        }
        newLayer.addTo(map);
        var oldLayer = pointLayers[k];
        pointLayers[k] = newLayer;
        if (oldLayer && map.hasLayer(oldLayer)) map.removeLayer(oldLayer);
    }

    var fgbDebounce = {};
    map.on('moveend', function () {
        for (var k in activeFgbLayers) {
            (function (key) {
                clearTimeout(fgbDebounce[key]);
                fgbDebounce[key] = setTimeout(function () {
                    renderFgbLayer(key, MineralConfig.minerals[key]);
                }, 200);
            })(k);
        }
    });

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
            var isPointOnly = m.pointOnly === true;

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

            row.appendChild(cb);
            row.appendChild(swatch);
            row.appendChild(labelSpan);

            // Only add the separate points toggle button for minerals with heatmaps
            if (!isPointOnly) {
                var ptsBtn = document.createElement('span');
                ptsBtn.className = 'pts-toggle';
                ptsBtn.title = 'Toggle indicator points';
                ptsBtn.dataset.mineral = key;
                ptsBtn.innerHTML = '&#9679;';
                ptsBtn.style.color = m.pointColor;
                row.appendChild(ptsBtn);
            }

            body.appendChild(row);

            if (isPointOnly) {
                // Point-only layers: checkbox directly toggles point layer
                cb.addEventListener('change', function () {
                    var cfg = MineralConfig.minerals[key];
                    if (this.checked) {
                        if (cfg.fgbUrl) {
                            activeFgbLayers[key] = true;
                            loadFgbData(key, cfg);
                        } else {
                            loadPointLayer(key, cfg);
                        }
                    } else {
                        delete activeFgbLayers[key];
                        if (pointLayers[key] && map.hasLayer(pointLayers[key])) {
                            map.removeLayer(pointLayers[key]);
                        }
                    }
                });
            } else {
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

                // Points toggle button
                if (ptsBtn) {
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
                        loadPointLayer(k, cfg, function () {
                            btn.classList.add('active');
                        });
                    });
                }
            }
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
