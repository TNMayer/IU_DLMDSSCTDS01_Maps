<script>
  import * as L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import { onMount } from 'svelte';
  import { dataStore } from '../stores/dataStore.js';
  import { joinData, createGeoJson, createInfo } from '../stores/helperFunctions.js';
  import Attribution from './submodules/Attribution.svelte';
  let countryData = $dataStore.countryData;
  let pointPolygonData = JSON.parse(JSON.stringify(countryData));
  let pointData = $dataStore.pointData;
  let filterCountriesIncluded;
  let colorize;

  let map = null;
  export let zoomLat = 15;
  export let zoomLong = 0;
  export let zoomLevel = 4;
  let zoomLatLong = [zoomLat, zoomLong];

  onMount(() => {
      pointPolygonData = joinData(pointPolygonData, $dataStore.choroplethData);
      let points = [];
      let marker;

      map = L.map('map', {attributionControl: false, preferCanvas: true}).setView(zoomLatLong, zoomLevel);

      let info = createInfo(L, map);
      createGeoJson(pointPolygonData, L, info, filterCountriesIncluded = false, colorize = false).addTo(map);
      createGeoJson(pointPolygonData, L, info, filterCountriesIncluded = true, colorize = false).addTo(map);
      pointData.forEach((elem) => {
        marker = L.circle([elem.latitude, elem.longitude], {
          stroke: false,
          fillColor: "red",
          radius: 1
        }).addTo(map);
      });
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