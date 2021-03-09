import { BbGoogleMaps } from "./bb-google-maps";
import { BbInfoWindow } from "./bb-info-window";

export class BbMarker {
    static get icons() {
        return {
            "0 - Non": {
                path: "M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z",
                fillColor: "rgb(221, 221, 221)",
                fillOpacity: 1,
                strokeWeight: 1,
                rotation: 0,
                scale: 0.05,
                anchor: new google.maps.Point(242, 490),
            },
            "1 - Nof": {
                path: "M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z",
                fillColor: "rgb(237, 125, 49)",
                fillOpacity: 1,
                strokeWeight: 1,
                rotation: 0,
                scale: 0.05,
                anchor: new google.maps.Point(242, 490),
            },
            "2 - Bof": {
                path: "M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z",
                fillColor: "rgb(255, 192, 0)",
                fillOpacity: 1,
                strokeWeight: 1,
                rotation: 0,
                scale: 0.05,
                anchor: new google.maps.Point(242, 490),
            },
            "3 - Boui": {
                path: "M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z",
                fillColor: "rgb(112, 173, 71)",
                fillOpacity: 1,
                strokeWeight: 1,
                rotation: 0,
                scale: 0.05,
                anchor: new google.maps.Point(242, 490),
            },
            "4 - Oui !": {
                path: "M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z",
                fillColor: "rgb(112, 173, 71)",
                fillOpacity: 1,
                strokeWeight: 1,
                rotation: 0,
                scale: 0.07,
                anchor: new google.maps.Point(242, 490),
            },
            "fallback": {
                path: "M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z",
                fillColor: "#fff",
                fillOpacity: 1,
                strokeWeight: 1,
                rotation: 0,
                scale: 0.05,
                anchor: new google.maps.Point(242, 490),
            }
        };
    }


    static addMarkerUI(marker) {
        let icon = BbMarker.icons[marker.interest];
        if (!icon) {
            icon = BbMarker.icons["fallback"];
        }

        marker.mark = new google.maps.Marker({
            map: BbGoogleMaps.map,
            position: marker.location,
            icon: icon,
            title: marker.title,
            animation: google.maps.Animation.DROP,
        });
        marker.html =
        `
        <div id="topTitle">${marker.title}</div><br/>

        <div class="info">Intérêt:</div><div class="infoDetails">${marker.interest}</div><br/>
        <div class="info">Potentiel de voies:</div><div class="infoDetails">${marker.potentialAmountOfRoutes}</div><br/>
        <div class="info">Largeur:</div><div class="infoDetails">${marker.width}</div><br/>
        <div class="info">Hauteur:</div><div class="infoDetails">${marker.height}</div><br/>
        <div class="info">Orientation:</div><div class="infoDetails">${marker.orientation}</div><br/>
        <div class="info">Développement actuel:</div><div class="infoDetails">${marker.actualDevelopment}</div><br/>
        <div class="info">Attraits principaux:</div><div class="infoDetails">${marker.attractions}</div><br/>
        <div class="info">Description:</div><div class="infoDetails">${marker.description}</div><br/>
        <div class="info">Secteurs:</div><div class="infoDetails">${marker.sectors}</div><br/>
        <div class="info">Premières voies à ouvrir:</div><div class="infoDetails">${marker.FirstRoutesToBolt}</div><br/>
        <div class="info">Blocs:</div><div class="infoDetails">${marker.Boulders}</div><br/>
        <div class="info">Accès:</div><div class="infoDetails">${marker.Access}</div><br/>
        <div class="info">Lien Photos:</div><div class="infoDetails">${marker.PicturesLink}</div><br/>
        <div class="info">Numéro de lot du cadastre:</div><div class="infoDetails">${marker.LotNumber}</div><br/>
        <div class="info">Autres liens:</div><div class="infoDetails">${marker.otherLinks}</div><br/>
        `
        BbMarker.bindInfoWindow(marker);
    }

    static bindInfoWindow(marker) {
        google.maps.event.addListener(marker.mark, 'click', function () {
            BbInfoWindow.infoWindow.setContent(marker.html);
            BbInfoWindow.infoWindow.open(map, marker.mark);
        });
    }


}
