import { SIDO_MAP } from '../constants/sidoMap';

type RegionGroup = {
  name: string;
  count: number;
  lat: number;
  lng: number;
};

export const groupByCity = (
  features: any[],
  accidentData: any[],
): RegionGroup[] => {
  const cityMap = new Map<string, RegionGroup>();

  for (const feature of features) {
    const sigCd = String(feature.properties.SIG_CD);

    const sidoCode = sigCd.slice(0, 2);

    const cityName = SIDO_MAP[sidoCode];

    if (!cityName) continue;

    const regionName = feature.properties.SIG_KOR_NM ?? '';

    const entry = accidentData.find(
      (d) =>
        d['기초지자체']?.trim().replace(/\s/g, '') ===
        regionName.replace(/\s/g, ''),
    );

    const count = parseInt(String(entry?.[' 사고건수 '] ?? '0'));

    const lat = feature.properties.center_lat;
    const lng = feature.properties.center_lng;

    if (lat == null || lng == null) continue;

    if (!cityMap.has(cityName)) {
      cityMap.set(cityName, {
        name: cityName,
        count: 0,
        lat,
        lng,
      });
    }

    // 사고 건수 누적 => 구에서 시단위로 표시
    cityMap.get(cityName)!.count += isNaN(count) ? 0 : count;
  }

  return [...cityMap.values()];
};
