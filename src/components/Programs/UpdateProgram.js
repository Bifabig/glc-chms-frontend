/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import { getChurches, updateProgram } from '../../redux/thunk';
// import styles from '../../styles/Members.module.css';
import TeamsDropdown from '../Teams/TeamsDropdown';

const UpdateProgram = ({ programDetail }) => {
  const [msg, setMsg] = useState('');
  const [hasAttendance, setHasAttendance] = useState(true);
  const [selectedTeams, setSelectedTeams] = useState(programDetail.programTeams);

  const {
    churches, isLoading,
  } = useSelector((store) => store.churches);

  const dispatch = useDispatch();
  const form = useForm();
  const {
    register, handleSubmit, formState, control,
  } = form;
  const { errors } = formState;

  const onChangeCheckBox = (e) => {
    setHasAttendance(e.target.checked);
  };

  const onSubmit = (data) => {
    const program = new FormData();
    program.append('program[name]', data.name);
    program.append('program[date]', data.date);
    program.append('program[church_id]', data.church_id);
    program.append('program[attendance_taker]', data.attendance_taker);
    if (selectedTeams.length > 0) {
      selectedTeams.forEach((team) => {
        program.append('program[teams][]', team.id);
      });
    } else {
      program.append('program[teams]', '');
    }

    dispatch(updateProgram({ id: programDetail.attributes.id, programData: program })).then(
      setMsg('Program Added Successfully'),
    );

    setTimeout(() => {
      setMsg('');
    }, 3000);
  };

  useEffect(() => {
    dispatch(getChurches());
  }, [dispatch]);

  return (
    (
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>
          <div className="formInput">
            <span>Take Attendance</span>
            <input
              type="checkbox"
              id="checkbox"
              checked={hasAttendance}
              onChange={onChangeCheckBox}
            />
          </div>
          {hasAttendance && (
          <div className="formInput">
            <label htmlFor="attendance taker" className="label">Attendance Taker</label>
            <input
              type="text"
              defaultValue={
                programDetail.attributes.attendance_taker === 'undefined'
                  ? ''
                  : `${programDetail.attributes.attendance_taker}`
                }
              id="attendance_taker"
              {...register('attendance_taker', {
                required:
                    {
                      value: true,
                      message: 'Attendance taker is required',
                    },
              })
                }
              className="inputField"
            />
            <span className="errorMsg">{ errors.attendance_taker?.message }</span>
          </div>
          )}
          <div className="formInput">
            <label htmlFor="name" className="label">Program Name</label>
            <input
              type="text"
              defaultValue={programDetail.attributes.name}
              id="name"
              {...register('name', {
                required:
                    {
                      value: true,
                      message: 'Program name is required',
                    },
              })
                }
              placeholder="Program Name"
              className="inputField"
            />
            <span className="errorMsg">{ errors.name?.message }</span>
          </div>
          <div className="formInput">
            <label htmlFor="date" className="label">Program Date</label>
            <input
              type="date"
              defaultValue={programDetail.attributes.date}
              id="date"
              {...register('date', { required: 'Joined date is required' })}
              placeholder="Program Date"
              className="inputField"
            />
            <span className="errorMsg">{ errors.date?.message }</span>
          </div>
          <div className="formInput">
            <label htmlFor="church id" className="label">Branch Church</label>
            {isLoading ? <option>Loading...</option>
              : (
                <select
                  id="church_id"
                  defaultValue={programDetail.programChurch[0].id}
                  name="church_id"
                  {...register('church_id', { required: 'Please Select a Church' })}
                  className="inputField"
                >
                  {churches.map((church) => (
                    <option
                      value={church.id}
                      key={church.id}
                    >
                      {church.name}
                    </option>
                  ))}
                </select>
              )}
            <span className="errorMsg">{ errors.church_id?.message }</span>
          </div>
          <div className="formInput">
            <label htmlFor="teams" className="label">Teams</label>
            <Controller
              control={control}
              name="teams"
              render={({ field }) => (

                <TeamsDropdown
                  field={field}
                  defaultValue={programDetail.programTeams.map((val) => val.id)}
                  selectedTeams={selectedTeams}
                  setSelectedTeams={setSelectedTeams}
                />

              )}
            />
            <span className="errorMsg">{errors.teams?.message}</span>
          </div>
          <div className="submitBtn">
            <Button type="submit" variant="contained" color="success">
              Update Program
            </Button>
          </div>
          <span>{msg}</span>
        </form>
      </div>
    )
  );
};

UpdateProgram.propTypes = {
  programDetail: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
      PropTypes.array,
    ]),
  ).isRequired,
};

export default UpdateProgram;
