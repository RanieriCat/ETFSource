import type { EtfSnapshot } from '../features/portfolio/types/domain';

export const mockEtfSnapshots: EtfSnapshot[] = [
  {
    asOfDate: '2026-01-31',
    metadata: {
      ticker: 'CSPX',
      name: 'iShares Core S&P 500 UCITS ETF',
      issuer: 'BlackRock',
      isin: 'IE00B5BMR087',
      replicationType: 'Physical',
      holdingsCount: 505
    },
    holdings: [
      { company: 'Microsoft', securityTicker: 'MSFT', weight: 7.1, sector: 'Information Technology', country: 'United States', region: 'North America', currency: 'USD' },
      { company: 'Apple', securityTicker: 'AAPL', weight: 6.6, sector: 'Information Technology', country: 'United States', region: 'North America', currency: 'USD' },
      { company: 'NVIDIA', securityTicker: 'NVDA', weight: 6, sector: 'Information Technology', country: 'United States', region: 'North America', currency: 'USD' },
      { company: 'Amazon', securityTicker: 'AMZN', weight: 3.7, sector: 'Consumer Discretionary', country: 'United States', region: 'North America', currency: 'USD' },
      { company: 'Meta Platforms', securityTicker: 'META', weight: 2.5, sector: 'Communication Services', country: 'United States', region: 'North America', currency: 'USD' },
      { company: 'Broadcom', securityTicker: 'AVGO', weight: 1.9, sector: 'Information Technology', country: 'United States', region: 'North America', currency: 'USD' },
      { company: 'Taiwan Semiconductor Manufacturing', securityTicker: 'TSM', weight: 1.1, sector: 'Information Technology', country: 'Taiwan', region: 'Asia-Pacific', currency: 'TWD' },
      { company: 'Other Holdings', weight: 71.1, sector: 'Diversified', country: 'Global', region: 'Global', currency: 'USD' }
    ]
  },
  {
    asOfDate: '2026-01-31',
    metadata: {
      ticker: 'EIMI',
      name: 'iShares Core MSCI Emerging Markets IMI UCITS ETF',
      issuer: 'BlackRock',
      isin: 'IE00BKM4GZ66',
      replicationType: 'Physical',
      holdingsCount: 3000
    },
    holdings: [
      { company: 'Taiwan Semiconductor Manufacturing', securityTicker: 'TSM', weight: 9.5, sector: 'Information Technology', country: 'Taiwan', region: 'Asia-Pacific', currency: 'TWD' },
      { company: 'Tencent', securityTicker: '700', weight: 4.5, sector: 'Communication Services', country: 'China', region: 'Asia-Pacific', currency: 'HKD' },
      { company: 'Alibaba', securityTicker: 'BABA', weight: 2.1, sector: 'Consumer Discretionary', country: 'China', region: 'Asia-Pacific', currency: 'HKD' },
      { company: 'Samsung Electronics', securityTicker: '005930', weight: 3.2, sector: 'Information Technology', country: 'South Korea', region: 'Asia-Pacific', currency: 'KRW' },
      { company: 'Reliance Industries', securityTicker: 'RELIANCE', weight: 1.4, sector: 'Energy', country: 'India', region: 'Asia-Pacific', currency: 'INR' },
      { company: 'Naspers', securityTicker: 'NPN', weight: 0.7, sector: 'Consumer Discretionary', country: 'South Africa', region: 'Middle East & Africa', currency: 'ZAR' },
      { company: 'Other Holdings', weight: 78.6, sector: 'Diversified', country: 'Global', region: 'Global', currency: 'USD' }
    ]
  },
  {
    asOfDate: '2026-01-31',
    metadata: {
      ticker: 'SXRV',
      name: 'iShares NASDAQ 100 UCITS ETF',
      issuer: 'BlackRock',
      isin: 'IE00B53SZB19',
      replicationType: 'Physical',
      holdingsCount: 101
    },
    holdings: [
      { company: 'Microsoft', securityTicker: 'MSFT', weight: 8.4, sector: 'Information Technology', country: 'United States', region: 'North America', currency: 'USD' },
      { company: 'NVIDIA', securityTicker: 'NVDA', weight: 8, sector: 'Information Technology', country: 'United States', region: 'North America', currency: 'USD' },
      { company: 'Apple', securityTicker: 'AAPL', weight: 7.5, sector: 'Information Technology', country: 'United States', region: 'North America', currency: 'USD' },
      { company: 'Amazon', securityTicker: 'AMZN', weight: 5.5, sector: 'Consumer Discretionary', country: 'United States', region: 'North America', currency: 'USD' },
      { company: 'Meta Platforms', securityTicker: 'META', weight: 4.6, sector: 'Communication Services', country: 'United States', region: 'North America', currency: 'USD' },
      { company: 'Broadcom', securityTicker: 'AVGO', weight: 4.1, sector: 'Information Technology', country: 'United States', region: 'North America', currency: 'USD' },
      { company: 'Tesla', securityTicker: 'TSLA', weight: 2.8, sector: 'Consumer Discretionary', country: 'United States', region: 'North America', currency: 'USD' },
      { company: 'Other Holdings', weight: 59.1, sector: 'Diversified', country: 'Global', region: 'Global', currency: 'USD' }
    ]
  }
];
