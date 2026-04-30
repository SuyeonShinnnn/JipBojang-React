import styled from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import SearchBar from "./components/SearchBar";
import { useEffect, useState } from "react";
import type { Place } from "../../types/building";
import BuildingInfoBar from "./components/BuildingInfoBar";
import { useLocation } from "react-router-dom";

const BuildingPage = () => {
  const [center, setCenter] = useState({
    lat: 37.579617,
    lng: 126.977041,
  });

  const [selected, setSelected] = useState<Place | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const location = useLocation();
  const address = location.state?.address;

  const [places, setPlaces] = useState<
    {
      lat: number;
      lng: number;
      name: string;
      address: string;
      roadAddress: string;
      category: string;
    }[]
  >([]);

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
      map.panTo(new kakao.maps.LatLng(results[0].lat, results[0].lng));
    });
  };

  const handleSelected = (value: Place) => {
    setSelected(value);
  };

  useEffect(() => {
    if (!map || !address) return;

    handleSearch(address);
  }, [map, address]);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      setCenter({ lat, lng });

      if (map) {
        map.panTo(new kakao.maps.LatLng(lat, lng));
      }
    });
  }, [map]);

  return (
    <>
      <SearchBar
        onSearch={handleSearch}
        places={places}
        onSelect={handleSelected}
      />

      {selected && (
        <BuildingInfoBar
          selectedPlace={selected}
          onClose={() => setSelected(null)}
        />
      )}

      <Container>
        <Map
          center={{ lat: center.lat, lng: center.lng }}
          className="map"
          level={3}
          onCreate={setMap}
        >
          {places.map((place, idx) => (
            <MapMarker
              key={idx}
              position={{ lat: place.lat, lng: place.lng }}
              title={place.name}
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
