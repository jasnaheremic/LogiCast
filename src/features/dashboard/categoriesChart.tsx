import { useEffect } from 'react';
import { Box, Typography, LinearProgress, Stack } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchCategoriesByAllInventoriesSum } from '../../redux/api/inventory';

const colorMap = ['#42A5F5', '#EF6C00', '#66BB6A'];

export const CategoriesChart = () => {
  const dispatch = useAppDispatch();
  const { categoriesByAllInventoriesSum = [] } = useAppSelector(state => state.inventories);

  useEffect(() => {
    dispatch(fetchCategoriesByAllInventoriesSum());
  }, [dispatch]);

  const maxValue = Math.max(...categoriesByAllInventoriesSum.map(c => c.totalValue), 0);

  return (
    <Box sx={{ p: 4, borderRadius: 2 }}>
      <Box
        sx={{
          backgroundColor: '#fff',
          p: 3,
          borderRadius: 2,
          boxShadow: '0px 2px 6px rgba(0,0,0,0.1)'
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Top 3 Categories by Total Value</Typography>
        </Stack>

        {categoriesByAllInventoriesSum.map((category, index) => {
          const percentage = maxValue > 0 ? (category.totalValue / maxValue) * 100 : 0;

          return (
            <Box key={category.categoryId} mb={3}>
              <Typography variant="subtitle2" mb={0.5}>
                {category.categoryName}
              </Typography>
              <Box display="flex" alignItems="center">
                <Box flex={1} mr={2}>
                  <LinearProgress
                    variant="determinate"
                    value={percentage}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: colorMap[index % colorMap.length]
                      }
                    }}
                  />
                </Box>
                <Typography variant="body2" sx={{ minWidth: 60 }}>
                  {category.totalValue.toLocaleString()} $
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default CategoriesChart;
