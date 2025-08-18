'use client';

import Button from '../Button';
import { useSelectedItemsStore } from '@/store/selectedItemsStore';
import { useRef } from 'react';
import { ThemeSwitcher } from '../ThemeSwitcher';
import isEmptyArray from '@/helpers/isEmpty';
import { useTranslations } from 'next-intl';
import { generateCsv } from '@/actions/generateCSV';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export const FlyOut = () => {
  const t = useTranslations('FlyOut');
  const { selectedItems, clearAll } = useSelectedItemsStore();
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const downloadHandler = async () => {
    try {
      const content = await generateCsv(selectedItems);
      const blob = new Blob([content], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);

      if (downloadRef.current) {
        downloadRef.current.href = url;
        downloadRef.current.download = `${selectedItems.length}_items_export.csv`;
        downloadRef.current.click();
      }
    } catch (error) {
      console.error('Failed to generate CSV:', error);
    }
  };

  return (
    <div className="search-selection">
      <Button
        title={t('unselect')}
        onClick={() => clearAll()}
        disabled={isEmptyArray(selectedItems)}
      />
      {!isEmptyArray(selectedItems) && (
        <Button title={t('download')} onClick={downloadHandler} />
      )}
      <a ref={downloadRef} style={{ display: 'none' }} />
      <ThemeSwitcher />
      <LanguageSwitcher />
    </div>
  );
};
