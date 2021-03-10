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
        marker.html = `<div id="topTitle">${marker.title}</div><br/>`
        const infos = [
            {text: "Intérêt",                   field: "interest",                  link: false },
            {text: "Potentiel de voies",        field: "potentialAmountOfRoutes",   link: false },
            {text: "Largeur",                   field: "width",                     link: false },
            {text: "Hauteur",                   field: "height",                    link: false },
            {text: "Orientation",               field: "orientation",               link: false },
            {text: "Développement actuel",      field: "actualDevelopment",         link: false },
            {text: "Attraits principaux",       field: "attractions",               link: false },
            {text: "Description",               field: "description",               link: false },
            {text: "Secteurs",                  field: "sectors",                   link: false },
            {text: "Premières voies à ouvrir",  field: "firstRoutesToBolt",         link: false },
            {text: "Blocs",                     field: "boulders",                  link: false },
            {text: "Accès",                     field: "access",                    link: false },
            {text: "Lien Photos",               field: "picturesLink",              link: true  },
            {text: "Numéro de lot du cadastre", field: "lotNumber",                 link: false },
            {text: "Autres liens",              field: "otherLinks",                link: true  },
        ]

        for (const info of infos) {
            const value = marker[info.field];
            if (value) {
                if (info.link) {
                    marker.html += `<div class="info">${info.text}</div><a class="infoDetails" href="${value}" target="_blank">${value}</a><br/>`;
                }
                else {
                    marker.html += `<div class="info">${info.text}</div><div class="infoDetails">${value}</div><br/>`;
                }
            }
        }
        BbMarker.bindInfoWindow(marker);
    }

    static bindInfoWindow(marker) {
        google.maps.event.addListener(marker.mark, 'click', function () {
            BbInfoWindow.infoWindow.setContent(marker.html);
            BbInfoWindow.infoWindow.open(map, marker.mark);
        });
    }
}
