/**
 * Mineral configuration for the Prospectivity Map webapp.
 * Mirrors the Python MINERALS dict in config.py.
 */

const MineralConfig = {
    minerals: {
        // ---- Precious Metals ----
        gold_lode: {
            symbol: 'Au', label: 'Lode Gold', group: 'Precious Metals',
            swatch: '#ff4500', pointColor: '#ff6347', pointStroke: '#cc3300',
            gradient: 'linear-gradient(to right, rgba(255,255,200,0.4), rgba(255,255,0,0.6), rgba(255,165,0,0.8), rgba(255,69,0,0.9), rgba(139,0,0,1.0))',
            tileUrl: 'data/tiles/lode/{z}/{x}/{y}.png',
            pointsUrl: 'data/lode_points.geojson',
            legacy: true,
        },
        gold_placer: {
            symbol: 'Au', label: 'Placer Gold', group: 'Precious Metals',
            swatch: '#1e90ff', pointColor: '#4169e1', pointStroke: '#1a3cb0',
            gradient: 'linear-gradient(to right, rgba(200,220,255,0.4), rgba(100,149,237,0.6), rgba(30,144,255,0.8), rgba(0,0,205,0.9), rgba(0,0,80,1.0))',
            tileUrl: 'data/tiles/placer/{z}/{x}/{y}.png',
            pointsUrl: 'data/placer_points.geojson',
            legacy: true,
        },
        gold_soil: {
            symbol: 'Au', label: 'Soil Gold (Au)', group: 'Gold Geochemistry',
            swatch: '#ffa500', pointColor: '#ffa500', pointStroke: '#cc8400',
            gradient: null,
            tileUrl: null,
            pointsUrl: 'data/soil_gold.geojson',
            pointOnly: true,
        },
        gold_sediment: {
            symbol: 'Au', label: 'Sediment Gold (Au)', group: 'Gold Geochemistry',
            swatch: '#4682b4', pointColor: '#5f9ea0', pointStroke: '#3a7a7c',
            gradient: null,
            tileUrl: null,
            pointsUrl: 'data/sediment_gold.geojson',
            pointOnly: true,
        },

        // ---- BLM Mining Claims ----
        blm_lode_active: {
            symbol: 'Au', label: 'Active Lode Claims', group: 'BLM Mining Claims',
            swatch: '#e74c3c', pointColor: '#e74c3c', pointStroke: '#c0392b',
            gradient: null,
            tileUrl: null,
            pointsUrl: 'data/blm_lode_active.geojson',
            pointOnly: true,
        },
        blm_lode_closed: {
            symbol: 'Au', label: 'Past Lode Claims', group: 'BLM Mining Claims',
            swatch: '#95a5a6', pointColor: '#95a5a6', pointStroke: '#7f8c8d',
            gradient: null,
            tileUrl: null,
            pointsUrl: 'data/blm_lode_closed.geojson',
            pointOnly: true,
        },
        blm_placer_active: {
            symbol: 'Au', label: 'Active Placer Claims', group: 'BLM Mining Claims',
            swatch: '#3498db', pointColor: '#3498db', pointStroke: '#2980b9',
            gradient: null,
            tileUrl: null,
            pointsUrl: 'data/blm_placer_active.geojson',
            pointOnly: true,
        },
        blm_placer_closed: {
            symbol: 'Au', label: 'Past Placer Claims', group: 'BLM Mining Claims',
            swatch: '#bdc3c7', pointColor: '#bdc3c7', pointStroke: '#a0a6a9',
            gradient: null,
            tileUrl: null,
            pointsUrl: 'data/blm_placer_closed.geojson',
            pointOnly: true,
        },

        silver: {
            symbol: 'Ag', label: 'Silver', group: 'Precious Metals',
            swatch: '#708090', pointColor: '#a0a0b0', pointStroke: '#606080',
            gradient: 'linear-gradient(to right, rgba(220,220,235,0.4), rgba(180,180,210,0.6), rgba(140,140,190,0.8), rgba(100,100,170,0.9), rgba(40,40,110,1.0))',
            tileUrl: 'data/tiles/silver/{z}/{x}/{y}.png',
            pointsUrl: 'data/silver_points.geojson',
        },

        // ---- Base Metals ----
        copper: {
            symbol: 'Cu', label: 'Copper', group: 'Base Metals',
            swatch: '#2e8b57', pointColor: '#2e8b57', pointStroke: '#1a5e3a',
            gradient: 'linear-gradient(to right, rgba(200,240,220,0.4), rgba(100,200,170,0.6), rgba(0,170,140,0.8), rgba(0,130,110,0.9), rgba(0,60,50,1.0))',
            tileUrl: 'data/tiles/copper/{z}/{x}/{y}.png',
            pointsUrl: 'data/copper_points.geojson',
        },
        lead: {
            symbol: 'Pb', label: 'Lead', group: 'Base Metals',
            swatch: '#b8860b', pointColor: '#b8860b', pointStroke: '#8b6914',
            gradient: 'linear-gradient(to right, rgba(230,220,200,0.4), rgba(200,180,140,0.6), rgba(170,140,90,0.8), rgba(140,100,50,0.9), rgba(70,40,10,1.0))',
            tileUrl: 'data/tiles/lead/{z}/{x}/{y}.png',
            pointsUrl: 'data/lead_points.geojson',
        },
        zinc: {
            symbol: 'Zn', label: 'Zinc', group: 'Base Metals',
            swatch: '#4682b4', pointColor: '#4682b4', pointStroke: '#2a5f8a',
            gradient: 'linear-gradient(to right, rgba(210,220,240,0.4), rgba(160,180,220,0.6), rgba(100,130,200,0.8), rgba(60,90,180,0.9), rgba(10,20,100,1.0))',
            tileUrl: 'data/tiles/zinc/{z}/{x}/{y}.png',
            pointsUrl: 'data/zinc_points.geojson',
        },
        nickel: {
            symbol: 'Ni', label: 'Nickel', group: 'Base Metals',
            swatch: '#20b2aa', pointColor: '#20b2aa', pointStroke: '#148078',
            gradient: 'linear-gradient(to right, rgba(200,240,235,0.4), rgba(120,210,200,0.6), rgba(40,180,170,0.8), rgba(0,140,130,0.9), rgba(0,60,55,1.0))',
            tileUrl: 'data/tiles/nickel/{z}/{x}/{y}.png',
            pointsUrl: 'data/nickel_points.geojson',
        },
        tin: {
            symbol: 'Sn', label: 'Tin', group: 'Base Metals',
            swatch: '#cd853f', pointColor: '#cd853f', pointStroke: '#a0682e',
            gradient: 'linear-gradient(to right, rgba(240,225,205,0.4), rgba(220,190,155,0.6), rgba(200,155,105,0.8), rgba(180,120,60,0.9), rgba(110,60,10,1.0))',
            tileUrl: 'data/tiles/tin/{z}/{x}/{y}.png',
            pointsUrl: 'data/tin_points.geojson',
        },

        // ---- Battery Metals ----
        lithium: {
            symbol: 'Li', label: 'Lithium', group: 'Battery Metals',
            swatch: '#00ced1', pointColor: '#00ced1', pointStroke: '#009a9e',
            gradient: 'linear-gradient(to right, rgba(200,240,255,0.4), rgba(100,210,245,0.6), rgba(0,180,230,0.8), rgba(0,140,200,0.9), rgba(0,60,130,1.0))',
            tileUrl: 'data/tiles/lithium/{z}/{x}/{y}.png',
            pointsUrl: 'data/lithium_points.geojson',
        },
        cobalt: {
            symbol: 'Co', label: 'Cobalt', group: 'Battery Metals',
            swatch: '#0047ab', pointColor: '#0047ab', pointStroke: '#003080',
            gradient: 'linear-gradient(to right, rgba(200,210,240,0.4), rgba(120,150,220,0.6), rgba(60,100,200,0.8), rgba(20,60,170,0.9), rgba(0,10,100,1.0))',
            tileUrl: 'data/tiles/cobalt/{z}/{x}/{y}.png',
            pointsUrl: 'data/cobalt_points.geojson',
        },
        manganese: {
            symbol: 'Mn', label: 'Manganese', group: 'Battery Metals',
            swatch: '#dc143c', pointColor: '#dc143c', pointStroke: '#a00f2e',
            gradient: 'linear-gradient(to right, rgba(255,210,210,0.4), rgba(240,150,150,0.6), rgba(220,90,90,0.8), rgba(200,40,40,0.9), rgba(120,0,0,1.0))',
            tileUrl: 'data/tiles/manganese/{z}/{x}/{y}.png',
            pointsUrl: 'data/manganese_points.geojson',
        },
        vanadium: {
            symbol: 'V', label: 'Vanadium', group: 'Battery Metals',
            swatch: '#4b0082', pointColor: '#7b00d4', pointStroke: '#3a0066',
            gradient: 'linear-gradient(to right, rgba(220,200,240,0.4), rgba(180,140,220,0.6), rgba(140,80,200,0.8), rgba(100,30,170,0.9), rgba(40,0,100,1.0))',
            tileUrl: 'data/tiles/vanadium/{z}/{x}/{y}.png',
            pointsUrl: 'data/vanadium_points.geojson',
        },

        // ---- Industrial Metals ----
        chromium: {
            symbol: 'Cr', label: 'Chromium', group: 'Industrial Metals',
            swatch: '#228b22', pointColor: '#228b22', pointStroke: '#145214',
            gradient: 'linear-gradient(to right, rgba(210,240,210,0.4), rgba(140,210,140,0.6), rgba(70,180,70,0.8), rgba(20,140,20,0.9), rgba(0,60,0,1.0))',
            tileUrl: 'data/tiles/chromium/{z}/{x}/{y}.png',
            pointsUrl: 'data/chromium_points.geojson',
        },
        tungsten: {
            symbol: 'W', label: 'Tungsten', group: 'Industrial Metals',
            swatch: '#daa520', pointColor: '#daa520', pointStroke: '#b8860b',
            gradient: 'linear-gradient(to right, rgba(240,230,200,0.4), rgba(220,200,150,0.6), rgba(200,170,100,0.8), rgba(180,140,50,0.9), rgba(120,80,0,1.0))',
            tileUrl: 'data/tiles/tungsten/{z}/{x}/{y}.png',
            pointsUrl: 'data/tungsten_points.geojson',
        },
        uranium: {
            symbol: 'U', label: 'Uranium', group: 'Industrial Metals',
            swatch: '#ff8c00', pointColor: '#ff8c00', pointStroke: '#cc5500',
            gradient: 'linear-gradient(to right, rgba(255,240,200,0.4), rgba(255,210,100,0.6), rgba(255,170,0,0.8), rgba(230,120,0,0.9), rgba(160,30,0,1.0))',
            tileUrl: 'data/tiles/uranium/{z}/{x}/{y}.png',
            pointsUrl: 'data/uranium_points.geojson',
        },
        titanium: {
            symbol: 'Ti', label: 'Titanium', group: 'Industrial Metals',
            swatch: '#483d8b', pointColor: '#483d8b', pointStroke: '#302870',
            gradient: 'linear-gradient(to right, rgba(210,210,230,0.4), rgba(160,160,200,0.6), rgba(110,110,170,0.8), rgba(70,70,140,0.9), rgba(20,20,80,1.0))',
            tileUrl: 'data/tiles/titanium/{z}/{x}/{y}.png',
            pointsUrl: 'data/titanium_points.geojson',
        },

        // ---- Strategic Metals ----
        antimony: {
            symbol: 'Sb', label: 'Antimony', group: 'Strategic Metals',
            swatch: '#9932cc', pointColor: '#9932cc', pointStroke: '#6b2291',
            gradient: 'linear-gradient(to right, rgba(230,200,240,0.4), rgba(200,140,220,0.6), rgba(170,80,200,0.8), rgba(140,30,170,0.9), rgba(70,0,90,1.0))',
            tileUrl: 'data/tiles/antimony/{z}/{x}/{y}.png',
            pointsUrl: 'data/antimony_points.geojson',
        },
        beryllium: {
            symbol: 'Be', label: 'Beryllium', group: 'Strategic Metals',
            swatch: '#e91e63', pointColor: '#e91e63', pointStroke: '#b0154b',
            gradient: 'linear-gradient(to right, rgba(255,220,225,0.4), rgba(240,160,175,0.6), rgba(225,100,130,0.8), rgba(200,50,90,0.9), rgba(130,0,40,1.0))',
            tileUrl: 'data/tiles/beryllium/{z}/{x}/{y}.png',
            pointsUrl: 'data/beryllium_points.geojson',
        },
        zirconium: {
            symbol: 'Zr', label: 'Zirconium', group: 'Strategic Metals',
            swatch: '#008b8b', pointColor: '#008b8b', pointStroke: '#006060',
            gradient: 'linear-gradient(to right, rgba(200,235,235,0.4), rgba(120,200,200,0.6), rgba(40,165,165,0.8), rgba(0,130,130,0.9), rgba(0,60,60,1.0))',
            tileUrl: 'data/tiles/zirconium/{z}/{x}/{y}.png',
            pointsUrl: 'data/zirconium_points.geojson',
        },
        niobium: {
            symbol: 'Nb', label: 'Niobium', group: 'Strategic Metals',
            swatch: '#6a5acd', pointColor: '#6a5acd', pointStroke: '#4a3ea0',
            gradient: 'linear-gradient(to right, rgba(220,215,240,0.4), rgba(170,160,220,0.6), rgba(130,110,200,0.8), rgba(90,70,180,0.9), rgba(30,15,110,1.0))',
            tileUrl: 'data/tiles/niobium/{z}/{x}/{y}.png',
            pointsUrl: 'data/niobium_points.geojson',
        },
        tantalum: {
            symbol: 'Ta', label: 'Tantalum', group: 'Strategic Metals',
            swatch: '#8b4513', pointColor: '#8b4513', pointStroke: '#5c2e0d',
            gradient: 'linear-gradient(to right, rgba(235,215,200,0.4), rgba(210,170,140,0.6), rgba(180,120,80,0.8), rgba(150,80,30,0.9), rgba(80,30,0,1.0))',
            tileUrl: 'data/tiles/tantalum/{z}/{x}/{y}.png',
            pointsUrl: 'data/tantalum_points.geojson',
        },
        tellurium: {
            symbol: 'Te', label: 'Tellurium', group: 'Strategic Metals',
            swatch: '#3cb371', pointColor: '#3cb371', pointStroke: '#2a8050',
            gradient: 'linear-gradient(to right, rgba(210,240,220,0.4), rgba(140,215,170,0.6), rgba(80,190,120,0.8), rgba(30,160,80,0.9), rgba(0,90,30,1.0))',
            tileUrl: 'data/tiles/tellurium/{z}/{x}/{y}.png',
            pointsUrl: 'data/tellurium_points.geojson',
        },
        bismuth: {
            symbol: 'Bi', label: 'Bismuth', group: 'Strategic Metals',
            swatch: '#e06666', pointColor: '#e06666', pointStroke: '#b04848',
            gradient: 'linear-gradient(to right, rgba(255,220,210,0.4), rgba(240,170,150,0.6), rgba(225,120,100,0.8), rgba(200,80,60,0.9), rgba(130,10,10,1.0))',
            tileUrl: 'data/tiles/bismuth/{z}/{x}/{y}.png',
            pointsUrl: 'data/bismuth_points.geojson',
        },
        arsenic: {
            symbol: 'As', label: 'Arsenic', group: 'Strategic Metals',
            swatch: '#6b8e23', pointColor: '#6b8e23', pointStroke: '#4a6218',
            gradient: 'linear-gradient(to right, rgba(230,235,200,0.4), rgba(195,205,130,0.6), rgba(155,170,60,0.8), rgba(120,135,10,0.9), rgba(55,65,0,1.0))',
            tileUrl: 'data/tiles/arsenic/{z}/{x}/{y}.png',
            pointsUrl: 'data/arsenic_points.geojson',
        },
    },

    groups: {
        'Precious Metals': ['gold_lode', 'gold_placer', 'silver'],
        'Gold Geochemistry': ['gold_soil', 'gold_sediment'],
        'BLM Mining Claims': ['blm_lode_active', 'blm_lode_closed', 'blm_placer_active', 'blm_placer_closed'],
        'Base Metals': ['copper', 'lead', 'zinc', 'nickel', 'tin'],
        'Battery Metals': ['lithium', 'cobalt', 'manganese', 'vanadium'],
        'Industrial Metals': ['chromium', 'tungsten', 'uranium', 'titanium'],
        'Strategic Metals': ['antimony', 'beryllium', 'zirconium', 'niobium', 'tantalum', 'tellurium', 'bismuth', 'arsenic'],
    },

    groupOrder: [
        'Precious Metals', 'Gold Geochemistry', 'BLM Mining Claims', 'Base Metals',
        'Battery Metals', 'Industrial Metals', 'Strategic Metals',
    ],
};
