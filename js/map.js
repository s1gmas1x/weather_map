var gray = L.layerGroup();
var img = L.layerGroup();

L.esri.basemapLayer('DarkGray').addTo(gray);
L.esri.basemapLayer('DarkGrayLabels').addTo(gray);
L.esri.basemapLayer('Imagery').addTo(img);
L.esri.basemapLayer('ImageryLabels').addTo(img);




// NOAA nexrad radar layer
var radar = L.esri.dynamicMapLayer({
    url: 'https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer'
});
// end NOAA nexrad radar

// NWS moderate events layer
var moderate = L.esri.featureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/NWS_Watches_Warnings_v1/FeatureServer/10',
    style: function(feature) {
        return { color: '#6aaf00', weight: .125 };
    }
});
// end moderate events

// NWS severe events layer
var severe = L.esri.featureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/NWS_Watches_Warnings_v1/FeatureServer/9',
    style: function(feature) {
        return { color: '#cccc00', weight: 1 };
    }
});
// end severe events

// NWS extreme events layer
var extreme = L.esri.featureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/NWS_Watches_Warnings_v1/FeatureServer/8',
    style: function(feature) {
        return { color: '#ff5500', weight: 2 };
    }
});
// end extreme events

// hurricane forcast error zone layer
var caneError = L.esri.featureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/Active_Hurricanes_v1/FeatureServer/4',
    style: function(feature) {
        return { color: '#6aaf00', weight: .125 };
    }
});
// end error zone

// hurricane forcast track layer
var caneCast = L.esri.featureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/Active_Hurricanes_v1/FeatureServer/2',
    style: function(feature) {
        return { color: '#cccc00', weight: 1 };
    }
});
// end forcast track

// hurricane observed track layer
var caneTrack = L.esri.featureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/Active_Hurricanes_v1/FeatureServer/3',
    style: function(feature) {
        return { color: '#ff5500', weight: 2 };
    }
});
// end observed track
var map = L.map('mapid', {

    center: [32, -64],
    zoom: 4,
    minZoom: 3,
    layers: [gray, radar, extreme, severe, moderate, caneError, caneCast, caneTrack]
});

var southWest = L.latLng(-90, -180),
    northEast = L.latLng(90, 180);


var bounds = L.latLngBounds(southWest, northEast);

map.setMaxBounds(bounds);

map.on('drag', function() {
    map.panInsideBounds(bounds);
});

var baseLayers = {
    Grayscale: gray,
    Streetmap: L.esri.basemapLayer('Streets'),
    Image: img
};

var overlays = {
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