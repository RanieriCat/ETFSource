import { usePortfolioContext } from '../app/PortfolioContext';
import { Table } from '../shared/ui/Table';
import { formatPct } from '../shared/utils/format';
import { OverlapHeatmap } from '../features/visualization/charts/OverlapHeatmap';

export const OverlapPage = () => {
  const { analysis } = usePortfolioContext();
  if (!analysis) return <p>Nessun dato: esegui l'analisi.</p>;

  return (
    <section>
      <h2>Overlap View</h2>
      <OverlapHeatmap rows={analysis.overlapMatrix} />
      <Table
        rows={analysis.overlapMatrix}
        columns={[
          { header: 'Pair', cell: (row) => `${row.etfA} / ${row.etfB}` },
          { header: 'Overlap', cell: (row) => formatPct(row.overlapWeight) },
          { header: 'Top shared', cell: (row) => row.sharedCompanies.slice(0, 3).map((item) => `${item.company} (${formatPct(item.sharedWeight)})`).join(', ') }
        ]}
      />
    </section>
  );
};
