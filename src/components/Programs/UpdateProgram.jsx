/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box, Button, MenuItem, OutlinedInput, TextField, useTheme,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import { getChurches, updateProgram } from '../../redux/thunk';
// import styles from '../../styles/Members.module.css';
import TeamsDropdown from '../Teams/TeamsDropdown';
import { tokens } from '../../theme';

const UpdateProgram = ({ programDetail }) => {
  const [msg, setMsg] = useState('');
  const [hasAttendance, setHasAttendance] = useState(true);
  const [selectedChurch, setSelectedChurch] = useState(`${programDetail.programChurch[0].id}`);
  const [selectedTeams, setSelectedTeams] = useState(programDetail.programTeams);

  const {
    churches, isLoading,
  } = useSelector((store) => store.churches);

  const handleChurchSelect = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedChurch(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const dispatch = useDispatch();
  const form = useForm();
  const {
    register, handleSubmit, formState, control,
  } = form;
  const { errors } = formState;

  const onChangeCheckBox = (e) => {
    setHasAttendance(e.target.checked);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
      <Box p={2}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          display="flex"
          flexWrap="wrap"
          gap="4%"
          overflow="auto"
        >
          <Box display="flex" gap="4%" sx={{ width: '100%' }}>
            <Box display="flex" alignItems="center" sx={{ width: '48%' }}>
              <span>Take Attendance</span>
              <input
                type="checkbox"
                id="checkbox"
                checked={hasAttendance}
                onChange={onChangeCheckBox}
              />
            </Box>
            {hasAttendance && (
              <TextField
                label="attendance taker"
                defaultValue={
                  programDetail.attributes.attendance_taker === 'undefined'
                    ? ''
                    : `${programDetail.attributes.attendance_taker}`
                  }
                type="text"
                {...register('attendance_taker', {
                  required:
                      {
                        value: true,
                        message: 'Attendance taker is required',
                      },
                })
                  }
                error={Boolean(errors.attendance_taker)}
                helperText={errors.attendance_taker?.message}
                margin="normal"
                sx={{
                  '& label.Mui-focused': {
                    color: colors.orangeAccent[500],
                  },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: colors.orangeAccent[500],
                    },
                  },
                  width: '48%',
                }}
              />
            )}
          </Box>
          {/* <div className="formInput">
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
          )} */}
          <TextField
            label="program name"
            defaultValue={programDetail.attributes.name}
            type="text"
            {...register('name', {
              required:
                  {
                    value: true,
                    message: 'program name is required',
                  },
            })
              }
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            margin="normal"
            sx={{
              '& label.Mui-focused': {
                color: colors.orangeAccent[500],
              },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: colors.orangeAccent[500],
                },
              },
              width: '48%',
            }}
          />
          {/* <div className="formInput">
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
          </div> */}
          <TextField
            type="date"
            defaultValue={programDetail.attributes.date}
            {...register('date', { required: 'Joined date is required' })}
            error={Boolean(errors.joined_at)}
            helperText={errors.joined_at?.message}
            margin="normal"
            sx={{
              '& label.Mui-focused': {
                color: colors.orangeAccent[500],
              },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: colors.orangeAccent[500],
                },
              },
              width: '48%',
              '& ::-webkit-calendar-picker-indicator': {
                filter: 'invert(1)',
              },
            }}
          />
          {/* <div className="formInput">
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
          </div> */}
          <TextField
            id="church_id"
            select
            {...register('church_id', {
              required:
                  {
                    value: true,
                    message: 'Church is required',
                  },
            })
              }
          // label="church"
            variant="outlined"
            value={selectedChurch}
            onChange={handleChurchSelect}
            input={<OutlinedInput label="church" />}
            error={Boolean(errors.church_id)}
            helperText={errors.church_id?.message}
            sx={{
              '& label.Mui-focused': {
                color: colors.orangeAccent[500],
              },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: colors.orangeAccent[500],
                },
              },
              width: '100%',
              mt: 1,
            }}
          >
            {isLoading ? <MenuItem>Loading...</MenuItem>
              : (churches.map((church) => (
                <MenuItem
                  value={church.id}
                  key={church.id}
                  sx={{
                    backgroundColor: colors.primary[400],
                  }}
                >
                  {church.name}
                </MenuItem>
              )))}
          </TextField>
          {/* <div className="formInput">
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
          </div> */}
          <Box
            width="100%"
            sx={{ mt: 2 }}
          >
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
          </Box>
          {/* <div className="formInput">
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
          </div> */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ background: colors.greenAccent[700], ':hover': { background: colors.greenAccent[600] }, mt: 2 }}
          >
            Update Program
          </Button>
          <span>{msg}</span>
        </Box>
      </Box>
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
