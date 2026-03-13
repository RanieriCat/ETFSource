import type { EtfDataProvider } from '../providers/interfaces';
import { analyzePortfolio } from './calculations';
import type { PortfolioAnalysisResult, PortfolioInput } from '../types/domain';

export interface PortfolioEngine {
  analyze(input: PortfolioInput): Promise<PortfolioAnalysisResult>;
}

export const createPortfolioEngine = (provider: EtfDataProvider): PortfolioEngine => ({
  async analyze(input) {
    const uniqueTickers = [...new Set(input.positions.map((position) => position.etfTicker))];
    const snapshots = await provider.getManyEtfSnapshots(uniqueTickers);
    return analyzePortfolio(input, snapshots);
  }
});
