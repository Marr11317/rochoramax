/**
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
import MarkerClusterer from '@google/markerclustererplus';


function clusterMarkers(map, markers) {
    const clustererOptions = { imagePath: './img/m' }
    const markerCluster = new MarkerClusterer(map, markers.mark, clustererOptions);
}

function addPanToMarker(map, markers) {
    markers.map(marker => {
        marker.mark.addListener('click', event => {
            const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };
            map.panTo(location);
        });
    });
}


window.toggleGroup = toggleGroup;

async function toggleGroup(visible, interest) {
    console.log(visible);
    for (const m of gMarkers) {
        if (m.interest === interest) {
            if (visible) {
                m.mark.setMap(null);
            }
            else {
                m.mark.setMap(gMap);
            }
            // console.log(m.mark.getMap());
        }
    }
}
