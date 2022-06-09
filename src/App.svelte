<script>
  import { onMount } from 'svelte';
  import { dataStore, getFetchData } from './stores/dataStore.js';
  import { appState } from './stores/appState.js';
  import Navigation from './lib/Navigation.svelte';
  import Choropleth from './lib/Choropleth.svelte';
  import Pointmap from './lib/Pointmap.svelte';

  const countryDataPath = "./data/polygons_adm0.json";
  const choroplethDataPath = "./data/choropleth_data.json";
  const pointDataPath = "./data/point_data.json";

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

  :global(.info) {
      padding: 6px 8px;
      font: 14px/16px Arial, Helvetica, sans-serif;
      background: white;
      background: rgba(255,255,255,0.8);
      box-shadow: 0 0 15px rgba(0,0,0,0.2);
      border-radius: 5px;
  }

  :global(.info h4) {
      margin: 0 0 5px;
      color: #777;
  }
</style>