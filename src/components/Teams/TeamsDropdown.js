import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { getTeams } from '../../redux/thunk';
import styles from '../../styles/Members.module.css';

const TeamsDropdown = ({
  defaultValue, field, selectedTeams, setSelectedTeams,
}) => {
  const dispatch = useDispatch();
  const {
    teams, isLoading,
  } = useSelector((store) => store.teams);

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
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...field}
            isMulti
            options={teams.map((team) => ({
              value: team.id,
              label: team.name,
            }))}
            className={styles.selectorDropdown}
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
