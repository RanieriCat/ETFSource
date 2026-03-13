import { usePortfolioContext } from '../app/PortfolioContext';
import { Table } from '../shared/ui/Table';

export const PortfolioBuilderPage = () => {
  const { input, availableTickers, updatePosition, addPosition, runAnalysis } = usePortfolioContext();

  return (
    <section>
      <h2>Portfolio Builder</h2>
      <p>Inserisci ETF e importi investiti, poi avvia l'analisi.</p>

      <Table
        rows={input.positions}
        columns={[
          {
            header: 'ETF',
            cell: (row) => (
              <select value={row.etfTicker} onChange={(event) => updatePosition(input.positions.indexOf(row), { etfTicker: event.target.value })}>
                {availableTickers.map((ticker) => (
                  <option key={ticker} value={ticker}>
                    {ticker}
                  </option>
                ))}
              </select>
            )
          },
          {
            header: 'Amount (€)',
            cell: (row) => (
              <input
                type="number"
                min={0}
                value={row.amountInvested ?? 0}
                onChange={(event) => updatePosition(input.positions.indexOf(row), { amountInvested: Number(event.target.value) })}
              />
            )
          }
        ]}
      />

      <div className="actions">
        <button onClick={addPosition}>Aggiungi ETF</button>
        <button onClick={runAnalysis}>Analizza portafoglio</button>
      </div>
    </section>
  );
};
