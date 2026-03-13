# ETF Source (V1)

Frontend-only tool per analizzare l'esposizione reale di un portafoglio ETF.

## Stack
- React + TypeScript + Vite
- Portfolio engine puro TypeScript (framework agnostic)
- PixiJS (`pixi.js`) per chart ad alte prestazioni

## Architettura

### 1) UI Layer
- `src/app`: bootstrap, router, context applicativo.
- `src/pages`: viste principali richieste (builder, dashboard, companies, sectors, countries, overlap, simulator).
- `src/widgets`, `src/shared/ui`: layout e componenti riusabili.

### 2) Domain / Portfolio Engine
- `src/features/portfolio/types`: contratti TypeScript ETF/holdings/portfolio/output.
- `src/features/portfolio/engine`: funzioni pure per pesi, aggregazioni, sorting, overlap.
- `src/features/portfolio/providers`: interfacce provider + mock provider.
- `src/features/analytics/simulator.ts`: base per simulazioni future.

### 3) Visualization Layer
- `src/features/visualization/charts`: Treemap + Overlap heatmap iniziali con PixiJS.
- `src/features/visualization/utils`: utility visual.

## Avvio
```bash
npm install
npm run dev
```

## Test
```bash
npm run test
npm run build
```

## Estendibilità prevista
- Sostituire `MockEtfDataProvider` con provider reali (file/API) senza cambiare UI.
- Aggiungere normalizzazione holdings più sofisticata nel domain layer.
- Estendere grafici PixiJS (sunburst, flow diagram, morphing treemap).
