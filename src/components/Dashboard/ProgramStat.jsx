import { Box, Typography, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tokens } from '../../theme';
import { getPrograms } from '../../redux/thunk';

const ProgramStat = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    programs, isLoading, error, errorMsg,
  } = useSelector((store) => store.programs);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPrograms());
  }, [dispatch]);

  if (error) {
    return (
      <span>
        Something Went Wrong...
        <br />
        <br />
        {errorMsg}
      </span>
    );
  }

  return isLoading ? <h2>Loading...</h2>
    : (
      <Box
        gridColumn="span 6"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        overflow="auto"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid ${colors.primary[500]}`}
          colors={colors.grey[100]}
          p="15px"
        >
          <Typography
            color={colors.grey[100]}
            variant="h5"
            fontWeight="600"
          >
            Recent Programs
          </Typography>
        </Box>
        {programs?.data.map((program) => (
          <Box
            key={`${program.id}`}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Box>
              <Typography
                color={colors.orangeAccent[500]}
                variant="h5"
                fontWeight="600"
              >
                {program.id}
              </Typography>
              <Typography
                color={colors.grey[100]}
              >
                {program.attributes.name}
              </Typography>
            </Box>
            <Box
              color={colors.grey[100]}
            >
              {program.attributes.date}
            </Box>
            <Box
              backgroundColor={colors.orangeAccent[500]}
              p="5px 10px"
              borderRadius="4px"
            >
              {
                program.attributes.attendance_taker === 'undefined'
                  ? 'N/A'
                  : `${program.attributes.attendance_taker}`
              }
            </Box>
          </Box>
        ))}
      </Box>
    );
};

export default ProgramStat;
