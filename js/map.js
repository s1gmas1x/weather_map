const gray = L.layerGroup();
const img = L.layerGroup();
const street = L.layerGroup();

L.esri.basemapLayer('DarkGray').addTo(gray);
L.esri.basemapLayer('DarkGrayLabels').addTo(gray);
L.esri.basemapLayer('Streets').addTo(street);
L.esri.basemapLayer('Imagery').addTo(img);
L.esri.basemapLayer('ImageryLabels').addTo(img);




// NOAA nexrad radar layer
const radar = L.esri.dynamicMapLayer({
    url: 'https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer'
});
// end NOAA nexrad radar

// NWS moderate events layer
const moderate = L.esri.featureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/NWS_Watches_Warnings_v1/FeatureServer/10',
    style: function(feature) {
        return { color: '#6aaf00', weight: .125 };
    }
});
// end moderate events

// NWS severe events layer
const severe = L.esri.featureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/NWS_Watches_Warnings_v1/FeatureServer/9',
    style: function(feature) {
        return { color: '#cccc00', weight: 1 };
    }
});
// end severe events

// NWS extreme events layer
const extreme = L.esri.featureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/NWS_Watches_Warnings_v1/FeatureServer/8',
    style: function(feature) {
        return { color: '#ff5500', weight: 2 };
    }
});
// end extreme events

// hurricane forcast error zone layer
const caneError = L.esri.featureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/Active_Hurricanes_v1/FeatureServer/4',
    style: function(feature) {
        return { color: '#6aaf00', weight: .125 };
    }
});
// end error zone

// hurricane forcast track layer
const caneCast = L.esri.featureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/Active_Hurricanes_v1/FeatureServer/2',
    style: function(feature) {
        return { color: '#cccc00', weight: 1 };
    }
});
// end forcast track

// hurricane observed track layer
const caneTrack = L.esri.featureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/Active_Hurricanes_v1/FeatureServer/3',
    style: function(feature) {
        return { color: '#ff5500', weight: 2 };
    }
});
// end observed track
map = L.map('mapid', {

    center: [32, -64],
    zoom: 4,
    minZoom: 3,
    layers: [gray, radar, extreme, severe, moderate, caneError, caneCast, caneTrack],
    maxBoundsViscosity: 1.0,
});

map.setMaxBounds([
    [-85, -180],
    [85, 180]
]);



const baseLayers = {
    'Grayscale': gray,
    'Street Map': street,
    'Image': img
};

const overlays = {
    'Radar': radar,
    'NWS Extreme Events': extreme,
    'NWS Severe Events': severe,
    'NWS Moderate Events': moderate,
    'Hurricane Error Cone': caneError,
    'Hurricane Forecast Track': caneCast,
    'Hurricane Observed Track': caneTrack

};

L.control.scale().addTo(map);
L.control.layers(baseLayers, overlays).addTo(map);