import { Product, SearchFilters } from "./product";

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  favoritesCount: number;
  clearFavorites: () => void;
  toggleFavorite: (product: Product) => void;
}

export interface AppStateContextType {
  isLoading: boolean;
  error: string | null;
  searchFilters: SearchFilters;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateSearchFilters: (filters: Partial<SearchFilters>) => void;
  clearFilters: () => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export interface FavoritesProviderProps {
  children: React.ReactNode;
}

export interface AppStateProviderProps {
  children: React.ReactNode;
}

export interface AppProviderProps {
  children: React.ReactNode;
}

export interface AppContextType {
  theme: ThemeContextType;
  favorites: FavoritesContextType;
  appState: AppStateContextType;
}

export type UseThemeReturn = ThemeContextType;
export type UseFavoritesReturn = FavoritesContextType;
export type UseAppStateReturn = AppStateContextType;

export type ContextProviderComponent<T> = React.FC<{
  children: React.ReactNode;
  defaultValue?: Partial<T>;
}>;

export interface ThemeConfig {
  light: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
  };
  dark: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
  };
}
