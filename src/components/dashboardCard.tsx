import { Card, Typography } from '@mui/material';

interface DashboardStatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
}

const DashboardCard = ({ label, value, subtext }: DashboardStatCardProps) => {
  return (
    <Card sx={{ p: 3, width: '100%', borderRadius: 3, backgroundColor: '#fff' }}>
      <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
        {value}
      </Typography>
      {subtext && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
          {subtext}
        </Typography>
      )}
    </Card>
  );
};

export default DashboardCard;
