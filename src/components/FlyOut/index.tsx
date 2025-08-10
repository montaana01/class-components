import Button from '../Button';
import { useSelectedItemsStore } from '../../store/selectedItemsStore.ts';
import { useRef } from 'react';
import { ThemeSwitcher } from '../ThemeSwitcher';
import isEmptyArray from '../../helpers/isEmpty.ts';

const flyOutConstants = {
  unselect: 'Unselect all',
  download: 'Download',
};

export const FlyOut = () => {
  const { selectedItems, clearAll } = useSelectedItemsStore();
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const downloadHandler: VoidFunction = () => {
    const headers = [
      'Name',
      'Image',
      'Status',
      'Species',
      'Type',
      'Gender',
      'Origin',
      'Location',
      'Episodes',
      'Created',
    ];
    const content = [
      headers.join(','),
      ...selectedItems.map(
        (item) =>
          `"${item.name}","${item.image}","${item.status == 'unknown' ? 'No information' : item.status}","${item.species == 'unknown' ? 'No information' : item.species}","${item.type ?? 'No information'}","${item.gender == 'unknown' ? 'No information' : item.gender}","${item.origin.name == 'unknown' ? 'No information' : item.origin.name}","${
            item.location.name == 'unknown'
              ? 'No information'
              : item.location.name
          }","${item.url}","${item.episode.length}","${new Date(item.created).toLocaleDateString()}"`
      ),
    ].join('\n');

    const url = URL.createObjectURL(new Blob([content], { type: 'text/csv' }));
    if (downloadRef.current) {
      downloadRef.current.href = url;
      downloadRef.current.download = `${selectedItems.length}_items_export.csv`;
    }
  };

  return (
    <div className="search-selection">
      <Button
        title={flyOutConstants.unselect}
        onClick={() => clearAll()}
        disabled={isEmptyArray(selectedItems)}
      />
      {!isEmptyArray(selectedItems) && (
        <a
          className={'button'}
          ref={downloadRef}
          onClick={() => downloadHandler()}
        >
          {flyOutConstants.download}
        </a>
      )}
      <ThemeSwitcher />
    </div>
  );
};
