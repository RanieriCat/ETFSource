import { usePortfolioContext } from '../app/PortfolioContext';
import { Table } from '../shared/ui/Table';
import { formatPct } from '../shared/utils/format';

export const CountriesPage = () => {
  const { analysis } = usePortfolioContext();
  if (!analysis) return <p>Nessun dato: esegui l'analisi.</p>;

  return (
    <section>
      <h2>Countries View</h2>
      <Table
        rows={analysis.countryExposure}
        columns={[
          { header: 'Country', cell: (row) => row.bucket },
          { header: 'Weight', cell: (row) => formatPct(row.weight) },
          { header: 'ETF contribution', cell: (row) => Object.entries(row.contributionByEtf).map(([etf, value]) => `${etf}: ${formatPct(value)}`).join(' · ') }
        ]}
      />
    </section>
  );
};
