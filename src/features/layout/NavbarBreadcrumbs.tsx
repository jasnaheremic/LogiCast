import { useLocation, Link } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../utils/constants';

const NavbarBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);
  const { t } = useTranslation();

  const breadcrumbNameMap: { [key: string]: string } = {
    [ROUTES.DASHBOARD]: t('pages.dashboard'),
    [ROUTES.INVENTORY]: t('pages.inventory'),
    [ROUTES.DEMAND_PREDICTION]: t('pages.demand_prediction'),
    [ROUTES.WAREHOUSES]: t('pages.warehouses')
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
