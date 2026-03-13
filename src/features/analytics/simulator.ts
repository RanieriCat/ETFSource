import type { PortfolioAnalysisResult, PortfolioInput, PortfolioPosition } from '../portfolio/types/domain';
import type { PortfolioEngine } from '../portfolio/engine/portfolioEngine';

/**
 * Extension point for future "what-if" simulations.
 * V1 supports adding a single simulated ETF position and comparing before/after KPIs.
 */
export const simulateBuy = async (
  engine: PortfolioEngine,
  current: PortfolioInput,
  simulatedPosition: PortfolioPosition
): Promise<{ before: PortfolioAnalysisResult; after: PortfolioAnalysisResult }> => {
  const before = await engine.analyze(current);
  const after = await engine.analyze({
    ...current,
    positions: [...current.positions, simulatedPosition]
  });

  return { before, after };
};
