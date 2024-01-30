import { Box, useTheme } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import StatBox from '../StatBox';
import { tokens } from '../../theme';
import { getMembers } from '../../redux/thunk';

const MembersStat = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  const {
    members, isLoading, error, errorMsg,
  } = useSelector((store) => store.members);

  useEffect(() => {
    dispatch(getMembers());
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
        title={`${members?.data.length}`}
        subtitle="Total Members"
        progress="0.75"
        increase="+14%"
        icon={(
          <PersonAdd
            sx={{ color: colors.orangeAccent[600], fontSize: '26px' }}
          />
            )}
      />
    </Box>
  );
};

export default MembersStat;
