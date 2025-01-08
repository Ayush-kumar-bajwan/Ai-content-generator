// TotalUsageContext.tsx
import { createContext } from 'react';

export type TotalUsageContextType = {
  totalUsage: number;
  setTotalUsage: React.Dispatch<React.SetStateAction<number>>;
}

export const TotalUsageContext = createContext<TotalUsageContextType | null>(null);