import { useEffect, useState } from 'react';
import { fetchAbilityDetail } from '../../api/pokeApi';
import type { AbilityDetail } from '../../api/constants.ts';

type DetailedItemProps = {
  id: string | number;
  onClose: () => void;
};

export default function DetailedItem({ id, onClose }: DetailedItemProps) {
  const [data, setData] = useState<AbilityDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDetail() {
      setIsLoading(true);
      setError(null);

      try {
        const detail = await fetchAbilityDetail(id);
        setData(detail);
      } finally {
        setIsLoading(false);
      }
    }

    void loadDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="detail-container">
        <button className="detail-close" onClick={onClose}>
          × Close
        </button>
        <p>Loading details…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-container">
        <button className="detail-close" onClick={onClose}>
          × Close
        </button>
        <p className="error">Error: {error}</p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="detail-container">
      <button className="detail-close" onClick={onClose}>
        × Close
      </button>

      <h2>
        #{data.id} — {data.name.replace(/-/g, ' ')}
      </h2>
      <p>
        <strong>Generation:</strong> {data.generation.name}
      </p>
      <p>
        <strong>Main series:</strong> {data.is_main_series ? 'Yes' : 'No'}
      </p>

      <section>
        <h3>Effects</h3>
        <ul>
          {data.effect_entries.map((e) => (
            <li key={e.language.name}>
              <strong>[{e.language.name}]</strong> {e.short_effect}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Flavor Texts</h3>
        <ul>
          {data.flavor_text_entries.map((f, idx) => (
            <li key={`${f.language.name}-${f.version_group.name}-${idx}`}>
              <strong>
                [{f.version_group.name} / {f.language.name}]
              </strong>{' '}
              {f.flavor_text.replace(/\n/g, ' ')}
            </li>
          ))}
        </ul>
      </section>

      {data.effect_changes.length > 0 && (
        <section>
          <h3>Changed Effects</h3>
          {data.effect_changes.map((chg, idx) => (
            <div key={idx}>
              <p>
                <strong>Version group:</strong> {chg.version_group.name}
              </p>
              <ul>
                {chg.effect_entries.map((ee) => (
                  <li key={ee.language.name}>
                    <strong>[{ee.language.name}]</strong> {ee.effect}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      <section>
        <h3>Pokémon with this Ability</h3>
        <ul>
          {data.pokemon.map(({ pokemon, is_hidden, slot }) => (
            <li key={pokemon.name}>
              {pokemon.name} {is_hidden ? '(hidden)' : ''} [slot {slot}]
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
