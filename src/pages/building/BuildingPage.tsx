import { useEffect } from 'react';
import styled from 'styled-components';
import { Map } from 'react-kakao-maps-sdk';

const BuildingPage = () => {
  return (
    <Container>
      <Map
        center={{ lat: 33.450701, lng: 126.570667 }}
        className="map"
        level={3}
      />
    </Container>
  );
};

export default BuildingPage;

const Container = styled.div`
  .map {
    width: 100%;
    height: 90vh;
  }
`;
