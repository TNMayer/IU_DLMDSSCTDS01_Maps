<script>
    import * as L from 'leaflet';
    import 'leaflet/dist/leaflet.css';
    import { onMount } from 'svelte';
    import { dataStore } from '../stores/dataStore.js';
    import { joinData, createGeoJson, createInfo } from '../stores/helperFunctions.js';
    import Attribution from './submodules/Attribution.svelte';
    let countryData = $dataStore.countryData;
    let choroplethData = JSON.parse(JSON.stringify(countryData));
    let filterCountriesIncluded;
    let colorize;
  
    let map = null;
    export let zoomLat = 15;
    export let zoomLong = 0;
    export let zoomLevel = 4;
    let zoomLatLong = [zoomLat, zoomLong];
  
    onMount(() => {
        choroplethData = joinData(choroplethData, $dataStore.choroplethData);
        map = L.map('map', {attributionControl: false}).setView(zoomLatLong, zoomLevel);

        let info = createInfo(L, map);
        createGeoJson(choroplethData, L, info, filterCountriesIncluded = false, colorize = false).addTo(map);
        createGeoJson(choroplethData, L, info, filterCountriesIncluded = true, colorize = true).addTo(map);
        info.addTo(map);
    });
  </script>
  
  <style>
      #map {
        height: calc(100vh - 130px);
        background-color: #eee;
      }
  </style>
  
  <div id="map" class="map" />
  <Attribution />