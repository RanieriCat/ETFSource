import { usePortfolioContext } from '../app/PortfolioContext';
import { KpiCard } from '../shared/ui/KpiCard';
import { Table } from '../shared/ui/Table';
import { formatCurrency, formatPct } from '../shared/utils/format';
import { TreemapChart } from '../features/visualization/charts/TreemapChart';

export const OverviewDashboardPage = () => {
  const { analysis } = usePortfolioContext();

  if (!analysis) {
    return <p>Avvia prima l'analisi dalla pagina Portfolio Builder.</p>;
  }

  return (
    <section>
      <h2>Overview Dashboard</h2>
      <div className="kpi-grid">
        <KpiCard label="Totale analizzato" value={formatCurrency(analysis.kpi.totalAnalyzedAmount)} />
        <KpiCard label="Numero ETF" value={String(analysis.kpi.etfCount)} />
        <KpiCard label="Aziende effettive" value={String(analysis.kpi.effectiveCompanyCount)} />
        <KpiCard label="Top 10 concentration" value={formatPct(analysis.kpi.top10Concentration)} />
      </div>

      <h3>Treemap (Top holdings)</h3>
      <TreemapChart rows={analysis.companyExposure} />

      <h3>Top Holdings</h3>
      <Table
        rows={analysis.companyExposure.slice(0, 12)}
        columns={[
          { header: 'Company', cell: (row) => row.company },
          { header: 'Weight', cell: (row) => formatPct(row.weight) }
        ]}
      />
    </section>
  );
};
