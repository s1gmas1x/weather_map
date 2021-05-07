var mymap = L.map('mapid', { minZoom:3 }).setView([32, -64], 4);
	
L.esri.basemapLayer('DarkGray').addTo(mymap);
L.esri.basemapLayer('DarkGrayLabels').addTo(mymap);

var southWest = L.latLng(-90, -180),
northEast = L.latLng(90, 180);

var bounds = L.latLngBounds(southWest, northEast);

mymap.setMaxBounds(bounds);

mymap.on('drag', function() {
    mymap.panInsideBounds(bounds, { animate: false });
});

L.control.scale().addTo(mymap);

// NOAA nexrad radar layer
 L.esri.dynamicMapLayer({
    url: 'https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer'
  }).addTo(mymap);
// end NOAA nexrad radar

// NWS moderate events layer
L.esri.featureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/NWS_Watches_Warnings_v1/FeatureServer/10',
	 style: function (feature) {
      return { color: '#6aaf00', weight: .125 };
    }
  }).addTo(mymap);
// end moderate events

// NWS severe events layer
L.esri.featureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/NWS_Watches_Warnings_v1/FeatureServer/9',
	 style: function (feature) {
      return { color: '#cccc00', weight: 1 };
    }
  }).addTo(mymap);
// end severe events

// NWS extreme events layer
L.esri.featureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/NWS_Watches_Warnings_v1/FeatureServer/8',
	 style: function (feature) {
      return { color: '#ff5500', weight: 2 };
    }
  }).addTo(mymap);
// end extreme events

// hurricane forcast error zone layer
L.esri.featureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/Active_Hurricanes_v1/FeatureServer/4',
	 style: function (feature) {
      return { color: '#6aaf00', weight: .125 };
    }
  }).addTo(mymap);
// end error zone

// hurricane forcast track layer
L.esri.featureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/Active_Hurricanes_v1/FeatureServer/2',
	 style: function (feature) {
      return { color: '#cccc00', weight: 1 };
    }
  }).addTo(mymap);
// end forcast track

// hurricane observed track layer
L.esri.featureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/Active_Hurricanes_v1/FeatureServer/3',
	 style: function (feature) {
      return { color: '#ff5500', weight: 2 };
    }
  }).addTo(mymap);
// end observed track




