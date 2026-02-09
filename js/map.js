const apiKey = window.APP_CONFIG?.ARCGIS_API_KEY || "";

function getFirstExisting(properties, keys) {
    for (const key of keys) {
        const value = properties[key];
        if (value !== undefined && value !== null && String(value).trim() !== "") {
            return String(value);
        }
    }
    return "N/A";
}

function formatDateValue(rawValue) {
    if (!rawValue) {
        return "N/A";
    }

    const numericValue = Number(rawValue);
    const dateValue = Number.isFinite(numericValue) ? new Date(numericValue) : new Date(rawValue);
    if (Number.isNaN(dateValue.getTime())) {
        return String(rawValue);
    }

    return dateValue.toLocaleString();
}

function warningPopupContent(feature) {
    const properties = feature?.properties || {};
    const eventName = getFirstExisting(properties, ["EVENT", "WARN_TYPE", "prod_type", "PHENOM"]);
    const severity = getFirstExisting(properties, ["SEVERITY", "SIG", "RISK", "COLOR"]);
    const headline = getFirstExisting(properties, ["HEADLINE", "PROD_TYPE", "DESCRIPTION"]);
    const area = getFirstExisting(properties, ["AREA_DESC", "COUNTY", "AREA", "NAME"]);
    const starts = formatDateValue(getFirstExisting(properties, ["ONSET", "ISSUED", "INIT_ISS"]));
    const expires = formatDateValue(getFirstExisting(properties, ["EXPIRES", "EXPIRATION", "ENDS", "ENDS_UTC"]));

    return `
        <div>
            <strong>${eventName}</strong><br>
            <strong>Severity:</strong> ${severity}<br>
            <strong>Headline:</strong> ${headline}<br>
            <strong>Area:</strong> ${area}<br>
            <strong>Starts:</strong> ${starts}<br>
            <strong>Expires:</strong> ${expires}
        </div>
    `;
}
  

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
moderate.bindPopup(function(layer) {
    return warningPopupContent(layer.feature);
});

// end moderate events

// NWS severe events layer
const severe = L.esri.featureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/NWS_Watches_Warnings_v1/FeatureServer/9',
    style: function() {
        return { color: '#cccc00', weight: 1 };
    }
});
severe.bindPopup(function(layer) {
    return warningPopupContent(layer.feature);
});
// end severe events

    // NWS extreme events layer
const extreme = L.esri.featureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/NWS_Watches_Warnings_v1/FeatureServer/8',
    style: function() {
        return { color: '#ff5500', weight: 2 };
    }
});
extreme.bindPopup(function(layer) {
    return warningPopupContent(layer.feature);
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
    layers: [radar, moderate, severe, extreme, caneError, caneCast, caneTrack],
    maxBoundsViscosity: 1.0
});

map.setMaxBounds([
    [-85, -179.99],
    [85, 179.99]
]);

const baseLayers = {};

if (apiKey.trim()) {
    const darkGray = L.esri.Vector.vectorBasemapLayer("ArcGIS:DarkGray", { apiKey: apiKey }).addTo(map);
    baseLayers["Dark gray"] = darkGray;
    baseLayers["Streets"] = L.esri.Vector.vectorBasemapLayer("ArcGIS:Streets", { apiKey: apiKey });
    baseLayers["Navigation"] = L.esri.Vector.vectorBasemapLayer("ArcGIS:Navigation", { apiKey: apiKey });
    baseLayers["Topographic"] = L.esri.Vector.vectorBasemapLayer("ArcGIS:Topographic", { apiKey: apiKey });
    baseLayers["Imagery"] = L.esri.Vector.vectorBasemapLayer("ArcGIS:Imagery", { apiKey: apiKey });
    baseLayers["ChartedTerritory"] = L.esri.Vector.vectorBasemapLayer("ArcGIS:ChartedTerritory", { apiKey: apiKey });
    baseLayers["Nova"] = L.esri.Vector.vectorBasemapLayer("ArcGIS:Nova", { apiKey: apiKey });
} else {
    console.warn("ARCGIS_API_KEY is empty. ArcGIS vector basemaps are disabled.");
}

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
