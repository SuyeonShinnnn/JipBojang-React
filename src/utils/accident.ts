import accidentData from '../assets/data/accident.json';

export const getColorByAccident = (regionName: string) => {
  const cleanedRegion = regionName.trim().replace(/\s/g, '');

  const entry = accidentData.find(
    (d) => d['기초지자체']?.trim().replace(/\s/g, '') === cleanedRegion,
  );

  const raw = entry?.[' 사고건수 '];

  const count = parseInt(String(raw ?? '0'));

  if (isNaN(count)) return '#fff0f0';

  const maxCount = Math.max(
    ...accidentData
      .map((d) => parseInt(String(d[' 사고건수 '] ?? '0')))
      .filter((n) => !isNaN(n)),
  );

  const ratio = count / maxCount;

  const red = 255;
  const greenBlue = Math.floor(240 - ratio * 180);

  return `rgb(${red}, ${greenBlue}, ${greenBlue})`;
};

export const getAccidentCount = (regionName: string) => {
  const cleanedRegion = regionName.trim().replace(/\s/g, '');
  const entry = accidentData.find(
    (d) => d['기초지자체']?.trim().replace(/\s/g, '') === cleanedRegion,
  );
  const raw = entry?.[' 사고건수 '];
  const n = parseInt(String(raw ?? '0'));
  return isNaN(n) ? 0 : n;
};
