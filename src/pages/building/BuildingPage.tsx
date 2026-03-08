import styled from 'styled-components';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import SearchBar from './components/SearchBar';
import { useState } from 'react';
import type { Place } from '../../types/building';

const BuildingPage = () => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

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
    console.log(value);
  };

  return (
    <>
      <SearchBar
        onSearch={handleSearch}
        places={places}
        onSelect={handleSelected}
      />

      <Container>
        <Map
          center={{ lat: 33.450701, lng: 126.570667 }}
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
