import { BbGoogleMaps } from "./bb-google-maps";
import { BbInfoWindow } from "./bb-info-window";
import { BbMarkers } from "./bb-markers";

BbGoogleMaps.load(function () {
    BbGoogleMaps.displayMap();
    BbInfoWindow.infoWindow = new google.maps.InfoWindow();
    BbMarkers.loadSheet(BbGoogleMaps.map);
});
