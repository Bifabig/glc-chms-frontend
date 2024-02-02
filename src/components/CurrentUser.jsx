import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, useTheme } from '@mui/material';
import { getCurrentUser } from '../redux/thunk';
import { tokens } from '../theme';

const CurrentUser = () => {
  const {
    currentUser, isLoading, error, errorMsg,
  } = useSelector((store) => store.currentUser);
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    dispatch(getCurrentUser());
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
    <Typography>Loading...</Typography>
  ) : (
    <Typography variant="h6" color={colors.grey[100]} fontWeight="bold" sx={{ m: '10px 0 0 0' }}>
      {currentUser.data.attributes.email}
    </Typography>
  );
};

export default CurrentUser;
