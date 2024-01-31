import { Box, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { tokens } from '../theme';

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h4"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ mb: '5px' }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        color={colors.orangeAccent[400]}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default Header;
