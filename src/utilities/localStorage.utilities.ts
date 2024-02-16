export const persistLocalStorage = <T>(key : string , value : T) => {
    localStorage.setItem(key,JSON.stringify({...value}))
}

export const clearLocalStorage = (key  : string) => {
    localStorage.removeItem(key)
}

export const getFromLocalStorage = <T>(key: string): T | null => {
    const storedValue = localStorage.getItem(key);
  
    if (storedValue) {
      try {
        return JSON.parse(storedValue) as T;
      } catch (error) {
        console.error(`Error parsing value for key ${key} from localStorage: ${error}`);
      }
    }
  
    return null;
  };