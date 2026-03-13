export type Region =
  | 'North America'
  | 'Europe'
  | 'Asia-Pacific'
  | 'Latin America'
  | 'Middle East & Africa'
  | 'Global'
  | 'Other';

export interface EtfMetadata {
  ticker: string;
  name: string;
  issuer: string;
  isin?: string;
  replicationType?: 'Physical' | 'Synthetic';
  holdingsCount?: number;
}

export interface EtfHolding {
  company: string;
  securityTicker?: string;
  isin?: string;
  weight: number;
  sector: string;
  country: string;
  currency: string;
  region?: Region;
}

export interface EtfSnapshot {
  metadata: EtfMetadata;
  holdings: EtfHolding[];
  asOfDate: string;
}

export interface PortfolioPosition {
  etfTicker: string;
  quantity?: number;
  amountInvested?: number;
  price?: number;
}

export interface PortfolioInput {
  baseCurrency: string;
  positions: PortfolioPosition[];
}

export interface PortfolioEtfWeight {
  etfTicker: string;
  marketValue: number;
  portfolioWeight: number;
}

export interface CompanyExposure {
  company: string;
  securityTicker?: string;
  isin?: string;
  weight: number;
  contributionByEtf: Record<string, number>;
}

export interface BucketExposure {
  bucket: string;
  weight: number;
  contributionByEtf: Record<string, number>;
}

export interface OverlapPair {
  etfA: string;
  etfB: string;
  overlapWeight: number;
  sharedCompanies: Array<{
    company: string;
    sharedWeight: number;
  }>;
}

export interface PortfolioKpi {
  totalAnalyzedAmount: number;
  etfCount: number;
  effectiveCompanyCount: number;
  top10Concentration: number;
}

export interface PortfolioAnalysisResult {
  etfWeights: PortfolioEtfWeight[];
  companyExposure: CompanyExposure[];
  sectorExposure: BucketExposure[];
  countryExposure: BucketExposure[];
  regionExposure: BucketExposure[];
  overlapMatrix: OverlapPair[];
  kpi: PortfolioKpi;
}
