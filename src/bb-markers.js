import Papa from "papaparse";
import { BbMarker } from "./bb-marker";
import { BbGoogleMaps } from "./bb-google-maps";
import { BbInfoWindow } from "./bb-info-window";

export class BbMarkers {
    static get markers() {
        if (!BbMarkers._markers) {
            BbMarkers._markers = [];
        }
        return BbMarkers._markers;
    };

    static async loadSheet() {
        Papa.parse(
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vSdZ2KVe3fLnCSvYe-v_4UkCWM400bXi0ExfAYmeQcRFTk8l7p_2NSwG-uMuINPz3xMbxrHvGLF6gZh/pub?output=csv",
            {
                download: true,
                header: true,
                complete: function(results) {
                    const data = results.data;
                    for (const m of data) {
                        BbMarkers.markers.push({
                            location: {
                                lat: Number(m["Coordonées (Lat, Lon)"].split(",")[0]),
                                lng: Number(m["Coordonées (Lat, Lon)"].split(",")[1])
                            },
                            title: m["Titre"],
                            interest: m["Intérêt"],
                            potentialAmountOfRoutes: m["Nombre de voies potentielles"],
                            width: m["Largeur"],
                            height: m["Hauteur"],
                            orientation: m["Orientation"],
                            actualDevelopment: m["Développement actuel"],
                            attractions: m["Attraits"],
                            description: m["Description"],
                            sectors: m["Secteurs"],
                            FirstRoutesToBolt: m["Premières voies à ouvrir"],
                            Boulders: m["Blocs"],
                            Access: m["Accès"],
                            PicturesLink: m["Lien photo"],
                            LotNumber: m["lot cadastre"],
                            otherLinks: m["Liens Externes"],
                        })
                    }
                    BbMarkers.addMarkers().then(() => {
                        BbMarkers.addToggles();
                        google.maps.event.addListener(BbGoogleMaps.map, 'click', function () {
                            BbInfoWindow.infoWindow.close();
                        })
                        // clusterMarkers(map, markers);
                        // addPanToMarker(map, markers);
                    });
                }
            }
        );
    }

    static async addMarkers() {
        for (let i = 0; i < BbMarkers.markers.length; i++) {
            const marker = BbMarkers.markers[i];
            setTimeout(() => {
                BbMarker.addMarkerUI(marker);
            }, 1000 / BbMarkers.markers.length * i);
        }
    }

    static async addToggles() {
        const containerDiv = document.getElementById("togglesContainer");
        const options = [
            '4 - Oui !',
            '3 - Boui',
            '2 - Bof',
            '1 - Nof',
            '0 - Non',
        ]
        for (let i = 0; i < options.length; i++) {
            const type = options[i];

            const input = document.createElement('input');
            input.type = "checkbox";
            input.checked = true;
            input.classList.add("toggle");
            const id = "toggle" + i.toString(10);
            input.id = id;
            input.addEventListener("change", (ev) => {
                BbMarkers.toggleGroup(type, ev.target.checked);
            })
            containerDiv.appendChild(input);

            const label = document.createElement('label');
            label.for = id;
            label.textContent = type.split(' ')[2];
            containerDiv.appendChild(label);

            containerDiv.appendChild(document.createElement('br'));
        }
    }

    static toggleGroup(group, visible) {
        for (const m of BbMarkers.markers) {
            if (m.interest === group) {
                if (visible) {
                    m.mark.setMap(BbGoogleMaps.map);
                }
                else {
                    m.mark.setMap(null);
                }
            }
        }
    }
}
