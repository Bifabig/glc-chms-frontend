/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Box, Button, TextField, useTheme,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { updateChurch } from '../../redux/thunk';
import { tokens } from '../../theme';

const UpdateChurch = ({ churchDetail }) => {
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();

  const form = useForm();
  const {
    register, handleSubmit, reset, formState,
  } = form;
  const { errors } = formState;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const onSubmit = (data) => {
    const church = new FormData();
    church.append('church[name]', data.name);
    church.append('church[location]', data.location);
    church.append('church[established_at]', data.established_at);
    church.append('church[user_id]', '1');

    dispatch(updateChurch({ id: churchDetail.id, churchData: church })).then(setMsg('Church Updated Successfully!'));
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
          fullWidth
          defaultValue={churchDetail.name}
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
          defaultValue={churchDetail.location}
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
        <TextField
          type="date"
          defaultValue={churchDetail.established_at}
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
            '& ::-webkit-calendar-picker-indicator': {
              filter: 'invert(1)',
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
          Update Church
        </Button>
        <span>{msg}</span>
      </Box>
    </Box>
  );
};

UpdateChurch.propTypes = {
  churchDetail: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
      PropTypes.array,
    ]),
  ).isRequired,
};

export default UpdateChurch;
