import { createContext, useContext } from 'react';
import { usePortfolioApp } from './usePortfolioApp';

const portfolioContext = createContext<ReturnType<typeof usePortfolioApp> | null>(null);

export const PortfolioProvider = ({ children }: { children: React.ReactNode }) => {
  const value = usePortfolioApp();
  return <portfolioContext.Provider value={value}>{children}</portfolioContext.Provider>;
};

export const usePortfolioContext = () => {
  const value = useContext(portfolioContext);
  if (!value) {
    throw new Error('Portfolio context not available');
  }
  return value;
};
