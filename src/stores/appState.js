import { writable } from 'svelte/store';

export const appState = writable({
    mainNav: 'choropleth'
});