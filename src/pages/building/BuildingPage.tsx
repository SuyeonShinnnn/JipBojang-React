import styled from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import SearchBar from "./components/SearchBar";
import { useEffect, useState, useCallback } from "react";
import type { Place } from "../../types/building";
import BuildingInfoBar from "./components/BuildingInfoBar";
import { useLocation } from "react-router-dom";
import markerIcon from "../../assets/building/marker.png";

const BuildingPage = () => {
  const [center, setCenter] = useState({ lat: 37.579617, lng: 126.977041 });
  const [selected, setSelected] = useState<Place | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);

  const location = useLocation();
  const address = location.state?.address;

  const searchNearbyBuildings = useCallback((currentMap: kakao.maps.Map) => {
    const ps = new kakao.maps.services.Places();
    const keywords = ["아파트", "오피스텔", "빌라"];
    let combinedResults: Place[] = [];
    let completedQueries = 0;

    keywords.forEach((kw) => {
      ps.keywordSearch(
        kw,
        (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const results = data.map((place) => ({
              lat: Number(place.y),
              lng: Number(place.x),
              name: place.place_name,
              address: place.address_name,
              roadAddress: place.road_address_name,
              category: place.category_name,
            }));
            combinedResults = [...combinedResults, ...results];
          }

          completedQueries++;

          if (completedQueries === keywords.length) {
            setPlaces(combinedResults);
          }
        },
        {
          location: currentMap.getCenter(),
          radius: 1000,
          sort: kakao.maps.services.SortBy.DISTANCE,
        },
      );
    });
  }, []);

  const handleSearch = (keyword: string) => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status) => {
      if (status !== kakao.maps.services.Status.OK) return;

      const results = data.map((place) => ({
        lat: Number(place.y),
        lng: Number(place.x),
        name: place.place_name,
        address: place.address_name,
        roadAddress: place.road_address_name,
        category: place.category_name,
      }));

      setPlaces(results);
      const firstResult = new kakao.maps.LatLng(results[0].lat, results[0].lng);
      map.panTo(firstResult);
    });
  };

  useEffect(() => {
    if (!map) return;

    if (address) {
      handleSearch(address);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCenter(loc);
        map.setCenter(new kakao.maps.LatLng(loc.lat, loc.lng));
        searchNearbyBuildings(map);
      });
    }
  }, [map, address]);

  return (
    <>
      <SearchBar
        onSearch={handleSearch}
        places={places}
        onSelect={(p) => setSelected(p)}
      />

      {selected && (
        <BuildingInfoBar
          selectedPlace={selected}
          onClose={() => setSelected(null)}
        />
      )}

      <Container>
        <Map center={center} className="map" level={3} onCreate={setMap}>
          {places.map((place, idx) => (
            <MapMarker
              key={`${place.lat}-${place.lng}-${idx}`}
              position={{ lat: place.lat, lng: place.lng }}
              title={place.name}
              onClick={() => setSelected(place)}
              image={{
                src: markerIcon,
                size: { width: 35, height: 35 },
              }}
            />
          ))}
        </Map>
      </Container>
    </>
  );
};

export default BuildingPage;

const Container = styled.div`
  .map {
    width: 100%;
    height: 100vh;
  }
`;
