import type { CountryDataType } from '../../types';

export const CountryCard = ({
  name,
  countryObj,
}: {
  name: string;
  countryObj: CountryDataType;
}) => {
  const maxYear = Math.max(...countryObj.data.map((entry) => entry.year));
  const lastYearData = countryObj.data.find((entry) => entry.year === maxYear);

  return (
    <tr key={name}>
      <td>{name}</td>
      <td>{lastYearData?.year ?? '—'}</td>
      <td>{lastYearData?.population ?? '—'}</td>
      <td>{lastYearData?.co2 ?? '—'}</td>
      <td>{lastYearData?.iso_code ?? countryObj.iso_code ?? '—'}</td>
    </tr>
  );
};
