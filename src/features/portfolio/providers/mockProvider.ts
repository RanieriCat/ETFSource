import { mockEtfSnapshots } from '../../../mocks/etfData';
import type { EtfSnapshot } from '../types/domain';
import type { EtfDataProvider } from './interfaces';

const mapByTicker = new Map(mockEtfSnapshots.map((snapshot) => [snapshot.metadata.ticker, snapshot]));

export class MockEtfDataProvider implements EtfDataProvider {
  async getEtfSnapshot(ticker: string): Promise<EtfSnapshot | null> {
    return mapByTicker.get(ticker) ?? null;
  }

  async getManyEtfSnapshots(tickers: string[]): Promise<EtfSnapshot[]> {
    return tickers
      .map((ticker) => mapByTicker.get(ticker))
      .filter((value): value is EtfSnapshot => Boolean(value));
  }
}
