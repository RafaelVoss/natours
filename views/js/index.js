// remember to run the following command on cli (script on package.json)
// npm run watch:js

/* eslint-disable*/

//import '@babel/polyfill'; =====> test with try catch block!!!!!!!
import { displayMap } from './mapbox.js';
import { showAlert } from './alerts.js';
import { updateData } from './updateSettings.js';

// DOM ELEMENTS
const mapBox = document.getElementById('map');

// DELEGATION
if (mapBox) {
    const locations = JSON.parse(mapBox.dataset.locations);
    displayMap(locations);
}

const alertMessage = document.querySelector('body').dataset.alert;
if (alert) showAllert('success', alertMessage, 20);