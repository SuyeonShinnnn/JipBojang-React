import { useState } from 'react';
import { getAccidentCount, getColorByAccident } from '../utils/accident';
import geojson from '../assets/data/sig_with_centers.json';

export const usePolygon = (map: kakao.maps.Map | null) => {
  const [polygons, setPolygons] = useState<kakao.maps.Polygon[]>([]);
  const [regionOverlays, setRegionOverlays] = useState<
    kakao.maps.CustomOverlay[]
  >([]);
  const [showPolygon, setShowPolygon] = useState(false);

  const clearPolygon = () => {
    polygons.forEach((p) => p.setMap(null));
    regionOverlays.forEach((o) => o.setMap(null));
  };

  const drawPolygon = () => {
    if (!map) return;

    polygons.forEach((polygon) => polygon.setMap(null));
    regionOverlays.forEach((overlay) => overlay.setMap(null));

    const newPolygons: kakao.maps.Polygon[] = [];
    const newOverlays: kakao.maps.CustomOverlay[] = [];

    for (const feature of geojson.features) {
      const coords = feature.geometry.coordinates;
      const type = feature.geometry.type;

      const paths: kakao.maps.LatLng[][] = [];

      if (type === 'Polygon') {
        paths.push(
          (coords[0] as number[][]).map(
            (coord) => new kakao.maps.LatLng(coord[1], coord[0]),
          ),
        );
      }

      if (type === 'MultiPolygon') {
        const multiPolygonCoords = coords as unknown as number[][][][];

        for (const polygon of multiPolygonCoords) {
          const outerPath = polygon[0] as number[][];

          paths.push(
            outerPath.map(
              (coord: number[]) => new kakao.maps.LatLng(coord[1], coord[0]),
            ),
          );
        }
      }

      const regionName = feature.properties.SIG_KOR_NM ?? '';

      const polygon = new kakao.maps.Polygon({
        path: paths,
        strokeWeight: 2,
        strokeColor: '#ff0000',
        strokeOpacity: 0.8,
        fillColor: getColorByAccident(regionName),
        fillOpacity: 0.6,
      });

      polygon.setMap(map);

      newPolygons.push(polygon);

      const centerLat = feature.properties.center_lat;
      const centerLng = feature.properties.center_lng;

      if (centerLat == null || centerLng == null) continue;

      const centerLatLng = new kakao.maps.LatLng(centerLat, centerLng);

      const count = getAccidentCount(regionName);

      const content = document.createElement('div');

      content.style.width = '75px';
      content.style.height = '75px';
      content.style.borderRadius = '50%';
      content.style.background = '#7774ea';
      content.style.opacity = '0.9';
      content.style.color = '#fff';
      content.style.fontSize = '14px';
      content.style.display = 'flex';
      content.style.flexDirection = 'column';
      content.style.alignItems = 'center';
      content.style.justifyContent = 'center';

      content.innerHTML = `
      <div>${regionName}</div>
      <div><strong>${count.toLocaleString()}</strong>건</div>
    `;

      const overlay = new kakao.maps.CustomOverlay({
        position: centerLatLng,
        content,
        yAnchor: 0.5,
        zIndex: 3,
      });

      overlay.setMap(map);

      newOverlays.push(overlay);
    }

    setPolygons(newPolygons);
    setRegionOverlays(newOverlays);
  };

  const togglePolygon = () => {
    if (showPolygon) {
      clearPolygon();
      setShowPolygon(false);
    } else {
      drawPolygon();
      setShowPolygon(true);
    }
  };

  return {
    showPolygon,
    togglePolygon,
  };
};
