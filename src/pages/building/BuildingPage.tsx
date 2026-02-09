import styled from 'styled-components';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import SearchBar from './components/SearchBar';
import { useState } from 'react';

const BuildingPage = () => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const handleSearch = (keyword: string) => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status) => {
      if (status !== kakao.maps.services.Status.OK) return;

      const firstPlace = data[0];
      const lat = Number(firstPlace.y);
      const lng = Number(firstPlace.x);

      setPosition({ lat, lng });
      map.setCenter(new kakao.maps.LatLng(lat, lng));
      map.setLevel(3);
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
          {position && <MapMarker position={position} />}
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
