/**
 * Dynamic legend for the Mineral Prospectivity Map.
 * Shows per-mineral color gradient from MineralConfig.
 */

const Legend = {
    container: null,

    init: function () {
        this.container = document.getElementById('legend');
        this.showMineralLegend('gold_lode');
    },

    showMineralLegend: function (mineralKey) {
        var m = MineralConfig.minerals[mineralKey];
        if (!m) return;

        this.container.innerHTML =
            '<div style="margin-bottom:4px; font-size:0.85em;">' + m.label + ' Prospectivity</div>' +
            '<div class="legend-gradient" style="background:' + m.gradient + ';"></div>' +
            '<div class="legend-labels">' +
            '  <span>Low</span><span>Medium</span><span>High</span>' +
            '</div>';
    },
};
