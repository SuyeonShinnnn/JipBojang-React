import { useEffect, useRef, useState } from 'react';
import { getAccidentCount, getColorByAccident } from '../utils/accident';
import geojson from '../assets/data/sig_with_centers.json';
import accidentData from '../assets/data/accident.json';
import { groupByCity } from '../utils/groupRegion';

export const usePolygon = (map: kakao.maps.Map | null) => {
  const polygonsRef = useRef<kakao.maps.Polygon[]>([]);
  const overlaysRef = useRef<kakao.maps.CustomOverlay[]>([]);
  const [showPolygon, setShowPolygon] = useState(false);

  const clearPolygon = () => {
    polygonsRef.current.forEach((p) => p.setMap(null));
    overlaysRef.current.forEach((o) => o.setMap(null));

    polygonsRef.current = [];
    overlaysRef.current = [];
  };

  const drawPolygon = () => {
    if (!map) return;

    clearPolygon();

    const level = map.getLevel();

    // polygon 전체 생성
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
        map,
        path: paths,
        strokeWeight: 2,
        strokeColor: '#ff0000',
        strokeOpacity: 0.8,
        fillColor: getColorByAccident(regionName),
        fillOpacity: 0.6,
      });

      polygonsRef.current.push(polygon);
    }

    // 구단위
    if (level >= 10) {
      const cityGroups = groupByCity(geojson.features, accidentData);

      cityGroups.forEach((city) => {
        const overlay = createOverlay({
          map,
          lat: city.lat,
          lng: city.lng,
          name: city.name,
          count: city.count,
        });

        overlaysRef.current.push(overlay);
      });

      return;
    }

    // 시단위
    for (const feature of geojson.features) {
      const regionName = feature.properties.SIG_KOR_NM ?? '';

      const centerLat = feature.properties.center_lat;
      const centerLng = feature.properties.center_lng;

      if (centerLat == null || centerLng == null) continue;

      const count = getAccidentCount(regionName);

      const overlay = createOverlay({
        map,
        lat: centerLat,
        lng: centerLng,
        name: regionName,
        count,
      });

      overlaysRef.current.push(overlay);
    }
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

  useEffect(() => {
    if (!map || !showPolygon) return;

    const handleZoomChanged = () => {
      drawPolygon();
    };
    kakao.maps.event.addListener(map, 'zoom_changed', handleZoomChanged);

    return () => {
      kakao.maps.event.removeListener(map, 'zoom_changed', handleZoomChanged);
    };
  }, [map, showPolygon]);

  const createOverlay = ({
    map,
    lat,
    lng,
    name,
    count,
  }: {
    map: kakao.maps.Map;
    lat: number;
    lng: number;
    name: string;
    count: number;
  }) => {
    const content = document.createElement('div');

    content.style.width = '80px';
    content.style.height = '80px';
    content.style.borderRadius = '50%';
    content.style.background = '#7774ea';
    content.style.color = '#fff';
    content.style.display = 'flex';
    content.style.flexDirection = 'column';
    content.style.justifyContent = 'center';
    content.style.alignItems = 'center';

    content.innerHTML = `
    <div>${name}</div>
    <div><strong>${count}</strong>건</div>
  `;

    const overlay = new kakao.maps.CustomOverlay({
      position: new kakao.maps.LatLng(lat, lng),
      content,
    });

    overlay.setMap(map);

    return overlay;
  };

  return {
    togglePolygon,
  };
};
