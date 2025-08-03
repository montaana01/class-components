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
  active?: string;
};

export type QueryParams = { page?: number; query?: string; active?: string };

export type CardProps = {
  options: CharacterDetail;
};

export type DetailedCardProps = {
  name: string;
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
