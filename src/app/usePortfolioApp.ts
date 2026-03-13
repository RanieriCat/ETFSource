import { useMemo, useState } from 'react';
import { createPortfolioEngine } from '../features/portfolio/engine/portfolioEngine';
import { MockEtfDataProvider } from '../features/portfolio/providers/mockProvider';
import type { PortfolioAnalysisResult, PortfolioInput, PortfolioPosition } from '../features/portfolio/types/domain';

const defaultInput: PortfolioInput = {
  baseCurrency: 'EUR',
  positions: [
    { etfTicker: 'CSPX', amountInvested: 5000 },
    { etfTicker: 'EIMI', amountInvested: 3000 },
    { etfTicker: 'SXRV', amountInvested: 2000 }
  ]
};

const provider = new MockEtfDataProvider();
const engine = createPortfolioEngine(provider);

export const usePortfolioApp = () => {
  const [input, setInput] = useState<PortfolioInput>(defaultInput);
  const [analysis, setAnalysis] = useState<PortfolioAnalysisResult | null>(null);

  const availableTickers = useMemo(() => ['CSPX', 'EIMI', 'SXRV'], []);

  const runAnalysis = async () => {
    const result = await engine.analyze(input);
    setAnalysis(result);
  };

  const updatePosition = (index: number, patch: Partial<PortfolioPosition>) => {
    setInput((prev) => ({
      ...prev,
      positions: prev.positions.map((position, current) => (current === index ? { ...position, ...patch } : position))
    }));
  };

  const addPosition = () => {
    setInput((prev) => ({
      ...prev,
      positions: [...prev.positions, { etfTicker: 'CSPX', amountInvested: 0 }]
    }));
  };

  return {
    input,
    analysis,
    availableTickers,
    updatePosition,
    addPosition,
    runAnalysis
  };
};
