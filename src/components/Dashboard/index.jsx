import {
  Box, Button, IconButton, Typography, useTheme,
} from '@mui/material';
import React from 'react';
import {
  DownloadOutlined, PersonAdd, Traffic,
} from '@mui/icons-material';
import Header from '../Header';
import { tokens } from '../../theme';
import StatBox from '../StatBox';
// import PieChart from '../PieChart';
import MembersStat from './MembersStat';
import ProgramStat from './ProgramStat';
import LineChart from '../LineChart';
import ChurchesStat from './ChurchesStat';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px" p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
            }}
          >
            <DownloadOutlined sx={{ mr: '10px' }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <MembersStat />
        <ChurchesStat />
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,361"
            subtitle="Programs"
            progress="0.30"
            increase="+5%"
            icon={(
              <PersonAdd
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            )}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,431,361"
            subtitle="Traffic Inbound"
            progress="0.80"
            increase="+21%"
            icon={(
              <Traffic
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            )}
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>Revenue</Typography>
              <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>$55,555,666</Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlined
                  sx={{
                    fontSize: '26px',
                    color: colors.greenAccent[500],
                  }}
                />
              </IconButton>
            </Box>
          </Box>

          <Box height="250px" mt="-20px">
            {/* <PieChart /> */}
            <LineChart />
          </Box>
          {/* Programs */}

        </Box>
        <ProgramStat />
      </Box>

    </Box>
  );
};

export default Dashboard;
