/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, MenuItem, OutlinedInput, Select, TextField, useTheme,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createMember, getChurches } from '../../redux/thunk';
import styles from '../../styles/Members.module.css';
import TeamsDropdown from '../Teams/TeamsDropdown';
import { tokens } from '../../theme';

const NewMember = () => {
  const [msg, setMsg] = useState('');
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedChurch, setSelectedChurch] = useState([]);
  const [fileImg, setFileImg] = useState('');

  const {
    churches, isLoading,
  } = useSelector((store) => store.churches);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const form = useForm();
  const {
    register, handleSubmit, reset, formState, control,
  } = form;
  const { errors } = formState;

  const handleImgUpload = (e) => {
    setFileImg(URL.createObjectURL(e.target.files[0]));
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
    const member = new FormData();
    member.append('member[name]', data.name);
    member.append('member[photo]', data.photo[0]);
    member.append('member[address]', data.address);
    member.append('member[phone_number]', data.phone_number);
    member.append('member[joined_at]', data.joined_at);
    member.append('member[church_id]', data.church_id);
    if (selectedTeams.length > 0) {
      selectedTeams.forEach((team) => {
        member.append('member[teams][]', team.id);
      });
    } else {
      member.append('member[teams]', '');
    }
    dispatch(createMember(member)).then(setMsg('Member Added Successfully!'));
    setTimeout(() => {
      setMsg('');
    }, 3000);

    reset();
    setFileImg('');
    navigate('/members');
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
            label="photo"
            type="file"
            {...register('photo', { required: 'Photo is required' })}
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
              width: '48%',
            }}
          />
          {fileImg === '' ? '' : <img src={fileImg} alt="member" className={styles.memberDetailImg} />}
          <TextField
            label="address"
            type="text"
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
            }}
          />
          <TextField
            label="phone number"
            type="text"
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
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Member Since"
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
              }}
            />
          </LocalizationProvider>
          <Select
            id="church_id"
            multiple
            value={selectedChurch}
            onChange={handleChurchSelect}
            input={<OutlinedInput label="church" />}
            error={Boolean(errors.church_id)}
            helperText={errors.church_id?.message}
            style={{
              width: '48%',
              '& label.Mui-focused': {
                color: colors.orangeAccent[500],
              },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: colors.orangeAccent[500],
                },
              },
            }}
          >
            {isLoading ? <MenuItem>Loading...</MenuItem>
              : churches.map((church) => (
                <MenuItem
                  value={church.id}
                  key={church.id}
                >
                  {church.name}
                </MenuItem>
              ))}
          </Select>
          <div className="selectorInput">
            <label htmlFor="teams" className="label">Teams</label>
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

          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ background: colors.greenAccent[700], ':hover': { background: colors.greenAccent[600] }, mt: 2 }}
          >
            Add Member
          </Button>
          <span>{msg}</span>
        </Box>
      </Box>
    )
  );
};

export default NewMember;
