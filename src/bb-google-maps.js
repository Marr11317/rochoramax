export class BbGoogleMaps {
    static load(callback) {
        const googleMapsAPIKey = 'AIzaSyDzRzTyzp4dcgND9mpFv4vVCW3JYjZSChk';
        const googleMapsAPIURI = `https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}&callback=googleMapsLoadCallback`;

        const script = document.createElement('script');
        script.src = googleMapsAPIURI;
        script.defer = true;
        script.async = true;

        window.googleMapsLoadCallback = callback;

        document.head.appendChild(script);
    }

    static displayMap() {
        const mapOptions = {
            center: { lat: 46, lng: -74.5 },
            zoom: 9
        };

        const mapDiv = document.getElementById('map');
        BbGoogleMaps.map = new google.maps.Map(mapDiv, mapOptions);
    }
}
