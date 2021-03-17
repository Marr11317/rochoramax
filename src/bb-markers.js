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
                            firstRoutesToBolt: m["Premières voies à ouvrir"],
                            boulders: m["Blocs"],
                            access: m["Accès"],
                            picturesLink: m["Lien photo"],
                            lotNumber: m["lot cadastre"],
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
        const containerDiv = document.createElement("div");
        containerDiv.id = "togglesContainer";
        const options = [
            '4 - Oui !',
            '3 - Boui',
            '2 - Bof',
            '1 - Nof',
            '0 - Non',
        ]
        for (let i = 0; i < options.length; i++) {
            const type = options[i];

            const div = document.createElement('div');
            div.classList.add("singleToggleDiv");

            const input = document.createElement('input');
            input.type = "checkbox";
            input.checked = true;
            input.classList.add("toggle");
            const id = "toggle" + i.toString(10);
            input.id = id;
            input.addEventListener("change", (ev) => {
                BbMarkers.toggleGroup(type, ev.target.checked);
            })
            div.appendChild(input);

            const color = document.createElement('div');
            color.style.background = BbMarker.icons[type].fillColor;
            color.style.height = "12px";
            color.style.width = "12px";
            color.style.borderRadius = "50%";
            color.style.display = "inline-block";
            color.style.marginRight = "3px";
            div.appendChild(color);

            const label = document.createElement('label');
            label.htmlFor = id;
            label.textContent = type.split(' ')[2];
            div.appendChild(label);

            div.appendChild(document.createElement('br'));
            containerDiv.appendChild(div);
        }
        document.body.appendChild(containerDiv);
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
