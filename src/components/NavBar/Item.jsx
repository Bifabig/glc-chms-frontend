import { Typography } from '@mui/material';
import React from 'react';
import { MenuItem } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Item = ({
  title, to, icon, selected, setSelected,
}) => (
  <MenuItem
    active={selected === title}
    onClick={() => setSelected(title)}
    icon={icon}
    component={<NavLink to={to} />}
  >
    <Typography>
      {title}
    </Typography>
  </MenuItem>
);

Item.propTypes = {
  setSelected: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Item;
