const gray = L.layerGroup();
const img = L.layerGroup();
const street = L.layerGroup();
const apiKey = "ArcGisAPIkey";
  

//L.esri.basemapLayer('DarkGray').addTo(gray);
//L.esri.basemapLayer('DarkGrayLabels').addTo(gray);
//L.esri.basemapLayer('Streets').addTo(street);
//L.esri.basemapLayer('Imagery').addTo(img);
//L.esri.basemapLayer('ImageryLabels').addTo(img);




//NOAA Weather Radar
const radar = L.esri.dynamicMapLayer({
    url: 'https://mapservices.weather.noaa.gov/eventdriven/rest/services/radar/radar_base_reflectivity/MapServer/',
    layers: [3],
    // Add these options
    useCors: true,
    f: 'image',
    opacity: 0.6,
    // Add error handling
}).on('requesterror', function(e) {
    console.log('Radar layer error:', e);
});

// NWS moderate events layer
const moderate = L.esri.featureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/NWS_Watches_Warnings_v1/FeatureServer/10',
    style: function() {
        return { color: '#6aaf00', weight: .125 };
    }
});

// end moderate events

// NWS severe events layer
const severe = L.esri.featureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/NWS_Watches_Warnings_v1/FeatureServer/9',
    style: function() {
        return { color: '#cccc00', weight: 1 };
    }
});
// end severe events

    // NWS extreme events layer
const extreme = L.esri.featureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/NWS_Watches_Warnings_v1/FeatureServer/8',
    style: function() {
        return { color: '#ff5500', weight: 2 };
    }
});
// end extreme events

// hurricane forcast error zone layer
const caneError = L.esri.featureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/Active_Hurricanes_v1/FeatureServer/4',
    style: function() {
        return { color: '#6aaf00', weight: .125 };
    }
});
// end error zone

// hurricane forcast track layer
const caneCast = L.esri.featureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/Active_Hurricanes_v1/FeatureServer/2',
    style: function() {
        return { color: '#cccc00', weight: 1 };
    }
});
// end forcast track

// hurricane observed track layer
const caneTrack = L.esri.featureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/Active_Hurricanes_v1/FeatureServer/3',
    style: function() {
        return { color: '#ff5500', weight: 2 };
    }
});
// end observed track

map = L.map('mapid', {

    center: [32, -64],
    zoom: 4,
    minZoom: 3,
    layers: [gray, radar, moderate, severe, extreme, caneError, caneCast, caneTrack],
    maxBoundsViscosity: 1.0,
});

map.setMaxBounds([
    [-85, -180],
    [85, 180]
]);



const baseLayers = {
    "Dark gray": L.esri.Vector.vectorBasemapLayer("ArcGIS:DarkGray", { apiKey: apiKey }).addTo(map),
    
    Streets: L.esri.Vector.vectorBasemapLayer("ArcGIS:Streets", { apiKey: apiKey }),
    Navigation: L.esri.Vector.vectorBasemapLayer("ArcGIS:Navigation", { apiKey: apiKey }),
    Topographic: L.esri.Vector.vectorBasemapLayer("ArcGIS:Topographic", { apiKey: apiKey }),
    Imagery: L.esri.Vector.vectorBasemapLayer("ArcGIS:Imagery", { apiKey: apiKey }),
    ChartedTerritory: L.esri.Vector.vectorBasemapLayer("ArcGIS:ChartedTerritory", { apiKey: apiKey }),
    Nova: L.esri.Vector.vectorBasemapLayer("ArcGIS:Nova", { apiKey: apiKey }),
};

const overlays = {
    'Radar': radar,
    'NWS Moderate Events': moderate,
    'NWS Severe Events': severe,
    'NWS Extreme Events': extreme,
    'Hurricane Error Cone': caneError,
    'Hurricane Forecast Track': caneCast,
    'Hurricane Observed Track': caneTrack

};

L.control.scale().addTo(map);

L.control.layers(baseLayers, overlays).addTo(map);
