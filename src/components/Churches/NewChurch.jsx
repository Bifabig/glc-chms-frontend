/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box, Button, TextField, useTheme,
} from '@mui/material';
import { useForm } from 'react-hook-form';
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createChurch } from '../../redux/thunk';
import { tokens } from '../../theme';

const NewChurch = () => {
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const form = useForm();
  const {
    register, handleSubmit, reset, formState,
  } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    const church = new FormData();
    church.append('church[name]', data.name);
    church.append('church[location]', data.location);
    church.append('church[established_at]', data.established_at);
    church.append('church[user_id]', '1');

    dispatch(createChurch(church)).then(setMsg('Church Added Successfully!'));
    setTimeout(() => {
      setMsg('');
    }, 3000);

    reset();
  };

  return (
    <Box p={2}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <TextField
          type="date"
          {...register('established_at', {
            required:
                 {
                   value: true,
                   message: 'Church establishment date is required',
                 },
          })
             }
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
            mt: 1,
            '& ::-webkit-calendar-picker-indicator': {
              filter: 'invert(1)',
            },
          }}
        />
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Established in"
            {...register('established_at', {
              required:
                   {
                     value: true,
                     message: 'Church establishment date is required',
                   },
            })
               }
            error={Boolean(errors.established_at)}
            helperText={errors.established_at?.message}
            margin="normal"
            sx={{ width: '100%', mt: 2 }}
          />
        </LocalizationProvider> */}
        <TextField
          fullWidth
          label="name"
          type="text"
          {...register('name', {
            required:
                    {
                      value: true,
                      message: 'Church name is required',
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
          }}
        />
        <TextField
          fullWidth
          label="location"
          type="text"
          {...register('location', {
            required:
                    {
                      value: true,
                      message: 'Church location is required',
                    },
          })
                }
          error={Boolean(errors.location)}
          helperText={errors.location?.message}
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
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ background: colors.greenAccent[700], ':hover': { background: colors.greenAccent[600] }, mt: 2 }}
        >
          Add Church
        </Button>
        <span>{msg}</span>
      </Box>
    </Box>
  );
};

export default NewChurch;
