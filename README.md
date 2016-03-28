# map-script
Load a leaflet map into your page by simply adding a div and script tag

# Usage

1. Add a div to your page:

    ```
    <div id="map" data-map-position="53.055072,8.783455" data-map-zoom="16" data-map-callback="mapCallback"></div>    
    ```
    
    *Notes*
    - id="map" is required
    - data-map-position describes latitude and longitude of the position that the map should display
    - data-map-zoom set the zoom-level of the map
    - data-map-callback set a callback handler that will called after the map is loaded. The map-instance is given to the callback for further usage.

2. Load the JavaScript file to load the map:

    ```
    <script src="map-script.js"></script>
    ``` 