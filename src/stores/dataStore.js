import { writable } from 'svelte/store';

export const dataStore = writable({
    loaded_countryData: false,
    loaded_choroplethData: false,
    loaded_pointData: false,
    
    countryData: undefined,
    choroplethData: undefined,
    pointData: undefined
});

console.log("set up store");

export async function getFetchData (url) {
    let response = await fetch(url);
    let data = await response.json();

    return data;
}