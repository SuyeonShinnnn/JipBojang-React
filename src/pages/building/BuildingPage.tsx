import styled from 'styled-components';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import SearchBar from './components/SearchBar';
import { useState } from 'react';

const BuildingPage = () => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  const [places, setPlaces] = useState<
    { lat: number; lng: number; name: string }[]
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
      }));

      setPlaces(results);
      map.panTo(new kakao.maps.LatLng(results[0].lat, results[0].lng));
    });
  };

  return (
    <>
      <SideBar>
        <SearchBar onSearch={handleSearch} />
      </SideBar>
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

const SideBar = styled.aside`
  background-color: white;
  width: 360px;
  height: 100vh;
  padding: 6rem 12px 0 12px;

  position: absolute;
  z-index: 1000;
  overflow: hidden;
`;
