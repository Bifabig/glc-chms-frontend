import { Box } from '@mui/material';
import React from 'react';
import Header from '../Header';
// import PieChart from '../PieChart';

const Dashboard = () => (
  <Box m="20px" p={2}>
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="Dashboard" subtitle="Welcome to your dashboard" />
      {/* <Box height="25vh">
        <PieChart />

      </Box> */}
    </Box>
  </Box>
);

export default Dashboard;
