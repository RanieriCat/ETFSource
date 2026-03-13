import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../widgets/AppLayout';
import { PortfolioBuilderPage } from '../pages/PortfolioBuilderPage';
import { OverviewDashboardPage } from '../pages/OverviewDashboardPage';
import { CompaniesPage } from '../pages/CompaniesPage';
import { SectorsPage } from '../pages/SectorsPage';
import { CountriesPage } from '../pages/CountriesPage';
import { OverlapPage } from '../pages/OverlapPage';
import { SimulatorPage } from '../pages/SimulatorPage';

export const App = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route path="/" element={<PortfolioBuilderPage />} />
      <Route path="/overview" element={<OverviewDashboardPage />} />
      <Route path="/companies" element={<CompaniesPage />} />
      <Route path="/sectors" element={<SectorsPage />} />
      <Route path="/countries" element={<CountriesPage />} />
      <Route path="/overlap" element={<OverlapPage />} />
      <Route path="/simulator" element={<SimulatorPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);
