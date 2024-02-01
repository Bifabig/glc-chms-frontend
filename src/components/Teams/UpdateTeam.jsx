/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Box, Button, MenuItem, OutlinedInput, TextField, useTheme,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { getChurches, updateTeam } from '../../redux/thunk';
import { tokens } from '../../theme';
// import styles from '../../styles/Churches.module.css';

const UpdateTeam = ({ teamDetail }) => {
  const [msg, setMsg] = useState('');
  const [selectedChurch, setSelectedChurch] = useState(`${teamDetail.id}`);
  const dispatch = useDispatch();

  const {
    churches, isLoading,
  } = useSelector((store) => store.churches);

  const form = useForm();
  const {
    register, handleSubmit, formState,
  } = form;
  const { errors } = formState;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

    dispatch(updateTeam({ id: teamDetail.id, teamData: team })).then(setMsg('Team Updated Successfully!'));
    setTimeout(() => {
      setMsg('');
    }, 3000);
  };
  useEffect(() => {
    dispatch(getChurches());
  }, [dispatch]);

  return (
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
          defaultValue={teamDetail.name}
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
        {/* <div className="formInput">
          <label htmlFor="name" className="label">Team Name</label>
          <input
            type="text"
            defaultValue={teamDetail.name}
            id="name"
            {...register('name', {
              required:
                    {
                      value: true,
                      message: 'Team name is required',
                    },
            })
                }
            className="inputField"
          />
          <span className="errorMsg">{ errors.name?.message }</span>
        </div> */}
        <TextField
          label="Main Leader's Name"
          type="text"
          defaultValue={teamDetail.main_leader_name}
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
        {/* <div className="formInput">
          <label htmlFor="main_leader_name" className="label">Main Leader&apos;s Name</label>
          <input
            type="text"
            defaultValue={teamDetail.main_leader_name}
            id="main_leader_name"
            {...register('main_leader_name', {
              required:
                    {
                      value: true,
                      message: 'Main leader&apos;s name is required',
                    },
            })
                }
            className="inputField"
          />
          <span className="errorMsg">{ errors.main_leader_name?.message }</span>
        </div> */}
        <TextField
          label="Sub Leader's Name"
          type="text"
          defaultValue={teamDetail.sub_leader_name}
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
        {/* <div className="formInput">
          <label htmlFor="sub_leader_name" className="label">Sub Leader&apos;s Name</label>
          <input
            type="text"
            id="sub_leader_name"
            defaultValue={teamDetail.sub_leader_name}
            {...register('sub_leader_name', {
              required:
                    {
                      value: true,
                      message: 'Sub leader&apos;s name is required',
                    },
            })
                }
            className="inputField"
          />
          <span className="errorMsg">{ errors.sub_leader_name?.message }</span>
        </div> */}
        <TextField
          type="date"
          defaultValue={teamDetail.established_at}
          {...register('established_at', { required: 'Established date is required' })}
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
        {/* <div className="formInput">
          <label htmlFor="established_at" className="label">Established In</label>
          <input
            type="date"
            defaultValue={teamDetail.established_at}
            id="established_at"
            {...register('established_at', { required: 'Established date is required' })}
            className="inputField"
          />
          <span className="errorMsg">{ errors.established_at?.message }</span>
        </div> */}
        <TextField
          id="church_id"
          select
          // defaultValue={teamDetail.church_id}
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
        {/* <div className="formInput">
          <label htmlFor="church_id" className="label">Branch Church</label>
          {isLoading ? <option>Loading...</option>
            : (
              <select
                id="church_id"
                name="church_id"
                defaultValue={teamDetail.church_id}
                {...register('church_id', { required: 'Please Select a Church' })}
                className="inputField"
              >
                {churches.map((church) => (
                  <option
                    key={church.id}
                    value={church.id}
                  >
                    {church.name}
                  </option>

                ))}
              </select>
            )}
          <span className="errorMsg">{ errors.church_id?.message }</span>
        </div> */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ background: colors.greenAccent[700], ':hover': { background: colors.greenAccent[600] }, mt: 2 }}
        >
          Update Team
        </Button>
        <span>{msg}</span>
      </Box>
    </Box>
  );
};

UpdateTeam.propTypes = {
  teamDetail: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
      PropTypes.array,
    ]),
  ).isRequired,
};
export default UpdateTeam;
