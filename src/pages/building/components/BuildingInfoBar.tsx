import styled from 'styled-components';
import type { Place } from '../../../types/building';
import { dateFormat, houseLabel } from '../../../utils/BuildingUtils';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { LuMapPin } from 'react-icons/lu';
import { LiaTagsSolid } from 'react-icons/lia';
import { useEffect, useState } from 'react';
import bannnerImg from '../../../assets/building/banner.png';
import { getBasicInfo, getDepositInfo } from '../../../apis/buildingApi';

interface BuildingInfoBarProps {
  selectedPlace: Place;
}

interface Deposit {
  buildingCount: number;
  averageJeonseRate: number;
}

interface BasicInfo {
  useAprDay: string;
  hhldCnt: number;
  grndFlrCnt: number;
  ugrndFlrCnt: number;
  newPlatPlc: string;
  totArea: number;
  platArea: number;
  bcRat: number;
  vlRat: number;
  archArea: number;
  rideUseElvtCnt: number;
}

const BuildingInfoBar = ({ selectedPlace }: BuildingInfoBarProps) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [depostiInfo, setDepositInfo] = useState<Deposit | null>(null);
  const [basicInfo, setBasicInfo] = useState<BasicInfo | null>(null);
  const infoList = basicInfo
    ? [
        { label: '사용승인일', value: dateFormat(basicInfo.useAprDay) },
        { label: '세대수', value: `${basicInfo.hhldCnt}세대` },
        { label: '승강기수', value: `${basicInfo.rideUseElvtCnt}개` },
        { label: '지상층수', value: `${basicInfo.grndFlrCnt}층` },
        { label: '지하층수', value: `${basicInfo.ugrndFlrCnt}층` },
        { label: '건축면적', value: `${Math.floor(basicInfo.archArea)}㎡` },
        { label: '연면적', value: `${Math.floor(basicInfo.totArea)}㎡` },
        { label: '대지면적', value: `${Math.floor(basicInfo.platArea)}㎡` },
        { label: '건폐율', value: `${basicInfo.bcRat}%` },
        { label: '용적률', value: `${basicInfo.vlRat}%` },
      ]
    : [];

  useEffect(() => {
    const fetchData = async () => {
      const deposit = await getDepositInfo(selectedPlace.address);
      const basic = await getBasicInfo(selectedPlace.address);

      if (!deposit.averageJeonseRate) deposit.averageJeonseRate = 0;

      setDepositInfo(deposit);
      setBasicInfo(basic);
    };

    fetchData();
  }, [selectedPlace.address]);

  const parseAddress = (address: string) => {
    return address.split(' ')[2];
  };

  return (
    <Container>
      <ImgBox>
        <img />
      </ImgBox>
      <BuildingInfoBox>
        <TitleWrapper>
          <h3>{selectedPlace.name}</h3>
          <small>{houseLabel(selectedPlace.category)}</small>
        </TitleWrapper>
        <TextIconWrapper>
          <LuMapPin />
          <span>{selectedPlace.address}</span>
          {!clicked && <IoIosArrowDown onClick={() => setClicked(!clicked)} />}
          {clicked && <IoIosArrowUp onClick={() => setClicked(!clicked)} />}
        </TextIconWrapper>
        <TextIconWrapper>
          <LiaTagsSolid />
          <span>{selectedPlace.category}</span>
        </TextIconWrapper>
        <Line />
        <DepositWrapper>
          <h4>적정 보증금</h4>
          <p>
            <span>{parseAddress(selectedPlace.address)}</span> 주변
            <span> {depostiInfo?.buildingCount}</span>채 건물의 평균 전세가율은
            <span> {depostiInfo?.averageJeonseRate}%</span>입니다.
          </p>
        </DepositWrapper>
      </BuildingInfoBox>
      <BannerBox>
        <img src={bannnerImg} />
      </BannerBox>
      <GridWrapper>
        <h4>기본 정보</h4>
        <Grid>
          {infoList.map((item, index) => (
            <div key={index}>
              <InfoTitle>{item.label}</InfoTitle>
              <Info>{item.value}</Info>
            </div>
          ))}
        </Grid>
      </GridWrapper>
    </Container>
  );
};

export default BuildingInfoBar;

const Container = styled.aside`
  background-color: white;
  box-shadow: 5px 5px 20px var(--color-darkgray);
  width: 400px;
  border-radius: 12px;
  margin: 5.5rem 0 0 24rem;
  height: 85vh;

  position: absolute;
  z-index: 1000;
  overflow: auto;
`;

const ImgBox = styled.div`
  background-color: aliceblue;
  width: 100%;
  height: 240px;
`;

const BuildingInfoBox = styled.section`
  padding: 1rem;
  display: grid;
  gap: 8px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: end;
  gap: 8px;

  h3 {
    color: var(--text-primary);
  }

  small {
    color: var(--color-darkgray);
  }
`;

const TextIconWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;

  svg {
    color: var(--color-mediumgray);
    &:hover {
      cursor: pointer;
    }
  }
`;

const Line = styled.hr`
  width: 100%;
  height: 1px;
  color: var(--color-lightgray);
  margin-top: 12px;
`;

const DepositWrapper = styled.div`
  display: grid;
  gap: 4px;

  h4 {
    font-size: 20px;
  }

  span {
    color: var(--color-primary);
    font-weight: bold;
  }
`;

const BannerBox = styled.div`
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const GridWrapper = styled.div`
  display: grid;
  gap: 16px;
  text-align: center;
  padding: 16px 8px;

  h4 {
    font-size: 20px;
  }
`;

const Grid = styled.div`
  display: grid;
  text-align: center;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, auto);
  column-gap: 8px;
  row-gap: 28px;

  div {
    display: flex;
    flex-direction: column;
  }
`;

const InfoTitle = styled.span`
  font-weight: 600;
`;

const Info = styled.span`
  color: var(--color-darkgray);
`;
