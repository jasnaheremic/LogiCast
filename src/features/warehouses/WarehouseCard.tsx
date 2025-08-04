import { CardContent, Card, Typography, CardActions, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import type { WarehouseData } from '../../interfaces/Warehouse';

interface WarehouseCardProps {
  warehouse: WarehouseData;
}

const WarehouseCard = ({ warehouse }: WarehouseCardProps) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    const warehouseInventoryRoute = ROUTES.WAREHOUSE_INVENTORY.replace(':warehouseId', String(warehouse?.id));
    navigate(warehouseInventoryRoute);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Card sx={{ borderRadius: 2, boxShadow: 1, height: '100%' }}>
        <CardContent sx={{ p: 1.5 }}>
          <Typography variant="h6" component="div" noWrap>
            {warehouse.name}
          </Typography>
          <Typography
            gutterBottom
            sx={{
              color: 'text.secondary',
              fontSize: 12,
              mb: 1
            }}
            noWrap
          >
            {warehouse.location}
          </Typography>
          <Box
            sx={{
              backgroundColor: 'grey.100',
              p: 1.2,
              borderRadius: 1,
              fontSize: 13
            }}
          >
            <Typography variant="body2" sx={{ fontSize: 'inherit' }}>
              <Box component="span" display="block">
                Capacity: {warehouse.maxCapacity}%
              </Box>
              <Box component="span" display="block">
                Low Stock:
                {/*{warehouse.lowStockItems || 0} items*/}
              </Box>
            </Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end', p: 1 }}>
          <Button onClick={handleViewMore} size="small" variant="text" sx={{ fontSize: 12 }}>
            View More
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default WarehouseCard;
