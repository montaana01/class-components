export type ApiResponseRecord = {
  name: string;
  url: string;
};

export type ApiResponse<T> = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
};

export type FetchApiOptions = {
  page?: string;
  name?: string;
  id?: number;
};

export type QueryParams = { page?: number; query?: string; active?: number };

export type CardProps = {
  cardOptions: CharacterDetail;
};

export type SelectedItemsState = {
  selectedItems: CharacterDetail[];
  toggleItem: (item: CharacterDetail) => void;
  removeItem: (id: number) => void;
  clearAll: VoidFunction;
};

export type DetailedCardProps = {
  id: number;
  onClose: VoidFunction;
};

export type SearchResultProps = {
  items: CharacterDetail[];
  isLoading: boolean;
  error: string | null;
};

export type CardListProps = {
  items: CharacterDetail[];
};

export type CharacterDetail = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: ApiResponseRecord;
  location: ApiResponseRecord;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type ButtonOptions = {
  title: string;
  onClick: VoidFunction;
  disabled?: boolean;
};

export type SearchInputProps = {
  searchQuery: string;
  onChange: (value: string) => void;
  onEnter: VoidFunction;
};

export type Theme = 'light' | 'dark';

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: VoidFunction;
};
