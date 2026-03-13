import type { EtfSnapshot } from '../types/domain';

/**
 * Extension point: provider can fetch ETF holdings from JSON, filesystem, APIs, etc.
 * V1 uses local mock implementation.
 */
export interface EtfDataProvider {
  getEtfSnapshot(ticker: string): Promise<EtfSnapshot | null>;
  getManyEtfSnapshots(tickers: string[]): Promise<EtfSnapshot[]>;
}
