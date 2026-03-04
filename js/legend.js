/**
 * Dynamic legend generation for the Gold Prospectivity Map.
 */

const Legend = {
    container: null,

    init: function () {
        this.container = document.getElementById('legend');
        this.showHeatmapLegend();
    },

    showHeatmapLegend: function () {
        this.container.innerHTML =
            '<div class="legend-label" style="margin-bottom:4px; font-size:0.85em;">Prospectivity (0-100)</div>' +
            '<div class="legend-gradient"></div>' +
            '<div class="legend-labels">' +
            '  <span>Low</span><span>Medium</span><span>High</span>' +
            '</div>';
    },

    showPointLegend: function (type) {
        var items = [];

        if (type === 'lode') {
            items = [
                { color: '#ff6347', label: 'MRDS Past Producer (3.0)' },
                { color: '#ff7f50', label: 'USMIN Adit/Shaft (2.0)' },
                { color: '#ffa07a', label: 'USMIN Prospect Pit (1.0)' },
                { color: '#ffcc99', label: 'BLM Lode Claim (0.5)' },
            ];
        } else if (type === 'placer') {
            items = [
                { color: '#4169e1', label: 'MRDS Past Producer (3.0)' },
                { color: '#6495ed', label: 'USMIN Gravel Pit (1.0)' },
                { color: '#87ceeb', label: 'BLM Placer Claim (0.5)' },
            ];
        } else if (type === 'geochem') {
            items = [
                { color: '#ff0000', label: '>= 1.0 ppm Au' },
                { color: '#ff6600', label: '>= 0.1 ppm' },
                { color: '#ffcc00', label: '>= 0.01 ppm' },
                { color: '#99cc00', label: '>= 0.001 ppm' },
                { color: '#339900', label: '< 0.001 ppm' },
            ];
        }

        var html = '';
        items.forEach(function (item) {
            html += '<div style="display:flex;align-items:center;gap:6px;padding:2px 0;">' +
                '<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:' +
                item.color + ';"></span>' +
                '<span style="font-size:0.8em;">' + item.label + '</span>' +
                '</div>';
        });

        this.container.innerHTML = html;
    },
};
