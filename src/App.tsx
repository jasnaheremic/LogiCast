import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import { ROUTES } from './utils/constants';
import DashboardPage from './views/DashboardPage';
import WarehousesPage from './views/WarehousesPage';
import InventoryPage from './views/InventoryPage';
import WarehouseInventoryPage from './views/WarehouseInventoryPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.BASE_ROUTE} element={<DashboardPage />} />
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.INVENTORY} element={<InventoryPage />} />
          <Route path={ROUTES.WAREHOUSES} element={<WarehousesPage />} />
          <Route path={ROUTES.WAREHOUSE_INVENTORY} element={<WarehouseInventoryPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
