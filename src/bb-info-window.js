export class BbInfoWindow {
    static get infoWindow() {
        if (!BbInfoWindow._infoWindow) {
            BbInfoWindow._infoWindow = new google.maps.InfoWindow();
        }
        return BbInfoWindow._infoWindow;
    };

    static set infoWindow(v) {
        BbInfoWindow._infoWindow = v;
    }
}
