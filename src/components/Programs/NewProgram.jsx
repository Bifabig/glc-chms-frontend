/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, MenuItem, OutlinedInput, TextField, useTheme,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { createProgram, getChurches } from '../../redux/thunk';
import TeamsDropdown from '../Teams/TeamsDropdown';
import { tokens } from '../../theme';

const NewProgram = () => {
  const [msg, setMsg] = useState('');
  const [hasAttendance, setHasAttendance] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedChurch, setSelectedChurch] = useState([]);

  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    churches, isLoading,
  } = useSelector((store) => store.churches);

  const form = useForm();
  const {
    register, handleSubmit, reset, formState, control,
  } = form;
  const { errors } = formState;

  const onChangeCheckBox = (e) => {
    setHasAttendance(e.target.checked);
  };

  const handleChurchSelect = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedChurch(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
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

    dispatch(createProgram(program)).then(
      setMsg('Program Added Successfully'),
    );

    setTimeout(() => {
      setMsg('');
    }, 3000);
    reset();
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

          <TextField
            label="program name"
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
          <TextField
            type="date"
            {...register('date', { required: 'Joined date is required' })}
            defaultValue=""
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
            label="church"
            variant="outlined"
            value={selectedChurch}
            onChange={handleChurchSelect}
            input={<OutlinedInput label="church" />}
            error={Boolean(errors.church_id)}
            helperText={errors.church_id?.message}
            overflow="auto"
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
              mt: 1,
            }}
          >
            {isLoading ? <MenuItem>Loading...</MenuItem>
              : churches.map((church) => (
                <MenuItem
                  value={church.id}
                  key={church.id}
                  sx={{
                    backgroundColor: colors.primary[400],
                  }}
                >
                  {church.name}
                </MenuItem>
              ))}
          </TextField>
          <Box
            width="48%"
            sx={{ mt: 1 }}
          >
            <Controller
              control={control}
              name="teams"
              render={({ field }) => (

                <TeamsDropdown
                  field={field}
                  defaultValue={[]}
                  selectedTeams={selectedTeams}
                  setSelectedTeams={setSelectedTeams}
                />

              )}
            />
            <span className="errorMsg">{errors.teams?.message}</span>

          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ background: colors.greenAccent[700], ':hover': { background: colors.greenAccent[600] }, mt: 2 }}
          >
            Add Program
          </Button>
          <span>{msg}</span>
        </Box>
      </Box>
    )
  );
};

export default NewProgram;
