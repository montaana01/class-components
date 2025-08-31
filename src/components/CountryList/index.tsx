import type { SourceDataType } from '../../types';
import { CountryCard } from '../CountryCard';
import styles from './list.module.scss';
import { fetchCO2Data } from "../../data/CO2Data";

export const CountryList = () => {
  const data: SourceDataType = fetchCO2Data();

  return (
    <div className="container">
      <table className={styles.countryTable}>
        <thead>
          <tr>
            <th>Country</th>
            <th>Year</th>
            <th>Population</th>
            <th>CO₂</th>
            <th>CO₂ per person</th>
            <th>ISO code</th>
            <th>Region</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([name, country]) => (
            <CountryCard key={name} name={name} countryObj={{ ...country }} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
