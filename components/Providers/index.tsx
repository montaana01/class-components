'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ThemeProvider} from '@/context/ThemeContext';
import {type ReactNode, useState} from 'react';
import MainPage from "@/components/MainPage";

export default function Providers({children}: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MainPage>
          {children}
        </MainPage>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
