import { useState, useMemo } from 'react';
import { CountryCard } from '../CountryCard';
import { fetchCO2Data } from '../../data/CO2Data';
import type {
  CountryDataType,
  SourceDataType,
  YearDataType,
} from '../../types';
import styles from './list.module.scss';
import { ColumnModal } from '../ColumnModal';

const defaultColumns = ['year', 'population', 'co2', 'co2_per_capita'];

export const CountryList = () => {
  const data: SourceDataType = fetchCO2Data();
  const [extraColumns, setExtraColumns] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<
    'name-asc' | 'name-desc' | 'pop-asc' | 'pop-desc'
  >('name-asc');

  const allYears = useMemo(() => {
    const years = new Set<number>();
    Object.values(data).forEach((country: CountryDataType) => {
      country.data.forEach((d: YearDataType) => years.add(d.year));
    });
    return Array.from(years).sort((a, b) => a - b);
  }, [data]);

  const filteredCountries = useMemo(() => {
    let countries = Object.entries(data);

    if (search.trim()) {
      countries = countries.filter(([name]) =>
        name.toLowerCase().includes(search.toLowerCase())
      );
    }

    countries = countries.sort(([nameA, cA], [nameB, cB]) => {
      const popA =
        cA.data.find((d: YearDataType) => d.year === selectedYear)
          ?.population ?? 0;
      const popB =
        cB.data.find((d: YearDataType) => d.year === selectedYear)
          ?.population ?? 0;

      switch (sortBy) {
        case 'name-asc':
          return nameA.localeCompare(nameB);
        case 'name-desc':
          return nameB.localeCompare(nameA);
        case 'pop-asc':
          return popA - popB;
        case 'pop-desc':
          return popB - popA;
        default:
          return 0;
      }
    });

    return countries;
  }, [data, search, sortBy, selectedYear]);

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
      <div className={styles.controls}>
        <label>
          Year:
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {allYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>

        <input
          type="text"
          placeholder="Search country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <label>
          Sort:
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value as
                  | 'name-asc'
                  | 'name-desc'
                  | 'pop-asc'
                  | 'pop-desc'
              )
            }
          >
            <option value="name-asc">Name ↑</option>
            <option value="name-desc">Name ↓</option>
            <option value="pop-asc">Population ↑</option>
            <option value="pop-desc">Population ↓</option>
          </select>
        </label>

        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.settingsBtn}
        >
          ⚙️ Select Columns
        </button>
      </div>

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
          {filteredCountries.map(([name, country]) => (
            <CountryCard
              key={name}
              name={name}
              countryObj={country}
              extraColumns={extraColumns}
              selectedYear={selectedYear}
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
