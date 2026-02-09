# Weather Map (Leaflet + NOAA Radar)

## Overview
This project is a lightweight, browser-based weather visualization built with **Leaflet** and **Esri-Leaflet**. It displays **live NOAA radar imagery** and **National Weather Service (NWS) weather warnings** on an interactive map.

The goal of the project was to integrate real-time geospatial data from external services and present it in a clear, usable interface with minimal overhead.

---

## Features
- 🌦 Live NOAA radar overlay  
- ⚠️ Active NWS weather warnings  
- 🗺 Multiple basemap options  
- 🎛 Layer and basemap controls  
- 📱 Responsive layout using Bootstrap  

---

## Tech Stack
- HTML5  
- CSS3  
- JavaScript (vanilla)  
- Leaflet.js  
- Esri-Leaflet  
- Bootstrap 5  
- NOAA & NWS public data services  

---

## Why This Project
This project demonstrates:
- Consuming and displaying **real-time third-party geospatial data**
- Working with **mapping libraries and tile layers**
- Managing **layer controls and map state**
- Building a clean UI without a front-end framework
- Understanding how public APIs and GIS data sources are structured

It was intentionally kept framework-light to focus on fundamentals: data sources, rendering, and user interaction.

---

## Netlify Environment Variable Setup

This project expects an ArcGIS API key in `ARCGIS_API_KEY` when deployed on Netlify.

1. In Netlify, open your site.
2. Go to `Site configuration` -> `Environment variables`.
3. Add variable name `ARCGIS_API_KEY` with your ArcGIS key as the value.
4. Trigger a new deploy (`Deploys` -> `Trigger deploy` -> `Deploy site`).

During Netlify builds, `netlify.toml` writes that value into `js/config.js`, and `js/map.js` uses it for Esri vector basemaps.
