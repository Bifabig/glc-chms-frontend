import { Box, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { tokens } from '../theme';
import ProgressCircle from './ProgressCircle';

const StatBox = ({
  title, subtitle, icon, progress, increase,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: colors.grey[100],
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Typography variant="h7" sx={{ color: colors.orangeAccent[500] }}>{subtitle}</Typography>
        <Typography variant="h7" fontStyle="italic" sx={{ color: colors.orangeAccent[600] }}>{increase}</Typography>
      </Box>
    </Box>
  );
};

StatBox.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  progress: PropTypes.string.isRequired,
  increase: PropTypes.string.isRequired,
};

export default StatBox;
