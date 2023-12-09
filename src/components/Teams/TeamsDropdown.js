import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
// import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { getTeams } from '../../redux/thunk';
import styles from '../../styles/Members.module.css';

const TeamsDropdown = ({
  field, errors, selectedTeams, setSelectedTeams,
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
    <>
      {/* <Controller
        control={control}
        name="teams"
        render={({ ref }) => ( */}
      <Select
          // eslint-disable-next-line react/jsx-props-no-spreading
        // {...register('teams', { required: 'Please Select a Church' })}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...field}
        isMulti
        options={isLoading ? <span>Loading...</span> : teams.map((team) => ({
          value: team.id,
          label: team.name,
        }))}
        className={styles.selectorDropdown}
        classNamePrefix="select"
        onChange={handleOnChange}
        value={selectedTeams.length > 0 ? selectedTeams.value : []}
        // inputRef={ref}
      />
      {/* )} */}
      {/* /> */}
      <span className={styles.errorMsg}>{errors.teams?.message}</span>

    </>

  );
};

TeamsDropdown.propTypes = {
  // register: PropTypes.func.isRequired,
  field: PropTypes.objectOf(
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
