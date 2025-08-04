import { useLocation, Link, useParams } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../utils/constants';
import { useAppSelector } from '../../hooks/reduxHooks';

const NavbarBreadcrumbs = () => {
  const location = useLocation();
  const { warehouseId } = useParams();
  const pathnames = location.pathname.split('/').filter(Boolean);
  const { t } = useTranslation();
  const warehouses = useAppSelector(state => state.warehouses.warehouses);
  const warehouseName = warehouses.find(warehouse => warehouse.id === warehouseId)?.name || '';

  const breadcrumbNameMap: { [key: string]: string } = {
    [ROUTES.DASHBOARD]: t('pages.dashboard'),
    [ROUTES.INVENTORY]: t('pages.inventory'),
    [ROUTES.WAREHOUSES]: t('pages.warehouses'),
    [ROUTES.WAREHOUSE_INVENTORY]: t('pages.warehouse_inventory'),
    ...(warehouseId && {
      [`${ROUTES.WAREHOUSE_INVENTORY.replace(':warehouseId', warehouseId)}`]: `${warehouseName}`
    })
  };

  const breadcrumbLinks = pathnames.map((_pathname, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
    const isLast = index === pathnames.length - 1;
    const breadcrumbText = breadcrumbNameMap[to]?.toUpperCase();
    if (!breadcrumbText) return null;

    if (pathnames.length === 1 && isLast) {
      <Typography key={to}>{breadcrumbText}</Typography>;
    }

    return isLast ? (
      <Typography variant="h6">{breadcrumbText}</Typography>
    ) : (
      <Typography key={to} variant="h6">
        <Link style={{ textDecoration: 'none', color: 'grey' }} to={to}>
          {breadcrumbText}
        </Link>
      </Typography>
    );
  });

  return (
    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="large" />}>
      {breadcrumbLinks}
    </Breadcrumbs>
  );
};

export default NavbarBreadcrumbs;
