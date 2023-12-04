import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { getTeams } from '../../redux/thunk';
import styles from '../../styles/Members.module.css';

const TeamsDropdown = ({
  register, control, errors, selectedTeams, setSelectedTeams, defaultValue,
}) => {
  const dispatch = useDispatch();
  // console.log(selectedTeams);
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
    <>
      <Controller
        control={control}
        name="teams"
        render={({ ref }) => (
          <Select
          // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('teams', { required: 'Please Select a Church' })}
            isMulti
            options={isLoading ? <span>Loading...</span> : teams.map((team) => ({
              value: team.id,
              label: team.name,
            }))}
            className={styles.selectorDropdown}
            classNamePrefix="select"
            onChange={handleOnChange}
            value={selectedTeams.length > 0 ? selectedTeams.name : []}
            inputRef={ref}
            defaultValue={defaultValue}
          />
        )}
      />
      <span className={styles.errorMsg}>{errors.teams?.message}</span>

    </>

  );
};

TeamsDropdown.defaultProps = { setSelectedTeams: {}, defaultValue: {} };
TeamsDropdown.propTypes = {
  register: PropTypes.func.isRequired,
  defaultValue: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ])),
  // control: PropTypes.objectOf(PropTypes.func).isRequired,
  control: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
    ]),
  ).isRequired,
  errors: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
    ]),
  ).isRequired,
  setSelectedTeams: PropTypes.func,
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
