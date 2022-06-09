<script>
  import { onMount } from 'svelte';
  import { dataStore, getFetchData } from './stores/dataStore.js';
  import { appState } from './stores/appState.js';
  import Navigation from './lib/Navigation.svelte';
  import Choropleth from './lib/Choropleth.svelte';
  import Pointmap from './lib/Pointmap.svelte';

  const countryDataPath = "./src/assets/data/polygons_adm0.json";
  const choroplethDataPath = "./src/assets/data/choropleth_data.json";
  const pointDataPath = "./src/assets/data/point_data.json";

  $: if ($dataStore.loaded_countryData && $dataStore.loaded_choroplethData && $dataStore.loaded_pointData) {
    console.log("Alle Daten geladen");
	}

  onMount(async () => {
		getFetchData(countryDataPath)
			.then((data) => {
				$dataStore.countryData = data;
				$dataStore.loaded_countryData = true;
			})
			.catch(error => {
				console.log(error.message);
				alert("There was an error loading data! ADM0 error");
			});
    
    getFetchData(choroplethDataPath)
			.then((data) => {
				$dataStore.choroplethData = data;
				$dataStore.loaded_choroplethData = true;
			})
			.catch(error => {
				console.log(error.message);
				alert("There was an error loading data! Choropleth error");
			});
    
    getFetchData(pointDataPath)
			.then((data) => {
				$dataStore.pointData = data;
				$dataStore.loaded_pointData = true;
			})
			.catch(error => {
				console.log(error.message);
				alert("There was an error loading data! Point error");
			});
	});
</script>

<main>
  <Navigation />
  <div class="container">
    {#if ($dataStore.loaded_countryData && 
          $dataStore.loaded_choroplethData &&
          ($appState.mainNav == "choropleth")
    )}
      <Choropleth />
    {:else if ($dataStore.loaded_countryData && 
      $dataStore.loaded_pointData &&
      ($appState.mainNav == "pointmap")
    )}
      <Pointmap />
    {:else}
      <h2>Content still loading ...</h2>
    {/if}
  </div>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>
