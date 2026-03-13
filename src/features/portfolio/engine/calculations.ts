import type {
  BucketExposure,
  CompanyExposure,
  EtfHolding,
  EtfSnapshot,
  OverlapPair,
  PortfolioAnalysisResult,
  PortfolioEtfWeight,
  PortfolioInput,
  PortfolioPosition
} from '../types/domain';

const DECIMAL_FACTOR = 100;

const round = (value: number): number => Math.round(value * DECIMAL_FACTOR) / DECIMAL_FACTOR;

const resolveMarketValue = (position: PortfolioPosition): number => {
  if (position.amountInvested !== undefined) {
    return position.amountInvested;
  }

  if (position.quantity !== undefined && position.price !== undefined) {
    return position.quantity * position.price;
  }

  return 0;
};

export const calculateEtfWeights = (input: PortfolioInput): PortfolioEtfWeight[] => {
  const enriched = input.positions.map((position) => ({
    etfTicker: position.etfTicker,
    marketValue: resolveMarketValue(position)
  }));

  const total = enriched.reduce((sum, row) => sum + row.marketValue, 0);

  if (total <= 0) {
    return [];
  }

  return enriched.map((row) => ({
    etfTicker: row.etfTicker,
    marketValue: round(row.marketValue),
    portfolioWeight: round((row.marketValue / total) * 100)
  }));
};

const aggregateBy = (
  snapshots: EtfSnapshot[],
  etfWeights: PortfolioEtfWeight[],
  mapper: (holding: EtfHolding) => string,
  kind: 'company' | 'bucket'
): CompanyExposure[] | BucketExposure[] => {
  const exposureMap = new Map<string, CompanyExposure | BucketExposure>();
  const weightByTicker = new Map(etfWeights.map((etf) => [etf.etfTicker, etf.portfolioWeight / 100]));

  for (const snapshot of snapshots) {
    const etfWeight = weightByTicker.get(snapshot.metadata.ticker);
    if (!etfWeight) {
      continue;
    }

    for (const holding of snapshot.holdings) {
      const contribution = etfWeight * (holding.weight / 100) * 100;
      const key = mapper(holding);
      const entry = exposureMap.get(key);

      if (entry) {
        entry.weight = round(entry.weight + contribution);
        entry.contributionByEtf[snapshot.metadata.ticker] = round(
          (entry.contributionByEtf[snapshot.metadata.ticker] ?? 0) + contribution
        );
        continue;
      }

      if (kind === 'company') {
        exposureMap.set(key, {
          company: holding.company,
          securityTicker: holding.securityTicker,
          isin: holding.isin,
          weight: round(contribution),
          contributionByEtf: { [snapshot.metadata.ticker]: round(contribution) }
        } satisfies CompanyExposure);
      } else {
        exposureMap.set(key, {
          bucket: key,
          weight: round(contribution),
          contributionByEtf: { [snapshot.metadata.ticker]: round(contribution) }
        } satisfies BucketExposure);
      }
    }
  }

  return [...exposureMap.values()];
};

export const sortExposure = <T extends { weight: number }>(rows: T[], limit?: number): T[] => {
  const sorted = [...rows].sort((a, b) => b.weight - a.weight);
  return limit ? sorted.slice(0, limit) : sorted;
};

export const calculateOverlap = (
  snapshots: EtfSnapshot[],
  etfWeights: PortfolioEtfWeight[]
): OverlapPair[] => {
  const selected = snapshots.filter((snapshot) => etfWeights.some((weight) => weight.etfTicker === snapshot.metadata.ticker));
  const pairs: OverlapPair[] = [];

  for (let i = 0; i < selected.length; i += 1) {
    for (let j = i + 1; j < selected.length; j += 1) {
      const first = selected[i];
      const second = selected[j];
      const mapA = new Map(first.holdings.map((holding) => [holding.company, holding.weight]));
      const shared = second.holdings
        .filter((holding) => mapA.has(holding.company))
        .map((holding) => ({
          company: holding.company,
          sharedWeight: round(Math.min(mapA.get(holding.company) ?? 0, holding.weight))
        }))
        .sort((a, b) => b.sharedWeight - a.sharedWeight);

      pairs.push({
        etfA: first.metadata.ticker,
        etfB: second.metadata.ticker,
        overlapWeight: round(shared.reduce((sum, row) => sum + row.sharedWeight, 0)),
        sharedCompanies: shared.slice(0, 10)
      });
    }
  }

  return pairs.sort((a, b) => b.overlapWeight - a.overlapWeight);
};

export const analyzePortfolio = (input: PortfolioInput, snapshots: EtfSnapshot[]): PortfolioAnalysisResult => {
  const etfWeights = calculateEtfWeights(input);
  const companyExposure = sortExposure(aggregateBy(snapshots, etfWeights, (holding) => holding.company, 'company') as CompanyExposure[]);
  const sectorExposure = sortExposure(aggregateBy(snapshots, etfWeights, (holding) => holding.sector, 'bucket') as BucketExposure[]);
  const countryExposure = sortExposure(aggregateBy(snapshots, etfWeights, (holding) => holding.country, 'bucket') as BucketExposure[]);
  const regionExposure = sortExposure(aggregateBy(snapshots, etfWeights, (holding) => holding.region ?? 'Other', 'bucket') as BucketExposure[]);
  const overlapMatrix = calculateOverlap(snapshots, etfWeights);

  const top10Concentration = round(companyExposure.slice(0, 10).reduce((sum, row) => sum + row.weight, 0));
  const totalAnalyzedAmount = round(etfWeights.reduce((sum, row) => sum + row.marketValue, 0));

  return {
    etfWeights,
    companyExposure,
    sectorExposure,
    countryExposure,
    regionExposure,
    overlapMatrix,
    kpi: {
      totalAnalyzedAmount,
      etfCount: etfWeights.length,
      effectiveCompanyCount: companyExposure.length,
      top10Concentration
    }
  };
};
