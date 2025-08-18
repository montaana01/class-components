import { generateCsv } from '@/actions/generateCSV';
import { NextResponse } from 'next/server';
import { useSelectedItemsStore } from '@/store/selectedItemsStore';

export async function GET() {
  const selectedItems = useSelectedItemsStore.getState().selectedItems;
  const csv = await generateCsv(selectedItems);

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="selected_items.csv"',
    },
  });
}
