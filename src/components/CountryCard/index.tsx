import { useState } from 'react';
import type { CountryDataType } from '../../types';
import styles from './card.module.scss';

const notFound = 'N/A';

export const CountryCard = ({
  name,
  countryObj,
  extraColumns = [],
}: {
  name: string;
  countryObj: CountryDataType;
  extraColumns?: string[];
}) => {
  const [expanded, setExpanded] = useState(false);

  const maxYear = Math.max(...countryObj.data.map((entry) => entry.year));
  const lastYearData = countryObj.data.find((entry) => entry.year === maxYear);

  return (
    <>
      <tr
        key={name}
        onClick={() => setExpanded((prev) => !prev)}
        style={{
          cursor: 'pointer',
          background: expanded ? 'rgb(133 106 106)' : 'inherit',
        }}
      >
        <td>{name}</td>
        <td>{lastYearData?.year ?? notFound}</td>
        <td>{lastYearData?.population ?? notFound}</td>
        <td>{lastYearData?.co2 ?? notFound}</td>
        <td>{lastYearData?.co2_per_capita ?? notFound}</td>
        <td>{lastYearData?.iso_code ?? countryObj.iso_code ?? notFound}</td>
        {extraColumns.map((col) => (
          <td key={col}>
            {lastYearData?.[col as keyof typeof lastYearData] ?? notFound}
          </td>
        ))}
      </tr>
      {expanded && (
        <tr>
          <td colSpan={6 + extraColumns.length}>
            <div className={styles.detailWrapper}>
              <table className={styles.detailTable}>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Population</th>
                    <th>CO₂</th>
                    <th>CO₂ per person</th>
                    {extraColumns.map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {countryObj.data.map((entry) => (
                    <tr key={entry.year}>
                      <td>{entry.year}</td>
                      <td>{entry.population ?? notFound}</td>
                      <td>{entry.co2 ?? notFound}</td>
                      <td>{entry.co2_per_capita ?? notFound}</td>
                      {extraColumns.map((col) => (
                        <td key={col}>
                          {entry[col as keyof typeof entry] ?? notFound}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
