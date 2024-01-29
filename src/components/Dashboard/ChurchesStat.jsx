import { Box, useTheme } from '@mui/material';
import { Church } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import StatBox from '../StatBox';
import { tokens } from '../../theme';
import { getChurches } from '../../redux/thunk';

const ChurchesStat = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  const {
    churches, isLoading, error, errorMsg,
  } = useSelector((store) => store.churches);

  useEffect(() => {
    dispatch(getChurches());
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

  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <Box
      gridColumn="span 3"
      backgroundColor={colors.primary[400]}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <StatBox
        title={`${churches?.length}`}
        subtitle="Total Churches"
        progress="0.5"
        increase="+21%"
        icon={(
          <Church
            sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
          />
            )}
      />
    </Box>
  );
};

export default ChurchesStat;