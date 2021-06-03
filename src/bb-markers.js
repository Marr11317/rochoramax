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

        const toggleAllInterests = document.createElement("button");
        toggleAllInterests.textContent = "Intérêt";
        toggleAllInterests.style.width = "100%";
        toggleAllInterests.addEventListener("click", () => {
            BbMarkers.toggleAll(interestCheckBoxes, "interest");
        })
        containerDiv.appendChild(toggleAllInterests);

        const icons = BbMarker.icons;
        let checkboxCount = 0;
        for (const key in icons) {
            if (Object.hasOwnProperty.call(icons, key)) {
                if (key === "fallback") {
                    continue;
                }
                const icon = icons[key];
                const div = document.createElement('div');
                div.classList.add("singleToggleDiv");

                const input = document.createElement('input');
                input.type = "checkbox";
                input.checked = true;
                input.classList.add("toggle");
                const id = "toggle" + checkboxCount.toString(10);
                input.id = id;
                input.addEventListener("change", (ev) => {
                    BbMarkers.toggleGroup("interest", key, ev.target.checked);
                })
                interestCheckBoxes.push(input);
                div.appendChild(input);

                const color = document.createElement('div');
                color.style.background = icon.fillColor;
                color.style.height = "12px";
                color.style.width = "12px";
                color.style.borderRadius = "50%";
                color.style.display = "inline-block";
                color.style.marginRight = "4px";
                color.style.marginLeft = "1px";
                div.appendChild(color);

                const label = document.createElement('label');
                label.htmlFor = id;
                label.textContent = key.split(' ')[2];
                div.appendChild(label);

                containerDiv.appendChild(div);

                checkboxCount++;
            }
        }
        const divider = document.createElement("div");
        divider.style.width = "100%";
        divider.style.height = "1px";
        divider.style.background = "#000";
        containerDiv.appendChild(divider);

        const toggleAllOrientations = document.createElement("button");
        toggleAllOrientations.textContent = "Orientation";
        toggleAllOrientations.style.width = "100%";
        toggleAllOrientations.addEventListener("click", () => {
            BbMarkers.toggleAll(orientationCheckBoxes, "orientation");
        })
        containerDiv.appendChild(toggleAllOrientations);

        const orientations = [
            "Est",
            "Nord-Est",
            "Nord",
            "Nord-Ouest",
            "Ouest",
            "Sud-Ouest",
            "Sud",
            "Sud-Est",
            "Multiple",
        ]
        const display = [
            "E",
            "NE",
            "N",
            "NW",
            "W",
            "SW",
            "S",
            "SE",
            "Multiple",
        ]
        const arrows = [
            "\u2192",
            "\u2197",
            "\u2191",
            "\u2196",
            "\u2190",
            "\u2199",
            "\u2193",
            "\u2198",
            "\u2940",
        ]
        for (let i = 0; i < orientations.length; i++) {
            const orientation = orientations[i];

            const div = document.createElement('div');
            div.classList.add("singleToggleDiv");

            const input = document.createElement('input');
            input.type = "checkbox";
            input.checked = true;
            input.classList.add("toggle");
            const id = "toggle" + i.toString(10);
            input.id = id;
            input.addEventListener("change", (ev) => {
                BbMarkers.toggleGroup("orientation", orientation, ev.target.checked);
            })
            orientationCheckBoxes.push(input);
            div.appendChild(input);

            const arrow = document.createElement('div');
            arrow.textContent = arrows[i];
            arrow.style.display = "inline-block";
            arrow.style.textAlign = "center";
            arrow.style.minWidth = "14px";
            arrow.style.marginRight = "3px";
            div.appendChild(arrow);

            const label = document.createElement('label');
            label.htmlFor = id;
            label.textContent = display[i];
            div.appendChild(label);

            containerDiv.appendChild(div);

            checkboxCount++;
        }
        document.body.appendChild(containerDiv);
    }

    static toggleGroup(which, group, visible) {
        state[which][group] = visible;
        BbMarkers.updateState();
    }
    static updateState() {
        for (const m of BbMarkers.markers) {
            if (state.interest[m.interest] && state.orientation[m.orientation]) {
                    m.mark.setMap(BbGoogleMaps.map);
            }
            else {
                m.mark.setMap(null);
            }
        }
    }
    static toggleAll(targets, which) {
        let allChecked = true;
        for (const c of targets) {
            if (!c.checked) {
                allChecked = false;
                break;
            }
        }
        for (const i in state[which]) {
            if (Object.hasOwnProperty.call(state[which], i)) {
                state[which][i] = !allChecked;
            }
        }
        for (const c of targets) {
            c.checked = !allChecked;
        }
        BbMarkers.updateState();
    }
}

let interestCheckBoxes = [];
let orientationCheckBoxes = [];

let state = {
    interest: {
        '4 - Oui !': true,
        '3 - Boui': true,
        '2 - Bof': true,
        '1 - Nof': true,
        '0 - Non': true,
    },
    orientation: {
        "Est": true,
        "Nord-Est": true,
        "Nord": true,
        "Nord-Ouest": true,
        "Ouest": true,
        "Sud-Ouest": true,
        "Sud": true,
        "Sud-Est": true,
        "Multiple": true,
    }
}
