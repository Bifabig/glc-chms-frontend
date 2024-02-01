/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box, Button, InputAdornment, MenuItem, OutlinedInput, TextField, useTheme,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { PhotoCamera } from '@mui/icons-material';

import { getChurches, updateMember } from '../../redux/thunk';
import styles from '../../styles/Members.module.css';
import TeamsDropdown from '../Teams/TeamsDropdown';
import { tokens } from '../../theme';

const UpdateMember = ({ memberDetail }) => {
  const [msg, setMsg] = useState('');
  const [selectedChurch, setSelectedChurch] = useState(`${memberDetail.memberChurch[0].id}`);
  const [selectedTeams, setSelectedTeams] = useState(memberDetail.memberTeams);
  const [fileImg, setFileImg] = useState(memberDetail.attributes.photo_url);

  const {
    churches, isLoading,
  } = useSelector((store) => store.churches);

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

  const handleImgUpload = (e) => {
    setFileImg(URL.createObjectURL(e.target.files[0]));
  };

  const dispatch = useDispatch();
  const form = useForm();
  const {
    register, handleSubmit, formState, control,
  } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    const member = new FormData();
    member.append('member[name]', data.name);
    if (data.photo[0]) {
      member.append('member[photo]', data.photo[0]);
    }
    member.append('member[address]', data.address);
    member.append('member[phone_number]', data.phone_number);
    member.append('member[joined_at]', data.joined_at);
    member.append('member[church_id]', data.church_id);
    selectedTeams.forEach((team) => {
      member.append('member[teams][]', team.id);
    });
    dispatch(updateMember({ id: memberDetail.attributes.id, memberData: member })).then(setMsg('Member Updated Successfully!'));
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
        {/* <div className="formInput">
          <label htmlFor="photo" className="label">Photo</label>
          <input
            type="file"
            id="photo"
            {...register('photo')}
            defaultValue={[]}
            placeholder="Photo"
            onChange={handleImgUpload}
          />
          <img
            src={fileImg}
            alt={memberDetail.attributes.name}
            className={styles.memberUpdateImg}
          />
          <span className="errorMsg">{ errors.photo?.message }</span>
        </div> */}
        <TextField
          label="name"
          defaultValue={memberDetail.attributes.name}
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
        <Box
          display="flex"
          sx={{
            width: '48%',
          }}
        >
          <TextField
            // label="photo"
            type="file"
            defaultValue={[]}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhotoCamera />
                </InputAdornment>
              ),
            }}
            {...register('photo')}
            onChange={handleImgUpload}
            error={Boolean(errors.photo)}
            helperText={errors.photo?.message}
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
              mr: fileImg === '' ? '' : 1,
            }}
          />
          <img
            src={fileImg}
            alt={memberDetail.attributes.name}
            className={styles.memberDetailImg}
          />
        </Box>
        {/* <div className="formInput">
          <label htmlFor="name" className="label">Full Name</label>
          <input
            type="text"
            defaultValue={memberDetail.attributes.name}
            id="name"
            {...register('name', {
              required:
            { value: true, message: 'Full name is required' },
            })
          }
            placeholder="Full Name"
            className="inputField"
          />
          <span className="errorMsg">{ errors.name?.message }</span>
        </div> */}
        <TextField
          label="address"
          // type="text"
          defaultValue={memberDetail.attributes.address}
          {...register('address', { required: 'Address is required' })}
          error={Boolean(errors.address)}
          helperText={errors.address?.message}
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
          }}
        />
        {/* {console.log(selectedChurch)} */}
        {/* <div className="formInput">
          <label htmlFor="address" className="label">Address</label>
          <input
            type="text"
            id="address"
            defaultValue={memberDetail.attributes.address}
            {...register('address', { required: 'Address is required' })}
            placeholder="Address"
            className="inputField"
          />
          <span className="errorMsg">{ errors.address?.message }</span>
        </div> */}
        <TextField
          label="phone number"
          type="text"
          defaultValue={memberDetail.attributes.phone_number}
          {...register('phone_number', {
            required: 'Phone number is required',
            pattern:
                { value: /^[0-9]*$/, message: 'Add correct phone number' },
          })}
          error={Boolean(errors.phone_number)}
          helperText={errors.phone_number?.message}
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
          }}
        />
        {/* <div className="formInput">
          <label htmlFor="phone_number" className="label">Phone Number</label>
          <input
            type="text"
            id="phone_number"
            defaultValue={memberDetail.attributes.phone_number}
            {...register('phone_number', {
              required: 'Phone number is required',
              pattern:
            { value: /^[0-9]*$/, message: 'Add correct phone number' },
            })}
            placeholder="Phone Number"
            className="inputField"
          />
          <span className="errorMsg">{ errors.phone_number?.message }</span>
        </div> */}
        <TextField
          type="date"
          defaultValue={memberDetail.attributes.joined_at}
          {...register('joined_at', {
            required: 'Date is required',
          })}
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
            mt: 1,
            '& ::-webkit-calendar-picker-indicator': {
              filter: 'invert(1)',
            },
          }}
        />
        {/* <div className="formInput">
          <label htmlFor="joined_at" className="label">Member Since</label>
          <input
            type="date"
            id="joined_at"
            defaultValue={memberDetail.attributes.joined_at}
            {...register('joined_at', { required: 'Joined date is required' })}
            placeholder="Member Since"
            className="inputField"
          />
          <span className="errorMsg">{ errors.joined_at?.message }</span>
        </div> */}
        {/* <TextField
          type="church_id"
          defaultValue={memberDetail.attributes.phone_number}
          {...register('church_id', {
            required: 'Church is required',
          })}
          error={Boolean(errors.church_id)}
          helperText={errors.church_id?.message}
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
        /> */}

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
            width: '48%',
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
          <label htmlFor="church_id" className="label">Branch</label>
          {isLoading ? <option>Loading...</option>
            : (
              <select
                id="church_id"
                name="church_id"
                defaultValue={memberDetail.memberChurch[0].id}
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
                defaultValue={memberDetail.memberTeams.map((val) => val.id)}
                selectedTeams={selectedTeams}
                setSelectedTeams={setSelectedTeams}
              />

            )}
          />
          <span className="errorMsg">{errors.teams?.message}</span>
        </Box>
        {/* <div className="selectorInput">
          <label htmlFor="teams" className="label">Teams</label>
          <Controller
            control={control}
            name="teams"
            render={({ field }) => (
              <TeamsDropdown
                field={field}
                defaultValue={memberDetail.memberTeams.map((val) => val.id)}
                selectedTeams={selectedTeams}
                setSelectedTeams={setSelectedTeams}
              />
            )}
          />
        </div> */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ background: colors.greenAccent[700], ':hover': { background: colors.greenAccent[600] }, mt: 2 }}
        >
          Update Member
        </Button>
        <span>{msg}</span>

      </Box>
    </Box>
  );
};

UpdateMember.propTypes = {
  memberDetail: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
      PropTypes.array,
    ]),
  ).isRequired,
};

export default UpdateMember;
