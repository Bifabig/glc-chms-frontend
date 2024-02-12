/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  Box, Button, MenuItem, OutlinedInput, TextField, useTheme,
} from '@mui/material';
import { createTeam, getChurches } from '../../redux/thunk';
import { tokens } from '../../theme';

const NewTeam = () => {
  const [msg, setMsg] = useState('');
  const [selectedChurch, setSelectedChurch] = useState([]);

  const dispatch = useDispatch();
  const form = useForm();
  const {
    register, handleSubmit, reset, formState,
  } = form;
  const { errors } = formState;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

  const onSubmit = (data) => {
    const team = new FormData();
    team.append('team[name]', data.name);
    team.append('team[main_leader_name]', data.main_leader_name);
    team.append('team[sub_leader_name]', data.sub_leader_name);
    team.append('team[established_at]', data.established_at);
    team.append('team[church_id]', data.church_id);

    dispatch(createTeam(team)).then(setMsg('Team Added Successfully'));
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
          overflow="auto"
        >

          <TextField
            label="name"
            type="text"
            {...register('name', {
              required:
                  {
                    value: true,
                    message: 'Full name is required',
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
            label="Main Leader's Name"
            type="text"
            {...register('main_leader_name', {
              required:
                  {
                    value: true,
                    message: 'Main leader&apos;s name is required',
                  },
            })
              }
            error={Boolean(errors.main_leader_name)}
            helperText={errors.main_leader_name?.message}
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
            label="Sub Leader's Name"
            type="text"
            {...register('sub_leader_name', {
              required:
                  {
                    value: true,
                    message: 'Main leader&apos;s name is required',
                  },
            })
              }
            error={Boolean(errors.sub_leader_name)}
            helperText={errors.sub_leader_name?.message}
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
            {...register('established_at', { required: 'Established date is required' })}
            defaultValue=""
            error={Boolean(errors.established_at)}
            helperText={errors.established_at?.message}
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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ background: colors.greenAccent[700], ':hover': { background: colors.greenAccent[600] }, mt: 2 }}
          >
            Add Team
          </Button>
          <span>{msg}</span>
        </Box>
      </Box>
    )
  );
};

export default NewTeam;
