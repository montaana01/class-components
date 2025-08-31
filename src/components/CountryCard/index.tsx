import { useState } from 'react';
import type { CountryDataType } from '../../types';
import styles from './card.module.scss';

const notFound = 'N/A';

export const CountryCard = ({
  name,
  countryObj,
  extraColumns = [],
  selectedYear,
}: {
  name: string;
  countryObj: CountryDataType;
  extraColumns?: string[];
  selectedYear: number;
}) => {
  const [expanded, setExpanded] = useState(false);

  const yearData = countryObj.data.find((entry) => entry.year === selectedYear);

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
        <td>{yearData?.year ?? notFound}</td>
        <td>{yearData?.population ?? notFound}</td>
        <td>{yearData?.co2 ?? notFound}</td>
        <td>{yearData?.co2_per_capita ?? notFound}</td>
        <td>{yearData?.iso_code ?? countryObj.iso_code ?? notFound}</td>
        {extraColumns.map((col) => (
          <td key={col}>
            {yearData?.[col as keyof typeof yearData] ?? notFound}
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
