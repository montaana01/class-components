import { useState } from 'react';
import { CountryCard } from '../CountryCard';
import styles from './list.module.scss';
import { fetchCO2Data } from '../../data/CO2Data';
import { ColumnModal } from '../ColumnModal';
import type { SourceDataType } from '../../types';

const defaultColumns = ['year', 'population', 'co2', 'co2_per_capita'];

export const CountryList = () => {
  const data: SourceDataType = fetchCO2Data();
  const [extraColumns, setExtraColumns] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const availableFields = [
    'methane',
    'oil_co2',
    'temperature_change_from_co2',
    'coal_co2',
    'cement_co2',
  ];

  const toggleColumn = (field: string) => {
    setExtraColumns((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  return (
    <div className="container">
      <button
        className={styles.settingsBtn}
        onClick={() => setIsModalOpen(true)}
      >
        ⚙️ Select Columns
      </button>

      <table className={styles.countryTable}>
        <thead>
          <tr>
            <th>Country</th>
            {defaultColumns.map((col) => (
              <th key={col}>{col}</th>
            ))}
            <th>ISO code</th>
            {extraColumns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([name, country]) => (
            <CountryCard
              key={name}
              name={name}
              countryObj={country}
              extraColumns={extraColumns}
            />
          ))}
        </tbody>
      </table>

      <ColumnModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Select Additional Columns</h3>
        {availableFields.map((field) => (
          <label key={field}>
            <input
              type="checkbox"
              checked={extraColumns.includes(field)}
              onChange={() => toggleColumn(field)}
            />
            {field}
          </label>
        ))}
      </ColumnModal>
    </div>
  );
};
