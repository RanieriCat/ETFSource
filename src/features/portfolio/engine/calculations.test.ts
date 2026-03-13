import { describe, expect, it } from 'vitest';
import { analyzePortfolio, calculateEtfWeights } from './calculations';
import type { PortfolioInput } from '../types/domain';
import { mockEtfSnapshots } from '../../../mocks/etfData';

describe('portfolio calculations', () => {
  it('calcola i pesi ETF sul portafoglio', () => {
    const input: PortfolioInput = {
      baseCurrency: 'EUR',
      positions: [
        { etfTicker: 'CSPX', amountInvested: 7500 },
        { etfTicker: 'EIMI', amountInvested: 2500 }
      ]
    };

    const weights = calculateEtfWeights(input);
    expect(weights[0].portfolioWeight).toBe(75);
    expect(weights[1].portfolioWeight).toBe(25);
  });

  it('genera aggregazioni e overlap', () => {
    const result = analyzePortfolio(
      {
        baseCurrency: 'EUR',
        positions: [
          { etfTicker: 'CSPX', amountInvested: 5000 },
          { etfTicker: 'SXRV', amountInvested: 5000 }
        ]
      },
      mockEtfSnapshots
    );

    expect(result.companyExposure[0].company).toBe('Other Holdings');
    expect(result.sectorExposure.length).toBeGreaterThan(0);
    expect(result.countryExposure.find((row) => row.bucket === 'United States')).toBeDefined();
    expect(result.overlapMatrix[0].overlapWeight).toBeGreaterThan(0);
  });
});
