import {
  clear,
  getItem,
  removeItem,
  setItem,
} from "../services/local-storage.service";

interface IUseLocalStorage {
  get: <T = string>(key: string) => T | null;
  set: (key: string, value: string) => void;
  remove: (key: string) => void;
  clear: () => void;
}

export function useLocalStorage(): IUseLocalStorage {
  return {
    get: getItem,
    set: setItem,
    remove: removeItem,
    clear: clear,
  };
}
