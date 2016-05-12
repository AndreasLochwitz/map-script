"use strict";

(function() {
    var loadState = {
            'jsLoaded': false,
            'cssLoaded': false
        },
        mapPosition = [53.055072, 8.783455],
        mapZoom = 15,
        mapCallback = null; //function() { }; // dummy callback

    // valid values for stateVar: 'cssLoaded' or 'jsLoaded'
    function checkDone(stateVar) {
        return function() {
            loadState[stateVar] = true;
            if (loadState.cssLoaded === true && loadState.jsLoaded === true) {
                loadMap();
            }
        };
    }

    function loadMap() {
        var map = L.map('map').setView(mapPosition, mapZoom);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        if (mapCallback) {
            window[mapCallback](map);
        }
    }

    function loadFile(fileUrl, loadCallback) {
        var fileType = (fileUrl.split('.')).pop(),
            tagElement = document.createElement(fileType === 'css' ? 'link' : 'script'),
            headTag = null;
        tagElement.onload = loadCallback;
        if (fileType === 'css') {
            tagElement.type = "text/css";
            tagElement.rel = "stylesheet";
            tagElement.href = fileUrl;
            headTag = document.getElementsByTagName('head')[0];
            headTag.appendChild(tagElement);
        } else {
            tagElement.src = fileUrl;
            document.body.appendChild(tagElement);
        }
    }

    function initData() {
        var mapDiv = document.getElementById('map'),
            data_map_position = mapDiv.getAttribute('data-map-position'),
            t_mapZoom = parseInt(mapDiv.getAttribute('data-map-zoom')),
            t_mapCallback = mapDiv.getAttribute('data-map-callback');
        if (data_map_position != null) {
            // remove whitespaces from data_map_position
            data_map_position = data_map_position.replace(/ /g, '');
            mapPosition = data_map_position.split(',');
        }
        if (t_mapCallback) {
            mapCallback = t_mapCallback;
        }
        if (t_mapZoom) {
            mapZoom = t_mapZoom;
        }
    }

    initData();
    loadFile("http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css", checkDone('cssLoaded'));
    loadFile("http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js", checkDone('jsLoaded'));

})();