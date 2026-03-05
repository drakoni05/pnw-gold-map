/**
 * Mineral configuration for the Prospectivity Map webapp.
 * Mirrors the Python MINERALS dict in config.py.
 */

const MineralConfig = {
    minerals: {
        gold_lode: {
            symbol: 'Au', label: 'Lode Gold', group: 'Precious Metals',
            swatch: '#ff4500', pointColor: '#ff6347', pointStroke: '#cc3300',
            gradient: 'linear-gradient(to right, rgba(255,255,200,0.4), rgba(255,255,0,0.6), rgba(255,165,0,0.8), rgba(255,69,0,0.9), rgba(139,0,0,1.0))',
            tileUrl: 'data/tiles/lode/{z}/{x}/{y}.png',
            pointsUrl: 'data/lode_points.geojson',
            legacy: true,  // uses old naming convention
        },
        gold_placer: {
            symbol: 'Au', label: 'Placer Gold', group: 'Precious Metals',
            swatch: '#1e90ff', pointColor: '#4169e1', pointStroke: '#1a3cb0',
            gradient: 'linear-gradient(to right, rgba(200,220,255,0.4), rgba(100,149,237,0.6), rgba(30,144,255,0.8), rgba(0,0,205,0.9), rgba(0,0,80,1.0))',
            tileUrl: 'data/tiles/placer/{z}/{x}/{y}.png',
            pointsUrl: 'data/placer_points.geojson',
            legacy: true,
        },
        silver: {
            symbol: 'Ag', label: 'Silver', group: 'Precious Metals',
            swatch: '#708090', pointColor: '#a0a0b0', pointStroke: '#606080',
            gradient: 'linear-gradient(to right, rgba(220,220,235,0.4), rgba(180,180,210,0.6), rgba(140,140,190,0.8), rgba(100,100,170,0.9), rgba(40,40,110,1.0))',
            tileUrl: 'data/tiles/silver/{z}/{x}/{y}.png',
            pointsUrl: 'data/silver_points.geojson',
        },
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
    },

    groups: {
        'Precious Metals': ['gold_lode', 'gold_placer', 'silver'],
        'Base Metals': ['copper', 'lead', 'zinc'],
        'Industrial Metals': ['chromium', 'tungsten', 'uranium'],
    },

    groupOrder: ['Precious Metals', 'Base Metals', 'Industrial Metals'],
};
