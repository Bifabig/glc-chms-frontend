import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { getTeams } from '../../redux/thunk';
import { tokens } from '../../theme';

const TeamsDropdown = ({
  defaultValue, field, selectedTeams, setSelectedTeams,
}) => {
  const dispatch = useDispatch();
  const {
    teams, isLoading,
  } = useSelector((store) => store.teams);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const style = {
    control: (base) => ({
      ...base,
      border: `0.1px solid ${colors.grey[500]}`,
      boxShadow: 'none',
      '&:hover': {
        border: `1px solid ${colors.orangeAccent[500]}`,
      },
      cursor: 'pointer',
      backgroundColor: 'transparent',
      minHeight: '55px',
      height: '55px',
    }),
    menu: (base) => ({
      ...base,
      // override border radius to match the box
      backgroundColor: colors.primary[400],
    }),
  };
  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const handleOnChange = (selectedOptions) => {
    const newSelectedTeams = selectedOptions.map((option) => option.value);
    const selectedTeamObjects = teams.filter((team) => newSelectedTeams.includes(team.id));
    setSelectedTeams(selectedTeamObjects);
  };
  return (
    isLoading ? <span>Loading...</span>
      : (
        <>
          <Select
            key={teams.map((team) => team.id)}
            placeholder={<Typography sx={{ color: colors.grey[200] }}>Select Teams</Typography>}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...field}
            isMulti
            options={teams.map((team) => ({
              value: team.id,
              label: team.name,
            }))}
            className="selectorDropdown"
            classNamePrefix="select"
            onChange={handleOnChange}
            value={selectedTeams?.name}
            defaultValue={teams.filter((val) => defaultValue.includes(`${val.id}`))
              .map(
                (team) => ({
                  value: team.id,
                  label: team.name,
                }),
              )}
            styles={style}
            theme={(theme) => ({
              ...theme,
              cursor: 'pointer',
              colors: {
                ...theme.colors,
                text: 'orangered',
                primary25: colors.orangeAccent[500],
              },
            })}
            // styles={{
            //   control: (baseStyles, state) => ({
            //     ...baseStyles,
            //     borderColor: state.isFocused ? colors.orangeAccent[500] : baseStyles.borderColor,
            //   }),
            // }}
          />
        </>
      )

  );
};

TeamsDropdown.propTypes = {
  field: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
    ]),
  ).isRequired,
  defaultValue: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
    ]),
  ).isRequired,
  setSelectedTeams: PropTypes.func.isRequired,
  selectedTeams: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
    ]),
  ).isRequired,
};

export default TeamsDropdown;
